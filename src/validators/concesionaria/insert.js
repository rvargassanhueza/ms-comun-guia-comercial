'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
	
    nombre_concesionaria:joi.string().max(50).required(),
	descripcion_concesionaria:joi.string().max(100).default(null).allow(null)
});