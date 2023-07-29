'use strict'
const loginServices = require('../database/login-db');
const httpStatus = require('http-status');

let _login = async function (req, res) {
  try {

      const formData = req.body;
      const email = formData.email;
      const password = formData.password;
      const params = { email: email, password: password };

      let result = await loginServices.loginUser(params);

    if (result.error) {
      if(result.error === 2){//La sesión del usuario ya se encuentra activa
        return res.status(httpStatus.UNAUTHORIZED).json({ error: result.error, message:result.message });
      }else if(result.error === 1){//Credenciales inválidas o usuario no encontrado
        return res.status(httpStatus.UNAUTHORIZED).json({ error: result.error, message:result.message });
      }
      
    } else {
      return res.status(httpStatus.OK).json({ token:result.token, nombre_usuario:result.nombre_usuario, apellido_usuario:result.apellido_usuario, email: result.email_usuario, tipo_usuario: result.tipo_usuario, sesion_activa: result.sesion_activa, id_usuario:result.id_usuario });
    }
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error en el servidor' });
  }
};

let _logout = async function (req, res) {
  try {
    const { id } = req.query;
    let result = await loginServices.logoutUser(id, res);

    if (result) {
      return res.status(httpStatus.OK).json({ message: 'Sesión cerrada correctamente'  });     
    } 
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
    loginUser: _login,
    logoutUser: _logout
}