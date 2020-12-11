'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getSuc(){
    
    let query = 'SELECT * FROM T_SUCURSAL WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getSucId(id){
    let query = 'SELECT * FROM T_SUCURSAL WHERE ID_SUCURSAL = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertSuc(params){
    const { nombre_sucursal, descripcion_sucursal, id_comuna, id_concesionaria, direccion_sucursal } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_SUCURSAL SET nombre_sucursal = ?, descripcion_sucursal = ?, id_comuna = ?, id_concesionaria = ?, direccion_sucursal = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[nombre_sucursal, descripcion_sucursal, id_comuna, id_concesionaria, direccion_sucursal, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateSuc(params){
    const {id, nombre_sucursal, descripcion_sucursal, id_comuna, id_concesionaria, direccion_sucursal } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_SUCURSAL SET nombre_sucursal = ?, descripcion_sucursal = ?, id_comuna = ?, id_concesionaria = ?, direccion_sucursal = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_SUCURSAL = '+id+'';

    const result = await pool.query(query,[nombre_sucursal, descripcion_sucursal, id_comuna, id_concesionaria, direccion_sucursal,fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteSuc(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_SUCURSAL SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_SUCURSAL = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getSuc: getSuc,
    getSucId: getSucId,
    insertSuc: insertSuc,
    updateSuc: updateSuc,
    deleteSuc: deleteSuc
}