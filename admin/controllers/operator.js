'use strict';
const biz_operator = require('../../base/system');
/**
 * 登录
 */
exports.signIn = function* () {
    yield this.render('/main/signIn', {req: this});
}
/**
 * PC登录
 */
exports.logIn = function* () {
    yield this.render('/main/signIn', {req: this});
}
/**
 * 注销
 */
exports.signOut = function* () {
    this.session.user = null;
    yield this.render('/main/signIn', {req: this});
}

/**
 * 首页Netty
 */
exports.index = function* () {
    let menuList = [];
    let roleId = (this.session && this.session.user && this.session.user.roleModel) ? this.session.user.roleModel.id : 0;
    if (roleId > 0) {
        menuList = yield biz_operator.getMenuListByRoleId(roleId);
    }
    yield this.render('/main/index', {req: this,menuList:menuList});
}
/**
 * 首页Pc
 */
exports.indexFromPc = function* () {
    let menuList = [];
    let roleId = (this.session && this.session.user && this.session.user.roleModel) ? this.session.user.roleModel.id : 0;
    if (roleId > 0) {
        menuList = yield biz_operator.getMenuListByRoleId(roleId);
    }
    yield this.render('/main/indexFromPc', {req: this,menuList:menuList});
}
/**
 * 登录
 */
exports.globaSerch = function* () {
    let body = this.request.body;
    this.body = {message: "···接口陆续开放中·····", "返回": "<a href='http://localhost:4700/'>返回<a/>"};
}
/**
 * welcome
 */
exports.welcome = function* () {
    let menu = yield biz_operator.getParentMenuList(1);
    yield this.render('/main/welcome', {req: this});
}
/**
 * PC登录
 */
exports.findOperatorFromPC = function* () {
    let p_username = this.request.body.username;
    let p_password = this.request.body.password;
    let p_type = this.request.body.type;
    let body = null;
    if (p_type == "pc") {
        body = yield biz_operator.findOperator({signInWay: 2, userName: p_username, password: p_password});
    }
    if (body != null && body.code == 1) {
         this.session.user = body.data;
    }
    this.body = body;

}
/**
 * 登录
 */
exports.findOperatorFromNetty = function* () {
    let userName = this.request.query.username;
    let password = this.request.query.password;
    let body = yield biz_operator.findOperator({signInWay: 2, userName: userName, password: password});
    if (body != null && body.code == 1) {
        this.session.user = body.data;
        let menuList = [];
        let roleId = (this.session && this.session.user && this.session.user.roleModel) ? this.session.user.roleModel.id : 0;
        if (roleId > 0) {
            menuList = yield biz_operator.getMenuListByRoleId(roleId);
        }
        yield this.render('/formula/formula', {req: this, menuList: menuList});
    } else if (body != null && body.code == 2) {
        return this.body = body;
    } else if(body != null && body.code == -1) {
        return this.body = {mes: body && body.message ? body.message: "系统内部调用错误"}
    }else{
        return this.body = body;
    }
}
/**
 * 登录
 */
exports.test = function* () {
    let body = yield biz_operator.test(1);
    yield this.render('/main/test', {req: this, body: body});
}
