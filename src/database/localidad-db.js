'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');
const enums = require('../../common/enums');


const pool = mysql.createPool(configDb.db);

async function getLocalidad(){
    
    let query = 'SELECT * FROM T_LOCALIDAD WHERE vigente = 1'
    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function getLocalidadId(id){ // traer localidad por id de comuna 

    let query = 'SELECT  lc.id_localidad, lc.nombre_localidad, cm.id_comuna, cm.nombre_comuna, rg.id_region, rg.nombre_region, pv.id_provincia, pv.nombre_provincia FROM T_LOCALIDAD lc inner join T_COMUNA cm inner join T_REGION rg inner join T_PROVINCIA pv WHERE lc.id_comuna = cm.id_comuna and lc.id_comuna ='+id+' and rg.id_region = lc.id_region and pv.id_provincia = lc.id_provincia AND lc.vigente = 1';

    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function getLocalidadIdLocalidad(id){ // traer localidad por id de localidad 

    let query = 'SELECT  lc.id_localidad, lc.nombre_localidad, cm.id_comuna, cm.nombre_comuna, rg.id_region, rg.nombre_region, pv.id_provincia, pv.nombre_provincia FROM T_LOCALIDAD lc inner join T_COMUNA cm inner join T_REGION rg inner join T_PROVINCIA pv WHERE lc.id_comuna = cm.id_comuna and lc.id_localidad ='+id+' and rg.id_region = lc.id_region and pv.id_provincia = lc.id_provincia AND lc.vigente = 1';

    const result = await pool.query(query);

    if (result[0].length === 0) {
        return null;
      }
      return result[0];
}

async function insertLocalidad(params){
    const { comunaLocalidad, regionLocalidad, provinciaLocalidad, nombreLocalidad } = params;
    const fecha_creacion = {fecha_creacion: new Date()}

    let query = 'INSERT INTO T_LOCALIDAD SET nombre_localidad = ?, id_comuna = ?, fecha_creacion = ?, fecha_modificacion = ?, usuario_creacion = ?, usuario_modificacion = ?, vigente = ?, id_region = ?, id_provincia = ?';

    const result = await pool.query(query,[nombreLocalidad, comunaLocalidad, fecha_creacion.fecha_creacion, null, null, null, 1, regionLocalidad, provinciaLocalidad ]);

    if (!result[0]) {
        throw new Error('Error al insertar datos');
      }
      return result[0];
}

async function updateLocalidad(params){
    const {id_localidad, nombre_localidad, region_localidad, provincia_localidad, comuna_localidad } = params;
    const fecha_modificacion = {fecha_modificacion: new Date()}

    let query = 'UPDATE T_LOCALIDAD SET nombre_localidad = ?, id_comuna = ?, fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ?, id_region = ?, id_provincia = ? WHERE ID_LOCALIDAD = '+id_localidad+'';

    const result = await pool.query(query,[nombre_localidad, comuna_localidad, fecha_modificacion.fecha_modificacion, null, 1, region_localidad, provincia_localidad ]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

async function deleteLocalidad(id){
    const fecha_modificacion = {fecha_modificacion: new Date()}
    const eliminado = enums.Eliminado;
    
    let query = 'UPDATE T_LOCALIDAD SET fecha_modificacion = ?,  usuario_modificacion = ?, vigente = ? WHERE ID_LOCALIDAD = '+id+'';
    const result = await pool.query(query,[fecha_modificacion.fecha_modificacion, null, eliminado]);

    if (result[0].affectedRows === 0) {
        return null;
      }
      return result[0];
}

module.exports = {
    getLocalidad: getLocalidad,
    getLocalidadId: getLocalidadId,
    getLocalidadIdLocalidad: getLocalidadIdLocalidad,
    insertLocalidad: insertLocalidad,
    updateLocalidad: updateLocalidad,
    deleteLocalidad: deleteLocalidad
}