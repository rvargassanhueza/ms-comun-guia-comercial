'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getModelo(){
    
    let query = 'SELECT * FROM T_MODELO WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getModeloId(id){
    let query = 'SELECT * FROM T_MODELO WHERE ID_MODELO = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertModelo(params){
    const { id_marca, nombre_modelo, descripcion_modelo } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_MODELO SET id_marca = ?, nombre_modelo = ?, descripcion_modelo = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[id_marca, nombre_modelo, descripcion_modelo, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateModelo(params){
    const {id, id_marca, nombre_modelo, descripcion_modelo } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_MODELO SET id_marca = ?, nombre_modelo = ?, descripcion_modelo = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_MODELO = '+id+'';

    const result = await pool.query(query,[id_marca, nombre_modelo, descripcion_modelo, fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteModelo(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_MODELO SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_MODELO = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getModelo: getModelo,
    getModeloId: getModeloId,
    insertModelo: insertModelo,
    updateModelo: updateModelo,
    deleteModelo: deleteModelo
}