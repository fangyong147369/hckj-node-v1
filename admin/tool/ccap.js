const cache = require('../tool/cache');
const svgCaptcha = require('svg-captcha');

exports.getImageCode =function*(){
    let captcha = svgCaptcha.create({
        width: 105,
        height: 47,
        noise: 2,
        background: "#f4f3f2",//干扰线条数
        fontSize: 45
    });
    this.response.type='svg';
    this.response.status=200;
    this.session.sessionID=this.sessionId;
    yield cache.set(this.sessionId,captcha.text,1000*60*2);
    this.body=captcha.data;
}

exports.checkImageCode = function*(){
    let cacheCode= yield cache.get(this.session.sessionID);
    let code = this.request.body.imgCode;
    if (cacheCode && cacheCode.toLowerCase== code)
        return this.body={err: '图片验证码输入正确',code:1};
    else {
        return this.body={err: '图片验证码输入不正确',code:-1};
    }
}