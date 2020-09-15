import Koa from 'koa';

const getMain = async (ctx: Koa.Context) => {
	await ctx.render('/pages/main');
};

export const MainController = { getMain };
