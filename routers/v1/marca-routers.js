'use strict';
var methods = require('../../src/controllers/marca-methods');

module.exports.register = (server) => {
    server.get({
        path: '/mainData/marca/',
        version: '1.0.0'
    },
        methods.get
    );

    server.get({
        path: '/mainData/marca/:id',
        version: '1.0.0'
    },
    methods.getId
    );

    server.post({
        path: '/mainData/marca/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/marca/insert')
        },
    },
    methods.insertMarca
    );

    server.put({
        path: '/mainData/marca/:id',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/marca/insert')
        },
    },
    methods.updateMarca
    );

    server.del({
        path: '/mainData/marca/:id',
        version: '1.0.0'
    },
    methods.deleteMarca
    );
}