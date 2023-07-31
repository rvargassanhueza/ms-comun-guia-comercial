'use strict';
const methods = require('../../src/controllers/territorio-methods');

module.exports.register = (app) => {
    app.get('/region/', methods.getRegion);
    app.get('/provincia/:id', methods.getProvincia); //id región
    app.get('/comuna/:id', methods.getComunaiD); // id provincia
    app.get('/comuna/buscar/:texto', methods.getComuna); 
};