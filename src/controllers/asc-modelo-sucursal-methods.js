'use strict'
require('dotenv').config({ path: 'env.env' });
const ascMoSucServices = require('../database/asc-modelo-sucursal-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _insert = async function (req, res, next){
    try{
        const { params } = req;
        let result = await ascMoSucServices.insertAscMoSuc(params);

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
        const { params:{id_modelo, id_sucursal} } = req;
        let result = await ascMoSucServices.deleteAscMoSuc(id_modelo, id_sucursal);
        
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
    insertAscMoSuc: _insert,
    deleteAscMoSuc: _delete
}