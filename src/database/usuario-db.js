'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');
const bcrypt = require('bcrypt');


const pool = mysql.createPool(configDb.db);

async function get(){
    
    let query = 'SELECT us.id_usuario, us.nombre_usuario, us.apellido_usuario, us.email_usuario, us.descripcion_usuario, tus.nombre_tipo_usuario, tus.id_tipo_usuario FROM T_USUARIO us inner join T_TIPO_USUARIO tus WHERE us.id_tipo_usuario = tus.id_tipo_usuario and us.vigente = 1';

    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getId(id){
    
  try {
    let query = 'SELECT us.id_usuario, us.nombre_usuario, us.apellido_usuario, us.email_usuario, us.descripcion_usuario, tus.nombre_tipo_usuario, tus.id_tipo_usuario,us.pass_usuario FROM T_USUARIO us inner join T_TIPO_USUARIO tus WHERE us.id_tipo_usuario = tus.id_tipo_usuario and us.vigente = 1 and us.id_usuario = '+id+'';  

    
    const result = await pool.query(query, id);

    const user = result[0][0];

    if (!result || result.length === 0 || result[0].length === 0) {
      return { error:1, message: 'Id de Usuario no válido' };
    }else{
      return {id_usuario:user.id_usuario, nombre_usuario:user.nombre_usuario, apellido_usuario:user.apellido_usuario, email_usuario:user.email_usuario, descripcion_usuario:user.descripcion_usuario, id_tipo_usuario:user.id_tipo_usuario, nombre_tipo_usuario:user.nombre_tipo_usuario}
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error en el servidor' };
  }
}

async function insertUser(params) {
    try {
        const {id_tipo_usuario, nombre_usuario, apellido_usuario, email_usuario, pass_usuario, descripcion_usuario } = params;
        const fecha_creacion = {fecha_creacion: new Date()}

         // Verificar si el usuario o el correo electrónico ya existen
        const userExists = await checkUserExistence(email_usuario);
        if (userExists) {
          return null; // Devuelve null si el usuario o correo electrónico ya existen
        }
  
      // Encriptar la contraseña antes de almacenarla en la base de datos
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass_usuario, saltRounds);
  
      // Crear una nueva conexión para la inserción del usuario
      const connection = await pool.getConnection();
  
      // Realizar la inserción en la base de datos
      const query = 'INSERT INTO T_USUARIO SET id_tipo_usuario = ?, email_usuario = ?, pass_usuario = ?,descripcion_usuario = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?, sesion_activa = ?, nombre_usuario = ?, apellido_usuario = ?';

      const values = [id_tipo_usuario, email_usuario, hashedPassword, descripcion_usuario, fecha_creacion.fecha_creacion, null, null, null, 1, 0, nombre_usuario, apellido_usuario ];
  
      await connection.query(query, values);
  
      // Liberar la conexión
      connection.release();
  
      return { success: true, message: 'Usuario registrado con éxito' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al registrar el usuario' };
    }
  }

  async function checkUserExistence(email) {
    try {
      const query = 'SELECT COUNT(*) as count FROM T_USUARIO WHERE email_usuario = ?';
      const values = [email];
  
      const result = await pool.query(query, values);
      const count = result[0][0].count;
  
      return count > 0; // Devuelve true si el usuario o correo electrónico ya existen
    } catch (error) {
      console.error(error);
      return false; // En caso de error, devuelve false
    }
  }
  

async function updateUser(params){
    const {id_usuario, id_tipo_usuario, nombre_usuario, apellido_usuario, pass_usuario, descripcion_usuario } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_USUARIO SET id_tipo_usuario = ?, nombre_usuario = ?,  apellido_usuario = ?, descripcion_usuario = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE id_usuario = '+id_usuario+'';

    const result = await pool.query(query,[id_tipo_usuario, nombre_usuario, apellido_usuario, descripcion_usuario,fecha_modificacion.fecha_modificacion, null, 1]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteUser(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_USUARIO SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE id_usuario = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getUser: get,
    getUserId: getId,
    insertUser: insertUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}