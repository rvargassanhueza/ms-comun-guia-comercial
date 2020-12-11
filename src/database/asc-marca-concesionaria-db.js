'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function insertAscMaCo(params){
    const { id_marca, id_concesionaria } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_REGISTROS_MARCA_CONCESIONARIA SET id_marca = ?, id_concesionaria = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[id_marca, id_concesionaria, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos y realizar asociación');
      }
      return result[0];
}

async function deleteAscMaCo(id_marca, id_concesionaria){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_REGISTROS_MARCA_CONCESIONARIA SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_MARCA = '+id_marca+' AND ID_CONCESIONARIA = '+id_concesionaria+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    
    insertAscMaCo: insertAscMaCo,
    deleteAscMaCo: deleteAscMaCo
}