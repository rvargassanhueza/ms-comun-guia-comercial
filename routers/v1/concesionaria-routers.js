'use strict';
var methods = require('../../src/controllers/concesionaria-methods');

module.exports.register = (server) => {
    server.get({
        path: '/concesionaria/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/concesionaria/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/concesionaria/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/concesionaria/insert')
        },
    },
    methods.insertCons
    );

    server.put({
        path: '/concesionaria/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/concesionaria/insert')
        },
    },
    methods.updateCons
    );

    server.del({
        path: '/concesionaria/:id',
        version: '1.0.0'
    },
    methods.deleteCons
    );
}