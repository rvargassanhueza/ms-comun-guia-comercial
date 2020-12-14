'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getSubCategoria(){
    
    let query = 'SELECT * FROM T_SUB_CATEGORIA WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getSubCategoriaId(id){
    let query = 'SELECT * FROM T_SUB_CATEGORIA WHERE ID_SUB_CATEGORIA = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function getSubCategoriaLocalidad(id){

    let query = 'Select DISTINCT tpcs.id_categoria, tsc.nombre_sub_categoria, tp.id_localidad, tsc.id_sub_categoria, tsc.nombre_sub_categoria FROM t_sub_categoria tsc INNER JOIN t_paso_categoria_sub_categoria tpcs ON tpcs.id_sub_categoria = tsc.id_sub_categoria INNER JOIN t_paso_localidad_categoria tp ON tp.id_localidad = '+id+' ORDER BY `tpcs`.`id_categoria` ASC';

    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertSubCategoria(params){
    const { nombre_sub_categoria } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_SUB_CATEGORIA SET nombre_sub_categoria = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[nombre_sub_categoria, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateSubCategoria(params){
    const {id, nombre_sub_categoria } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_SUB_CATEGORIA SET nombre_sub_categoria = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_SUB_CATEGORIAA = '+id+'';

    const result = await pool.query(query,[nombre_sub_categoria, fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteSubCategoria(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_SUB_CATEGORIA SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_SUB_CATEGORIAA = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getSubCategoria: getSubCategoria,
    getSubCategoriaId: getSubCategoriaId,
    getSubCategoriaLocalidad:getSubCategoriaLocalidad,
    insertSubCategoria: insertSubCategoria,
    updateSubCategoria: updateSubCategoria,
    deleteSubCategoria: deleteSubCategoria

}