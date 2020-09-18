import Koa from 'koa';

const getMain = async (ctx: Koa.Context) => {
	return await ctx.render('/pages/main');
};

export const MainController = { getMain };
