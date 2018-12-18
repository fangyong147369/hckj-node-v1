'use strict';
const biz_formula = require('../../base/formula');
/**
 * 查询配方列表
 */
exports.getFormulaList = function* () {
    let model = this.request.body.model;
    let body = yield biz_formula.getFormulaList(model);
    this.body = body;
}




/**
 * 查询配方列表页面
 */
exports.formula = function* () {
    yield this.render('/formula/formula', {req:this});
}


/**
 * 通过配方Id查询配方页面
 */
exports.showFormulaById = function* () {
    let model = null;
    let conList = null;
    let id = this.request.query.id || '';
    if (id && !isNaN(id)) {
        model = yield biz_formula.getFormulaById(id);
        let result = yield biz_formula.getConcentrationListByFormulaId({formulaId: id});
        if (result && result.code == 1 && result.data && result.data.list && result.data.list instanceof Array) {
            conList = result.data.list
        } else {
            console.error("浓度查询错误：" + result.message)
        }
    }
    if (model.code == 1) {
        model = model.data;
    } else {
        model = [];
    }
    yield this.render('/formula/showFormulaById', {req: this, model: model,conList:conList});
}

/**
 * 通过配方Id移除配方
 */
exports.removeFormulaById = function* () {
    let model = this.request.body.model;
    let body = yield biz_formula.removeFormulaById(model);
    this.body = body;
}
/**
 * 查询浓度列表
 */
exports.getConcentrationList = function* () {
    let model = this.request.body.model;
    let body = yield biz_formula.getConcentrationList(model);
    this.body = body;
}
/**
 * 查询浓度列表页面
 */
exports.concentration = function* () {
    let formulaId = this.request.query.formulaId || 0;
    yield this.render('/formula/concentration', {req: this, formulaId: formulaId});
}


