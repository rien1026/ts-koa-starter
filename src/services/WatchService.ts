import watch from 'node-watch';
import FormData from 'form-data';
import fetch from 'node-fetch';
import Jimp from 'jimp';
import { Constants, logger } from '../utils';
import fs from 'fs';

let watchJob: fs.FSWatcher;
const createWatchJob = () => {
	console.log('watch folders ' + Constants.COMMON_INFO.IMAGE_PATH);
	if (watchJob) {
		return;
	}

	watchJob = watch(Constants.COMMON_INFO.IMAGE_PATH, { recursive: true, filter: /\.PNG$/ }, async (event, name) => {
		if (event === 'remove') {
			return;
		}

		try {
			let fileName = name.split('/')[name.split('/').length - 1];
			let image = await Jimp.read(name);

			const form = new FormData();
			form.append('file', await image.getBufferAsync(image._originalMime), {
				filename: fileName,
				contentType: image._originalMime,
			});
			form.append('temp', 36.5);

			let result = await fetch(Constants.API_INFO.API_URL + '/images', {
				method: 'post',
				headers: { token: Constants.COMMON_INFO.TOKEN },
				body: form,
			});

			console.log(await result.json());
		} catch (err) {
			logger.error('err : ' + err.message);
		}
	});
};

const removeJob = () => {
	if (!watchJob) {
		return;
	}

	watchJob.close();
	watchJob = undefined;
};

export const WatchService = { createWatchJob, removeJob, watchJob };
