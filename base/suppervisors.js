'use strict';
const co = require('co');
const midx=require('./midx');

/**
 * 管理员登录
 * @param name 帐号
 * @param password 密码
 * @returns {*}
 */
exports.findSuppervisor=function *(name,password){
    if (!name) {
        return {error: '帐号不能为空.'};
    }
    if(!password){
        return {error:'密码格式不正确.'};
    }
    return co(function *() {
        try {
            let result=yield midx('/manage/operator/signIn',{userName:name,password:password});
            if(result && result.data && result.data.id){
                return {error:null,model:result.data};
            }else{
                return {error:'帐号或密码错误.'}
            }
        } catch (error) {
            console.log(error);
            return {error:error};
        }
    })
}

/**
 * 根据id获取管理员信息
 * @param id
 */
exports.getSupervisorById=function*(id){
    return co(function *() {
        try {
            let result=yield midx('/m/operator/getById',{id:id});
            return (result && result.data && result.data.id) ?result.data:null;
        } catch (error) {
            console.log(error);
            return null;
        }
    })
}

/**
 * 获取管理员列表
 * @param pageNo
 * @param pageSize
 * @returns {*|Promise}
 */
exports.getSupervisorList=function*(pageNo,pageSize){
    pageNo=pageNo||1;
    pageSize=pageSize||20
    return co(function *() {
        try {
            let result=yield midx('/m/operator/list',{pageNo:pageNo,pageSize:pageSize});
            return {list:(result && result.data && result.data.list && result.data.list instanceof Array ? result.data.list:[]),pageNo:pageNo,pageSize:pageSize,total:(result && result.data && result.data.page && result.data.page.total && !isNaN(result.data.page.total)?result.data.page.total:0)};
        } catch (error) {
            console.log(error);
            return {list:[],pageSize:pageSize,total:0,pageNo:pageNo,error:error};
        }
    })
}

/**
 * 管理员保存
 * @param params
 * @returns {*}
 */
exports.saveSupervisor=function*(params){
    try{
        params=JSON.parse(params);
    }catch(e){
        params=null;
    }
    if(!params || typeof params !='object'){
        return {error:'参数错误.'}
    }
    if (!params || !params.name) {
        return {error:'用户名称不能为空.'};
    }
    return co(function *() {
        try {
            let result=null;
            if(!params.id){
                result=yield midx('/m/operator/add',params);
            }else{
                result=yield midx('/m/operator/update',params);
            }
            return result;
        } catch (error) {
            console.log(error);
            return {error:error};
        }
    })
}
