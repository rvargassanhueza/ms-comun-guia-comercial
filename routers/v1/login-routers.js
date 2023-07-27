'use strict';
const methods = require('../../src/controllers/login-method');

module.exports.register = (app) => {
   
    app.post('/login/', methods.loginUser);
    app.post('/logout/', methods.logoutUser);
   
};
