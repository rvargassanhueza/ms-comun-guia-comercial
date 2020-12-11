'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getCliente(){
    
    let query = 'SELECT * FROM T_CLIENTES WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getClienteId(id){
    let query = 'SELECT * FROM T_CLIENTES WHERE ID_CLIENTE = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertCliente(params){
    const fecha_creacion = {fecha_creacion: new Date()}
    const { id_tipo_cliente, nombre_cliente, descripcion_cliente } = params;

    let query = 'INSERT INTO T_CLIENTES SET id_tipo_cliente = ?, nombre_cliente = ?, descripcion_cliente = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[id_tipo_cliente, nombre_cliente, descripcion_cliente, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateCliente(params){
    const {id, id_tipo_cliente, nombre_cliente, descripcion_cliente } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_CLIENTES SET id_tipo_cliente = ?, nombre_cliente = ?, descripcion_cliente = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_CLIENTE = '+id+'';

    const result = await pool.query(query,[id_tipo_cliente, nombre_cliente, descripcion_cliente, fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteCliente(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_CLIENTES SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_CLIENTE = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getCliente: getCliente,
    getClienteId: getClienteId,
    insertCliente: insertCliente,
    updateCliente: updateCliente,
    deleteCliente: deleteCliente
}