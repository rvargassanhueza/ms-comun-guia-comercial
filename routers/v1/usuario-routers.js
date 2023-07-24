'use strict';
const methods = require('../../src/controllers/usuario-methods');

module.exports.register = (app) => {
    app.get('/usuario/', methods.get);
    app.get('/usuario/:id', methods.getId);
    app.post('/usuario/', methods.insertUser);
    app.put('/usuario/:id', methods.updateUser);
    app.delete('/usuario/:id', methods.deleteUser);
};