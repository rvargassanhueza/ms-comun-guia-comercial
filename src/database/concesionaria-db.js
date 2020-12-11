'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getCons(){
    
    let query = 'SELECT * FROM T_CONCESIONARIA WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getConsId(id){
    let query = 'SELECT * FROM T_CONCESIONARIA WHERE ID_CONCESIONARIA = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertCons(params){
    const { nombre_concesionaria, descripcion_concesionaria } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_CONCESIONARIA SET nombre_concesionaria = ?, descripcion_concesionaria = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[nombre_concesionaria, descripcion_concesionaria, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateCons(params){
    const {id, nombre_concesionaria, descripcion_concesionaria } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_CONCESIONARIA SET nombre_concesionaria = ?, descripcion_concesionaria = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_CONCESIONARIA = '+id+'';

    const result = await pool.query(query,[nombre_concesionaria, descripcion_concesionaria,fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteCons(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_CONCESIONARIA SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_CONCESIONARIA = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getCons: getCons,
    getConsId: getConsId,
    insertCons: insertCons,
    updateCons: updateCons,
    deleteCons: deleteCons
}