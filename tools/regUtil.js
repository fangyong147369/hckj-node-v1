var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

/**
 * 非法字符过滤
 * @param param
 * @returns {boolean}
 */
exports.regText=function(param){
    if(regEn.test(param) || regCn.test(param)){
        return false;
    }else{
        return true;
    }
}

/**
 * 日期正则
 * @param param
 * @returns {boolean}
 */
exports.regDate=function(param){
    if(!param || !(/^(\d{4})\-(\d{2})\-(\d{2})$/).test(param)){
       return false;
    }else{
        return true;
    }
}

/**
 * 手机校验
 * @param param
 * @returns {boolean}
 */
exports.regMobile=function(param){
    if(!param || !(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/).test(param)){
        return false;
    }else{
        return true;
    }
}

/**
 * 名称校验
 * @param param
 * @returns {boolean}
 */
exports.regRealName=function(param){
    if(!param || !((/^[\u4e00-\u9fa5]+([\.|\·][\u4e00-\u9fa5]+)*$/).test(param))){
        return false;
    }else{
        return true;
    }
}

/**
 * 密码验证
 * @param param
 * @returns {boolean}
 */
exports.regPassword=function(param){
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(param)){
       return false;
    }else{
        return true;
    }
}

/**
 * 数据校验
 * @param param
 * @returns {boolean}
 */
exports.regNum=function(param){
    if(!param || isNaN(param)){
        return false;
    }else{
        return true;
    }
}

/**
 * 数据金额
 * @param param
 * @returns {boolean}
 */
exports.regAmount=function(param){
    if(!param || isNaN(param) || parseFloat(param)<=0){
        return false;
    }else{
        return true;
    }
}

/**
 * 身份证校验
 * @param param
 * @returns {boolean}
 */
exports.regIdCard=function(param){
    if (!param || !(param.match(/^\d{17}\w$/) || param.match(/^\d{15}$/))) {
        return false;
    }else{
        return true;
    }
}

/**
 * 邮箱校验
 * @param param
 * @returns {boolean}
 */
exports.regEmail=function(param){
    if(!param || !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(param)){
        return false;
    }else{
        return true;
    }
}
