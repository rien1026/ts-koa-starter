import Koa from 'koa';

const getHome = async (ctx: Koa.Context) => {
	ctx.redirect('/main');

	return await ctx.render('index');
};

export const HomeController = { getHome };
