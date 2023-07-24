'use strict';
var methods = require('../../src/controllers/localidad-methods');

module.exports.register = (server) => {
    server.get({
        path: '/mainData/localidad/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/localidad/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/localidad/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/localidad/insert')
        },
    },
    methods.insertLocalidad
    );

    server.put({
        path: '/localidad/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/localidad/insert')
        },
    },
    methods.updateLocalidad
    );

    server.delete({
        path: '/localidad/:id',
        version: '1.0.0'
    },
    methods.deleteLocalidad
    );
}