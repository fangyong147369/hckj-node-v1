'use strict';
const biz_suppervisors=require('../../base/suppervisors.js');
/**
 * 登录
 */
exports.signIn=function*(){
    yield this.render('/main/signIn',{req:this});
}

/**
 * 注销
 */
exports.signOut=function*(){
    delete this.session.user;
    yield this.render('/main/signIn',{req:this});
}

/**
 * 首页
 */
exports.index=function*(){
    yield this.render('/main/index',{req:this});
}

/**
 * 登录
 */
exports.findSuppervisor=function*(){
    let userName=this.request.body.username;
    let password=this.request.body.password;
    let body=yield biz_suppervisors.findSuppervisor(userName,password);
    console.log("body:"+JSON.stringify(body))

    if(body.error || !body.model){
        this.body={error:body.error};
    }else{
        this.session.user=body.model;
        this.redirect('/index',{req:this});
    }
}
