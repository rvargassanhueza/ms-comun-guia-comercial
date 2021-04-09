'use strict';
var methods = require('../../src/controllers/cliente-methods');

module.exports.register = (server) => {
    server.get({
        path: '/mainData/cliente/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/cliente/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/cliente/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/cliente/insert')
        },
    },
    methods.insertCliente
    );

    server.put({
        path: '/cliente/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/cliente/insert')
        },
    },
    methods.updateCliente
    );

    server.del({
        path: '/cliente/:id',
        version: '1.0.0'
    },
    methods.deleteCliente
    );
}