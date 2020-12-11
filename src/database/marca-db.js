'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getMarca(){
    
    let query = 'SELECT * FROM T_MARCA WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getMarcaId(id){
    let query = 'SELECT * FROM T_MARCA WHERE ID_MARCA = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertMarca(params){
    const { nombre_marca, descripcion_marca } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_MARCA SET nombre_marca = ?, descripcion_marca = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[nombre_marca, descripcion_marca, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateMarca(params){
    const {id, nombre_marca, descripcion_marca } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_MARCA SET nombre_marca = ?, descripcion_marca = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_MARCA = '+id+'';

    const result = await pool.query(query,[nombre_marca, descripcion_marca, fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteMarca(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_MARCA SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_MARCA = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getMarca: getMarca,
    getMarcaId: getMarcaId,
    insertMarca: insertMarca,
    updateMarca: updateMarca,
    deleteMarca: deleteMarca
}