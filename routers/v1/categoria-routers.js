'use strict';
var methods = require('../../src/controllers/categoria-methods');

module.exports.register = (server) => {
    server.get({
        path: '/mainData/categoria/',
        version: '1.0.0'
    },
        methods.getCat
    );

    server.get({
        path: '/categoria/:id',
        version: '1.0.0'
    },
    methods.getIdCat
    );

    server.get({
        path: '/categoria/localidad/:idLocalidad',
        version: '1.0.0'
    },
    methods.getCatLol
    );

    server.post({
        path: '/categoria/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/categoria/insert')
        },
    },
    methods.insertCat
    );

    server.put({
        path: '/categoria/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/categoria/insert')
        },
    },
    methods.updateCat
    );

    server.del({
        path: '/categoria/:id',
        version: '1.0.0'
    },
    methods.deleteCat
    );
}