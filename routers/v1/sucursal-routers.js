'use strict';
var methods = require('../../src/controllers/sucursal-methods');

module.exports.register = (server) => {
    server.get({
        path: '/sucursal/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/sucursal/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/sucursal/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/sucursal/insert')
        },
    },
    methods.insertSuc
    );

    server.put({
        path: '/sucursal/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/sucursal/insert')
        },
    },
    methods.updateSuc
    );

    server.del({
        path: '/sucursal/:id',
        version: '1.0.0'
    },
    methods.deleteSuc
    );
}