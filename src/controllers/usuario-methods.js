'use strict'
require('dotenv').config({ path: 'env.env' });
const userServices = require('../database/usuario-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _get = async function (req, res, next) {
    try {
        let result = await userServices.getUser();
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
        let result = await userServices.getUserId(id);
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
        let result = await userServices.insertUser(params);

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
        let result = await userServices.updateUser(params);
        
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
        let result = await userServices.deleteUser(id);
        
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
    insertUser: _insert,
    updateUser: _update,
    deleteUser: _delete
}