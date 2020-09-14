import Koa from 'koa';
import path from 'path';
import render from 'koa-ejs';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import { HomeController } from './controllers';

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

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
	console.log('Web Server is listening to 3000 port.');
});
