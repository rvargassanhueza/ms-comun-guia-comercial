'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');

// Select DISTINCT tsc.nombre_sub_categoria FROM t_sub_categoria tsc INNER JOIN t_paso_localidad_categoria tp ON tp.id_localidad = 1 AND tp.id_categoria= tsc.id_categoria ORDER BY `tsc`.`nombre_sub_categoria` ASC ---> trae las sub-categorías de una localidad.

const pool = mysql.createPool(configDb.db);

async function getCat(){
    
    let query = 'SELECT * FROM T_CATEGORIA WHERE vigente = 0'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getCatId(id){
    let query = 'SELECT * FROM T_CATEGORIA WHERE ID_CATEGORIA = '+id+' AND vigente = 0';  
    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function getCatLocalidad(id){

    let query = 'Select DISTINCT tl.nombre_localidad, tp.id_localidad, tc.id_categoria, tc.nombre_categoria FROM t_categoria tc INNER JOIN t_paso_localidad_categoria tp ON tp.id_localidad = '+id+' AND tp.id_categoria= tc.id_categoria INNER JOIN t_localidad tl ON tl.id_localidad = tp.id_localidad ORDER BY `tc`.`nombre_categoria` ASC';

    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertCat(params){
    const { nombre_categoria, descripcion_categoria } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_CATEGORIA SET nombre_categoria = ?, descripcion_categoria = ?,  fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?';

    const result = await pool.query(query,[nombre_categoria, descripcion_categoria, fecha_creacion.fecha_creacion, null, null, null, 0]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateCat(params){
    const {id, nombre_categoria, descripcion_categoria, direccion_categoria } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_CATEGORIA SET nombre_categoria = ?, descripcion_categoria = ?, direccion_categoria = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_categoria = '+id+'';

    const result = await pool.query(query,[nombre_categoria, descripcion_categoria, direccion_categoria,fecha_modificacion.fecha_modificacion, null, 0]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteCat(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_CATEGORIA SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_categoria = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getCat:     getCat,
    getCatId:   getCatId,
    insertCat:  insertCat,
    updateCat:  updateCat,
    deleteCat:  deleteCat,
    getCatLocalidad: getCatLocalidad
}