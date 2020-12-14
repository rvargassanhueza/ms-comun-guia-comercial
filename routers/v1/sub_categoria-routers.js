'use strict';
var methods = require('../../src/controllers/sub_categoria-methods');

module.exports.register = (server) => {
    server.get({
        path: '/subCategoria/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/subCategoria/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.get({
        path: '/subCategoria/localidad/:id',
        version: '1.0.0'
    },
    methods._getLocalidadSubCategoria
    );

    server.post({
        path: '/subCategoria/',
        version: '1.0.0',
        validation: {
            // params: require('../../src/validators/subCategoria/insert')
        },
    },
    methods.insertSubCategoria
    );

    server.put({
        path: '/subCategoria/',
        version: '1.0.0',
        validation: {
            // params: require('../../src/validators/subCategoria/insert')
        },
    },
    methods.updateSubCategoria
    );

    server.del({
        path: '/subCategoria/:id',
        version: '1.0.0'
    },
    methods.deleteSubCategoria
    );
}