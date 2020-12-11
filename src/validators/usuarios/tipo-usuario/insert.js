'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    
	nombre_tipo_usuario:joi.string().max(50).required(),
    descripcion_tipo_usuario:joi.string().max(100)
});