'use strict';
var methods = require('../../src/controllers/tipo-cliente-methods');

module.exports.register = (server) => {
    server.get({
        path: '/tipo-cliente/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/tipo-cliente/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/tipo-cliente/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/tipo_cliente/insert')
        },
    },
    methods.insertMarca
    );

    server.put({
        path: '/tipo-cliente/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/tipo_cliente/insert')
        },
    },
    methods.updateMarca
    );

    server.del({
        path: '/tipo-cliente/:id',
        version: '1.0.0'
    },
    methods.deleteMarca
    );
}