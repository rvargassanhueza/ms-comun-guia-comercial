'use strict';
var methods = require('../../src/controllers/tipo-usuario-methods');

module.exports.register = (server) => {
    server.get({
        path: '/tipo-usuario/',
        version: '1.0.0'
    },
        methods.get
    );
    server.get({
        path: '/tipo-usuario/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/tipo-usuario/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/usuarios/tipo-usuario/insert')
        },
    },
    methods.insertUser
    );

    server.put({
        path: '/tipo-usuario/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/usuarios/tipo-usuario/insert')
        },
    },
    methods.updateUser
    );

    server.del({
        path: '/tipo-usuario/:id',
        version: '1.0.0'
    },
    methods.deleteUser
    );
}