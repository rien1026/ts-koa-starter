import Koa from 'koa';

const getHome = async (ctx: Koa.Context) => {
	await ctx.render('index');
};

export const HomeController = { getHome };
