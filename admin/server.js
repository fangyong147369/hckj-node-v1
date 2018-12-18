'use strict';
var Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');//日志打印
const koa_static = require('koa-static');//静态文件
const router = require('koa-router')(); //路由
const onerror = require('koa-onerror');
const render = require('koa-ejs');
const path = require('path');
const fs = require('fs');
const session = require('koa-generic-session');//基于缓存的session
const redisStore = require('koa-redis');
require('../tools/gloabVariable');
require('../tools/util');
app.keys = ['some secret hurr', 'keys'];//设置签名Cookie密钥
app.use(session({
    secret: 'adMiN_AH^%^SSFWPDG32A2DKJS(*PDSA',
    key: 'account_session',
    proxy: 'true',
    cookie: {
        domain: "",
        path: '/',
        httpOnly: true,
        maxAge: 60*60*1000,//Session有效期单位毫秒
        rewrite: true,
        signed: true
    },
    store: redisStore({
        host: "192.168.239.134",
        port: 6377,
        prefix: "/",
        ttl: 60*1000
    })
}))
    .use(router.routes())
    .use(router.allowedMethods())
global.core_path="http://192.168.239.134:8088/sys_api-1.0.0.0";//公共配置
console.log(__dirname);
console.log(path.dirname(__dirname));
app.use(koa_static('public'));
app.use(logger());
onerror(app);

app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});
app.use(function* (next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});
app.use(function* (next) {
    try {
        if (this.status == "404") {
            if (this.method === "POST") {
                this.body = {message: '此接口不存在！ ', code: -1};
            } else {
                yield this.render('404');
            }
        }
        else {
            yield next;
        }
    } catch (err) {
        this.throw(500,"  服务内部异常");
    }
})
/**
 *由于中间件是层级式调用，所以可以把try { yield next }当成第一个中间件。
 */
app.use(function* (next) {
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
        this.app.emit('error', err, this);
    }
});
/**
 * 错误处理机制
 */
app.use(function* () {
    try {
        yield saveResults();
    } catch (err) {
        this.throw(400, '数据无效');
    }
});
fs.readdirSync('./routes').forEach(function (file) {
    if (file.indexOf(".js") > -1){
        require('./routes/' + file.replace(/^(.+)\.js$/, "$1"))(router);
    }
})

render(app, {
    layout: '__layout',
    root: path.join(__dirname, 'views'),
    viewExt: 'ejs'
});
/**
 * 对于未捕获错误，可以设置error事件的监听函数。
 */
app.on('error', function (err) {
    console.log('server error ', err);
});
app.listen(3000, () => {
    console.log('server is starting at port 3000')
})
