'use strict'
// require('dotenv').config({ path: 'env.env' });
const loginServices = require('../database/login-db');
const httpStatus = require('http-status');
// const constants = require('../../common/const');

let _login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const params = { email: email, password: password };
    let result = await loginServices.loginUser(params);

    if (result.error) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Credenciales inválidas' });
    } else {
      return res.status(httpStatus.OK).json({ token: result.token });
    }
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error en el servidor' });
  }
};
  

module.exports = {
 
    loginUser: _login
}