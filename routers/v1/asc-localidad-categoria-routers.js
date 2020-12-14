'use strict';
var methods = require('../../src/controllers/asc-localidad-categoria-methods');

module.exports.register = (server) => {
    server.post({
        path: '/asc-localidad-categoria/',
        version: '1.0.0',
        // validation: {
        //     params: require('../../src/validators/id')
        // },
    },
    methods.insertAscLocalCateg
    );
    server.del({
        path: '/asc-localidad-categoria/',
        version: '1.0.0'
    },
    methods.deleteAscLocalCateg
    );
}