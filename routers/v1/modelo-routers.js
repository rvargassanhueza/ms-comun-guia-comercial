'use strict';
var methods = require('../../src/controllers/modelo-methods');

module.exports.register = (server) => {
    server.get({
        path: '/mainData/modelo/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/mainData/modelo/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/mainData/modelo/',
        version: '1.0.0',
        // validation: {
        //     params: require('../../src/validators/modelos/insert')
        // },
    },
    methods.insertModelo
    );

    server.put({
        path: '/mainData/modelo/:id',
        version: '1.0.0',
        // validation: {
        //     params: require('../../src/validators/modelos/insert')
        // },
    },
    methods.updateModelo
    );

    server.del({
        path: '/mainData/modelo/:id',
        version: '1.0.0'
    },
    methods.deleteModelo
    );
}