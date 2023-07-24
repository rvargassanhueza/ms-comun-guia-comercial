'use strict'
require('dotenv').config({ path: 'env.env' });
const loginServices = require('../database/login-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _login = async function (req, res){
    try {
      const { email, password } = req.body;
      const params = { email: email, password: password };
      let result = await loginServices.loginUser(params, res);
  
      if (result === undefined) {
        res.status(httpStatus.NOT_FOUND).json({ error: 'Credenciales inválidas' });
      } else {
        res.status(httpStatus.CREATED).json(result);
      }
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error en el servidor' });
    }
  };
  

module.exports = {
 
    loginUser: _login
}