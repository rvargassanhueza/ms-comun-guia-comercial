'use strict'
require('dotenv').config({ path: 'env.env' });
const territorioServices = require('../database/territorio-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _getRegion = async function (req, res) {
    try {
        let result = await territorioServices.getRegion();
        if (result == null) {
            res.status(httpStatus.NOT_FOUND).json({ error: 'Región not found' });
            return;
        }
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

let _getProvincia = async function (req, res) {
    try {
        const id = req.params.id;

        let result = await territorioServices.getProvincia(id);
        if (result == null) {
            res.status(httpStatus.NOT_FOUND).json({ error: 'Provincia not found' });
            return;
        }
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

let _getComunaiD = async function (req, res) {
    try {
        const id = req.params.id;

        let result = await territorioServices.getComunaiD(id);
        if (result == null) {
            res.status(httpStatus.NOT_FOUND).json({ error: 'Comuna not found' });
            return;
        }
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

let _getComuna = async function (req, res) {
    try {

        const texto = req.params.texto;

        let result = await territorioServices.getComuna(texto);
        if (result == null) {
            res.status(httpStatus.NOT_FOUND).json({ error: 'Comuna not found' });
            return;
        }
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};



module.exports = {
    getRegion: _getRegion,
    getProvincia: _getProvincia,
    getComunaiD: _getComunaiD,
    getComuna:_getComuna
}