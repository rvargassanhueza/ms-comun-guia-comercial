'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    id_tipo_cliente: joi.number().integer().required(),
    nombre_cliente:joi.string().max(50).required(),
    descripcion_cliente:joi.string().max(100).default(null).allow(null)
});