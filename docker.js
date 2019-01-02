'use strict';
var  redisPort=6379;
var  redisHost="127.0.0.1";
var  corePath="http://127.0.0.1:8080/sys_api-1.0.0.0"
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
require('./tools/gloabVariable');
require('./tools/util');
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
        host: redisHost,
        port: redisPort,
        database: 0,
        prefix: "/",
        ttl: 60*1000
    })
}))
    .use(router.routes())
    .use(router.allowedMethods())
//  global.core_path="http://localhost:8080/sys_api-1.0.0.0";//测试环境
 global.core_path=corePath;//测试环境
 // global.core_path="http://localhost:8080";//开发环境
console.log(__dirname);
console.log(path.dirname(__dirname));
app.use(koa_static('./admin/public'));
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
 * 错误处理机制
 */
app.use(function* () {
    try {
        yield saveResults();
    } catch (err) {
        this.throw(400, '数据无效');
    }
});
fs.readdirSync('./admin/routes').forEach(function (file) {
    if (file.indexOf(".js") > -1){
        require('./admin/routes/' + file.replace(/^(.+)\.js$/, "$1"))(router);
    }
})

render(app, {
    layout: '__layout',
    root: path.join(__dirname, '/admin/views'),
    viewExt: 'ejs'
});

/**
 * 对于未捕获错误，可以设置error事件的监听函数。
 */
app.on('error', function (err) {
    console.log('server error ', err);
});


app.listen(4700, () => {
    console.log('serverUrl:'+global.core_path)
    console.log('redisHost:'+redisHost+"       redisPort:"+redisPort)
    console.log('node 服务端口号:4700  from Docker')
})
