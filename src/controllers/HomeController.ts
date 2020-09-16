import Koa from 'koa';
import { Constants } from '../utils';
import fs from 'fs';

const getHome = async (ctx: Koa.Context) => {
	if (Constants.COMMON_INFO.TOKEN) {
		return ctx.redirect('/main');
	}
	return await ctx.render('index');
};

export const HomeController = { getHome };
