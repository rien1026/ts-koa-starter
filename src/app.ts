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

		await next();
	} catch (err) {}
});

// index
router.get('/', HomeController.getHome);

// main
router.get('/main', MainController.getMain);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
	console.log('Web Server is listening to 3000 port.');

	try {
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
	} catch (err) {
		console.log('watching files is failed.');
	}
});
