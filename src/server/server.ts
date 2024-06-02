import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import convert from 'koa-convert'
import logger from 'koa-logger'
import passport from 'koa-passport'
import mount from 'koa-mount'
import serve from 'koa-static'
import helmet from 'koa-helmet'
import { Middleware } from 'koa-compose'
import http2 from 'http2'
import render from 'koa-ejs';
import path from 'path'
import errorMiddleware from '../app/core/middleware/ErrorMiddleware'
import config from '../resources/config'
import routes from '../app/routes'
const niv = require('node-input-validator');

const app: Koa = new Koa();

const _use: Function = app.use
app.use = (x: Middleware<any>) => _use.call(app, convert(x))

app.use(helmet())
app.use(logger())
app.use(bodyParser())

app.use(passport.initialize())
app.use(passport.session())
app.use(niv.koa());
render(app, {
    root: path.join(__dirname, '../views'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});
app.use(serve(path.join(__dirname,'../public')));

routes(app)

if (['development', 'staging'].includes(config.environment)) {
    app.use(mount('/swagger', serve(`${process.cwd()}/src/resources/swagger`)))
}

app.listen(config.port, () => {
    console.log("server started");
})


