'use strict';
var methods = require('../../src/controllers/asc-categoria-sub_categoria-methods');

module.exports.register = (server) => {

    server.get({
        path: '/mainData/categoria-sub_categoria/',
        version: '1.0.0'
    },
        methods.getAsocCatSub
    );

    server.post({
        path: '/asc-categoria-sub_categoria/',
        version: '1.0.0',
        validation: {
            // params: require('../../src/validators/asociacion/insert_MA_CO')
        },
    },
    methods.insertAscCatSubCat
    );
    server.delete({
        path: '/asc-categoria-sub_categoria/',
        version: '1.0.0'
    },
    methods.deleteAscCatSubCat
    );
}