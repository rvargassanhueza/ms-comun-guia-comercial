'use strict';
var methods = require('../../src/controllers/localidad-methods');

module.exports.register = (app) => {
    app.get('/localidad/', methods.get);
    app.get('/localidad/:id', methods.getId); //id comuna
};