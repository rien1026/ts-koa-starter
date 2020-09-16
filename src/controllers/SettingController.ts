import Koa from 'koa';
import { Constants } from '../utils';
import fs from 'fs';
import { ScheduleService, WatchService } from '../services';

const getSetting = async (ctx: Koa.Context) => {
	return await ctx.render('/pages/setting', {
		TOKEN: Constants.COMMON_INFO.TOKEN,
		IMAGE_PATH: Constants.COMMON_INFO.IMAGE_PATH,
	});
};

const postInfo = async (ctx: Koa.Context) => {
	let { token, imagePath } = ctx.request.body;
	if (!token && !imagePath) {
		return ctx.redirect('/');
	}

	if (token) {
		Constants.COMMON_INFO.TOKEN = token;
	}
	if (imagePath) {
		Constants.COMMON_INFO.IMAGE_PATH = imagePath;
	}

	fs.writeFileSync('.env', 'TOKEN=' + Constants.COMMON_INFO.TOKEN + '\nIMAGE_PATH=' + Constants.COMMON_INFO.IMAGE_PATH);

	if (ScheduleService.scheduleJob) {
		ScheduleService.removeScheduleJob();
	}

	if (WatchService.watchJob) {
		WatchService.removeJob();
	}

	return ctx.redirect('/main');
};

export const SettingController = { getSetting, postInfo };
