'use strict';
var methods = require('../../src/controllers/asc-categoria-sub_categoria-methods');

module.exports.register = (server) => {
    server.post({
        path: '/asc-categoria-sub_categoria/',
        version: '1.0.0',
        validation: {
            // params: require('../../src/validators/asociacion/insert_MA_CO')
        },
    },
    methods.insertAscCatSubCat
    );
    server.del({
        path: '/asc-categoria-sub_categoria/',
        version: '1.0.0'
    },
    methods.deleteAscCatSubCat
    );
}