import Koa from 'koa';
import { Constants } from '../utils';
import fs from 'fs';

const getHome = async (ctx: Koa.Context) => {
	if (Constants.COMMON_INFO.TOKEN) {
		return ctx.redirect('/main');
	}
	return await ctx.render('index');
};

const postToken = async (ctx: Koa.Context) => {
	let { token } = ctx.request.body;
	if (!token) {
		return ctx.redirect('/');
	}

	Constants.COMMON_INFO.TOKEN = token;
	fs.writeFileSync('.env', 'TOKEN=' + token + '\nIMAGE_PATH=' + Constants.COMMON_INFO.IMAGE_PATH);

	ctx.status = 200;
	ctx.body = { msg: 'OK' };
};

export const HomeController = { getHome, postToken };
