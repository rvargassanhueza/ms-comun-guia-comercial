'use strict'
require('dotenv').config({ path: 'env.env' });
const sucursalServices = require('../database/sucursal-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _get = async function (req, res, next) {
    try {
        let result = await sucursalServices.getSuc();
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

let _getId = async function (req, res, next) {
    try {
        const id = req.params.id
        let result = await sucursalServices.getSucId(id);
        if (result === null) {
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
        let result = await sucursalServices.insertSuc(params);

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

let _update = async function (req, res, next){
    try{
        const { params } = req;
        let result = await sucursalServices.updateSuc(params);
        
        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.NO_CONTENT);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

let _delete = async function (req, res, next){
    try{
        const { params:{id} } = req;
        let result = await sucursalServices.deleteSuc(id);
        
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
    get: _get,
    getId: _getId,
    insertSuc: _insert,
    updateSuc: _update,
    deleteSuc: _delete
}