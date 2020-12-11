'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function insertAscMoSuc(params){
    const { id_modelo, id_sucursal } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_REGISTROS_MODELO_SUCURSAL SET id_modelo = ?, id_sucursal = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[id_modelo, id_sucursal, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos y realizar asociación');
      }
      return result[0];
}

async function deleteAscMoSuc(id_modelo, id_sucursal){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_REGISTROS_MODELO_SUCURSAL SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_MODELO = '+id_modelo+' AND ID_SUCURSAL = '+id_sucursal+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    
    insertAscMoSuc: insertAscMoSuc,
    deleteAscMoSuc: deleteAscMoSuc
}