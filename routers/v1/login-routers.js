'use strict';
const methods = require('../../src/controllers/login-method');

module.exports.register = (app) => {
   
    app.post('/login/', methods.loginUser);
   
};



// module.exports.register = (server) => {
    // server.get({
    //     path: '/login/',
    //     version: '1.0.0'
    // },
    //     methods.get
    // );
    // server.get({
    //     path: '/usuario/:id',
    //     version: '1.0.0'
    // },
    // methods.getId
    // );

//     server.post({
//         path: '/login/',
//         version: '1.0.0',
//         validation: {
//             // params: require('../../src/validators/usuarios/insert')
//         },
//     },
//     methods.loginUser
//     );

//     // server.put({
//     //     path: '/usuario/:id',
//     //     version: '1.0.0',
//     //     validation: {
//     //         // params: require('../../src/validators/usuarios/insert')
//     //     },
//     // },
//     // methods.updateUser
//     // );

//     // server.del({
//     //     path: '/usuario/:id',
//     //     version: '1.0.0'
//     // },
//     // methods.deleteUser
//     // );
// }