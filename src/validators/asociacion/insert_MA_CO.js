'use strict';
const joi = require('joi');

module.exports = joi.object().keys({
	id_marca: joi.number().integer().required(),
	id_concesionaria: joi.number().integer().required()
    
});