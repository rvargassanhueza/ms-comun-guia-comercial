'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
	id_modelo: joi.number().integer().required(),
	id_sucursal: joi.number().integer().required()
});