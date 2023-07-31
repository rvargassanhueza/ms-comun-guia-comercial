'use strict';
var methods = require('../../src/controllers/localidad-methods');

module.exports.register = (app) => {
    app.get('/localidad/', methods.get);
    app.get('/localidad/comuna/:id', methods.getId); //id comunav
    app.get('/localidad/:id', methods.getIdLocalidad); //id localidad
    app.post('/localidad/', methods.insertLocalidad);
    app.put('/localidad/:id', methods.updateLocalidad);
};