'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');
const bcrypt = require('bcrypt');


const pool = mysql.createPool(configDb.db);

async function get(){
    
    let query = 'SELECT us.id_usuario, us.nombre_usuario, us.descripcion_usuario, tus.nombre_tipo_usuario FROM T_USUARIO us inner join T_TIPO_USUARIO tus WHERE us.id_tipo_usuario = tus.id_tipo_usuario and us.vigente = 0';

    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getId(id){
    
    let query = 'SELECT us.id_usuario, us.nombre_usuario, us.descripcion_usuario, tus.nombre_tipo_usuario, tus.id_tipo_usuario,us.pass_usuario FROM T_USUARIO us inner join t_tipo_usuario tus WHERE us.id_tipo_usuario = tus.id_tipo_usuario and us.vigente = 0 and us.id_usuario = '+id+'';  

    
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertUser(params) {
    try {
        const {id_tipo_usuario, email_usuario, pass_usuario, descripcion_usuario } = params;
        const fecha_creacion = {fecha_creacion: new Date()}
  
      // Encriptar la contraseña antes de almacenarla en la base de datos
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass_usuario, saltRounds);
  
      // Crear una nueva conexión para la inserción del usuario
      const connection = await pool.getConnection();
  
      // Realizar la inserción en la base de datos
      const query = 'INSERT INTO T_USUARIO SET id_tipo_usuario = ?, email_usuario = ?, pass_usuario = ?,descripcion_usuario = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

      const values = [id_tipo_usuario, email_usuario, hashedPassword, descripcion_usuario, fecha_creacion.fecha_creacion, null, null, null, 0];

    //   let query = 'INSERT INTO T_USUARIO SET id_tipo_usuario = ?, nombre_usuario = ?, pass_usuario = ?,descripcion_usuario = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    // const result = await pool.query(query,[id_tipo_usuario, nombre_usuario, pass_usuario, descripcion_usuario, fecha_creacion.fecha_creacion, null, null, null, 0]);
  
      await connection.query(query, values);
  
      // Liberar la conexión
      connection.release();
  
      return { success: true, message: 'Usuario registrado con éxito' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al registrar el usuario' };
    }
  }

async function updateUser(params){
    const {id, id_tipo_usuario, nombre_usuario, pass_usuario, descripcion_usuario } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_USUARIO SET id_tipo_usuario = ?, nombre_usuario = ?, pass_usuario = ?,descripcion_usuario = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE id_usuario = '+id+'';

    const result = await pool.query(query,[id_tipo_usuario, nombre_usuario, pass_usuario, descripcion_usuario,fecha_modificacion.fecha_modificacion, null, 0]);

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