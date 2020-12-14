'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    id_comuna: joi.number().integer().required(),
    nombre_localidad:joi.string().max(50).required(),
});