import Koa from 'koa';
import path from 'path';
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

render(app, {
	root: path.join(__dirname, 'public'),
	layout: false,
	viewExt: 'ejs',
	cache: true,
	debug: false,
});

// index
router.get('/', HomeController.getHome);
router.get('/main', MainController.getMain);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
	console.log('Web Server is listening to 3000 port.');
});

watch('src/public', async (event, name) => {
	console.log(event, name);
	shell.cp('-R', 'src/public', '.build/src');
	shell.cp('-R', 'src/app.ts', 'src/_watchfile.ts');
	shell.rm('src/_watchfile.ts');
});
