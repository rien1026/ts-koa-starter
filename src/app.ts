import Koa from 'koa';
import path from 'path';
import koabody from 'koa-body';
import render from 'koa-ejs';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import { HomeController } from './controllers';
import watch from 'node-watch';
import * as shell from 'shelljs';
import { MainController } from './controllers/MainController';
import { Constants } from './utils';
import { HistoryService } from './services';
import { SettingController } from './controllers/SettingController';

const app = new Koa();
const router = new Router();

// it can be used with router by specific option.
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koabody());

render(app, {
	root: path.join(__dirname, 'public'),
	layout: false,
	viewExt: 'ejs',
	cache: true,
	debug: false,
});

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
	try {
		console.log(ctx.request.method + '---' + ctx.request.url);

		if (ctx.request.url !== '/' && ctx.request.method === 'GET' && !Constants.COMMON_INFO.TOKEN) {
			return ctx.redirect('/');
		}

		await next();
	} catch (err) {}
});

// index
router.get('/', HomeController.getHome);

// main
router.get('/main', MainController.getMain);
router.post('/alive-dt', MainController.postAliveDt);

// setting
router.get('/setting', SettingController.getSetting);
router.post('/info', SettingController.postInfo);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
	console.log('Web Server is listening to 3000 port.');

	// if Constants.ALIVE_DT is not updated, server is going to exit.
	setInterval(() => {
		if (new Date().getTime() > Constants.COMMON_INFO.ALIVE_DT) {
			process.exit(0);
		}
	}, 60000);
});

watch('src/public', async (event, name) => {
	console.log(event, name);
	shell.cp('-R', 'src/public', '.build/src');
	shell.cp('-R', 'src/app.ts', 'src/_watchfile.ts');
	shell.rm('src/_watchfile.ts');
});

watch('src/public/pages', async (event, name) => {
	console.log(event, name);
	shell.cp('-R', 'src/public', '.build/src');
	shell.cp('-R', 'src/app.ts', 'src/_watchfile.ts');
	shell.rm('src/_watchfile.ts');
});

watch('src/public/template', async (event, name) => {
	console.log(event, name);
	shell.cp('-R', 'src/public', '.build/src');
	shell.cp('-R', 'src/app.ts', 'src/_watchfile.ts');
	shell.rm('src/_watchfile.ts');
});
