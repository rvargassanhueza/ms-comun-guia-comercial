'use strict';
var methods = require('../../src/controllers/asc-marca-concesionaria-methods');

module.exports.register = (server) => {
    server.post({
        path: '/asc-marca-concesionaria/',
        version: '1.0.0',
        validation: {
            params: require('../../src/validators/asociacion/insert_MA_CO')
        },
    },
    methods.insertAscMaCo
    );
    server.del({
        path: '/asc-marca-concesionaria/',
        version: '1.0.0'
    },
    methods.deleteAscMaCo
    );
}