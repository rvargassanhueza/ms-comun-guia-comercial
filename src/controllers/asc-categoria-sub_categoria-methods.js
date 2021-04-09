'use strict'
require('dotenv').config({ path: 'env.env' });
const ascCatSubCatServices = require('../database/asc-categoria-sub_categoria-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _get = async function (req, res, next) {
    try {
        let result = await ascCatSubCatServices.getAsocCatSub();
        if (result == null) {
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.OK, result);
        res.end();
    } catch (err) {
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );
    }
};

let _insert = async function (req, res, next){
    try{
        const { params } = req;
        let result = await ascCatSubCatServices.insertAscCatSubCat(params);

        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.CREATED, result);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

let _delete = async function (req, res, next){
    try{
        const { params:{id_categoria, id_sub_categoria} } = req;
        let result = await ascCatSubCatServices.deleteAscCatSubCat(id_categoria, id_sub_categoria);
        
        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.OK);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

module.exports = {
    getAsocCatSub:_get,
    insertAscCatSubCat: _insert,
    deleteAscCatSubCat: _delete
}