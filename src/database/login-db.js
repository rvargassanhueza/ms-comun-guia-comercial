'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool(configDb.db);

async function loginUser(params) {
  try {
    const { email, password } = params;

    let query = 'SELECT * FROM T_USUARIO WHERE email_usuario = ?';
    let values = [email];

    const result = await pool.query(query, values);
    const user = result[0][0];

    if (!result || result.length === 0 || result[0].length === 0) {
      return { error:1, message: 'Credenciales inválidas o usuario no encontrado' };
    }

    if (user.sesion_activa === 1) {
      return { error: 2, message: "La sesión del usuario ya se encuentra activa" };
    }

    // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.pass_usuario);

    if (isPasswordValid) {
      // Generar el token de autenticación
      const token = jwt.sign({ email: user.email_usuario, tipo_usuario: user.id_tipo_usuario, sesion_activa:user.sesion_activa, id_usuario:user.id_usuario }, 'secret-key', { expiresIn: '1h' });

      let userId = user.id_usuario;

      const updateQuery = 'UPDATE T_USUARIO SET sesion_activa = 1 WHERE id_usuario = ?';
      await pool.query(updateQuery, [userId]);

      return { token:token, email: user.email_usuario, tipo_usuario: user.id_tipo_usuario, sesion_activa: user.sesion_activa, id_usuario:user.id_usuario };
    } else {
      return { error:1, message: 'Credenciales inválidas' };
    }
  } catch (error) {
    console.error(error);
    return { error: 'Error en el servidor' };
  }
}

async function logoutUser(id, res) {
  try {
    const userId = id;

    let queryFind = 'SELECT * FROM T_USUARIO WHERE id_usuario = ?';
    const result = await pool.query(queryFind, [userId]);

    if (!result || result.length === 0 || result[0].length === 0) {
      return { error:1, message: 'Credenciales inválidas o usuario no encontrado' };
    } else {
      // Actualizar el valor de sesion_activa a 0 para el usuario
      const updateQuery = 'UPDATE T_USUARIO SET sesion_activa = 0 WHERE id_usuario = ?';
      return await pool.query(updateQuery, [userId]);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = {
    loginUser: loginUser,
    logoutUser: logoutUser
}