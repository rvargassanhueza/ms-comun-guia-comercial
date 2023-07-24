'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const pool = mysql.createPool(configDb.db);


async function loginUser(params, res) {
  try {
    const { email, password } = params;

    let query = 'SELECT * FROM T_USUARIO WHERE nombre_usuario = ?';
    let values = [email];

    const result = await pool.query(query, values);

    if (!result || result.length === 0 || result[0].length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas o usuario no encontrado' });
    }

    const user = result[0][0];

    // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Generar el token de autenticación
      const token = jwt.sign({ email: user.email, tipo_usuario: user.tipo_usuario }, 'secret-key', { expiresIn: '1h' });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}


module.exports = {
    loginUser: loginUser
}