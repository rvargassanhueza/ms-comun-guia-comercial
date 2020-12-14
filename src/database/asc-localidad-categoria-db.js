'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function insertAscLocalCateg(params){
    const { id_localidad, id_categoria } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_PASO_LOCALIDAD_CATEGORIA SET id_localidad = ?, id_categoria = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[id_localidad, id_categoria, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos y realizar asociación');
      }
      return result[0];
}

async function deleteAscLocalCateg(id_localidad, id_categoria){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_PASO_LOCALIDAD_CATEGORIA SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE id_localidad = '+id_localidad+' AND id_categoria = '+id_categoria+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    
    insertAscLocalCateg: insertAscLocalCateg,
    deleteAscLocalCateg: deleteAscLocalCateg
}