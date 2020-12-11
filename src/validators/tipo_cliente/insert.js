'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
    nombre_tipo_cliente:joi.string().max(50).required(),
	descripcion_tipo_cliente:joi.string().max(100).default(null).allow(null)
});