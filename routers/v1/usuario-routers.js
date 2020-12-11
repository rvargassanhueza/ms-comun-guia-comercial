'use strict';
var methods = require('../../src/controllers/usuario-methods');

module.exports.register = (server) => {
    server.get({
        path: '/usuario/',
        version: '1.0.0'
    },
        methods.get
    );
    server.get({
        path: '/usuario/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/usuario/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/usuarios/insert')
        },
    },
    methods.insertUser
    );

    server.put({
        path: '/usuario/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/usuarios/insert')
        },
    },
    methods.updateUser
    );

    server.del({
        path: '/usuario/:id',
        version: '1.0.0'
    },
    methods.deleteUser
    );
}