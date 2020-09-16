import schedule from 'node-schedule';
import fs from 'fs';
import { Constants } from '../utils';

let scheduleJob;
const createScheduleJob = () => {
	if (scheduleJob) {
		return;
	}

	console.log('start old images finder schedule');
	scheduleJob = schedule.scheduleJob('* * 12 * * *', async () => {
		console.log('find old images...');
		fs.readdir(Constants.COMMON_INFO.IMAGE_PATH, (err, fileList) => {
			console.log(fileList);
		});
	});
};

const removeScheduleJob = () => {
	if (!scheduleJob) {
		return;
	}
	schedule.cancelJob(scheduleJob);
	scheduleJob = undefined;
};

export const ScheduleService = { createScheduleJob, removeScheduleJob, scheduleJob };
