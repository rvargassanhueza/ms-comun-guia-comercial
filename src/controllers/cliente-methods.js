'use strict'
require('dotenv').config({ path: 'env.env' });
const clienteServices = require('../database/cliente-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _get = async function (req, res) {
    try {
        let result = await clienteServices.getCliente();
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

let _getId = async function (req, res) {
    try {
        const id = req.params.id
        let result = await clienteServices.getClienteId(id);
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

let _insert = async function (req, res){
    try{
        const { params } = req;
        let result = await clienteServices.insertCliente(params);

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

let _update = async function (req, res){
    try{
        const { params } = req;
        let result = await clienteServices.updateCliente(params);
        
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

let _delete = async function (req, res){
    try{
        const { params:{id} } = req;
        let result = await clienteServices.deleteCliente(id);
        
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
    insertCliente: _insert,
    updateCliente: _update,
    deleteCliente: _delete
}