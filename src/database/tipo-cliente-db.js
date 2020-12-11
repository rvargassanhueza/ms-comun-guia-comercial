'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getTipoCl(){
    
    let query = 'SELECT * FROM T_TIPO_CLIENTE WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getTipoClId(id){
    let query = 'SELECT * FROM T_TIPO_CLIENTE WHERE ID_TIPO_CLIENTE = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertTipoCl(params){

    const fecha_creacion = {fecha_creacion: new Date()}
    const { nombre_tipo_cliente, descripcion_tipo_cliente } = params;
    let query = 'INSERT INTO T_TIPO_CLIENTE SET nombre_tipo_cliente = ?, descripcion_tipo_cliente = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[nombre_tipo_cliente, descripcion_tipo_cliente, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateTipoCl(params){

    const fecha_modificacion = {fecha_modificacion: new Date()};
    const {id, nombre_tipo_cliente, descripcion_tipo_cliente } = params;
    
    let query = 'UPDATE T_TIPO_CLIENTE SET nombre_tipo_cliente = ?, descripcion_tipo_cliente = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_TIPO_CLIENTE = '+id+'';

    const result = await pool.query(query,[nombre_tipo_cliente, descripcion_tipo_cliente, fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteTipoCl(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_TIPO_CLIENTE SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_TIPO_CLIENTE = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getTipoCl: getTipoCl,
    getTipoClId: getTipoClId,
    insertTipoCl: insertTipoCl,
    updateTipoCl: updateTipoCl,
    deleteTipoCl: deleteTipoCl
}