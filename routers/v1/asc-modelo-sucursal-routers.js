'use strict';
var methods = require('../../src/controllers/asc-modelo-sucursal-methods');

module.exports.register = (server) => {
    server.post({
        path: '/asc-modelo-sucursal/',
        version: '1.0.0',
        // validation: {
        //     params: require('../../src/validators/id')
        // },
    },
    methods.insertAscMoSuc
    );
    server.del({
        path: '/asc-modelo-sucursal/',
        version: '1.0.0'
    },
    methods.deleteAscMoSuc
    );
}