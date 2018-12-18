'use strict';
const operator = require('../controllers/operator');
const session = require('../filters/session-filter');
const koaBody = require('koa-body')();
module.exports = function (router) {
    router.get('/',koaBody,session.auth,operator.index);//Netty
    router.post('/',koaBody,session.auth,operator.globaSerch);//全局搜索
    router.get('/signIn',koaBody,operator.findOperatorFromNetty);//Netty登录
    router.get('/signInPC',koaBody,operator.logIn);//PC登录
    router.post('/signInPC',koaBody,operator.findOperatorFromPC);//Netty登录
    router.get('/signOut',koaBody,session.auth,operator.signOut);
    router.get('/welcome',koaBody,session.auth,operator.welcome);
    router.get('/test',koaBody,operator.test);
};
