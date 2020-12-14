'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function insertAscCatSubCat(params){
    const { id_categoria, id_sub_categoria } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_PASO_CATEGORIA_SUB_CATEGORIA SET id_categoria = ?, id_sub_categoria = ?,fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[id_categoria, id_sub_categoria, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos y realizar asociación');
      }
      return result[0];
}

async function deleteAscCatSubCat(id_categoria, id_sub_categoria){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_PASO_CATEGORIA_SUB_CATEGORIA SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_CATEGORIA = '+id_categoria+' AND ID_SUB_CATEGORIA = '+id_sub_categoria+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    
    insertAscCatSubCat: insertAscCatSubCat,
    deleteAscCatSubCat: deleteAscCatSubCat
}