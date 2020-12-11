'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    nombre_sucursal:joi.string().max(50).required(),
	descripcion_sucursal:joi.string().max(100).default(null).allow(null),
	id_comuna:joi.number().integer().required(),
	id_concesionaria:joi.number().integer().required(),
	direccion_sucursal:joi.string().default(null).allow(null)
});