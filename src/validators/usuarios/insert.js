'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    id_tipo_usuario:joi.number().integer().required(),
	nombre_usuario:joi.string().max(50).required(),
	pass_usuario:joi.string().max(10).required(),
    descripcion_usuario:joi.string().max(100)
});