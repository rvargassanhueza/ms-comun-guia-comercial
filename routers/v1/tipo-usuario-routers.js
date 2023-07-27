'use strict';
var methods = require('../../src/controllers/tipo-usuario-methods');

module.exports.register = (app) => {
    app.get('/tipo-usuario/', methods.get);
    app.get('/tipo-usuario/:id', methods.getId);
    app.post('/tipo-usuario/', methods.insertUser);
    app.put('/tipo-usuario/:id', methods.updateUser);
    app.delete('/tipo-usuario/:id', methods.deleteUser);
};