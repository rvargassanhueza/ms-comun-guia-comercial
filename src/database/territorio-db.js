'use strict';
const mysql = require('mysql2/promise');
const configDb = require('../../common/configDb');

const pool = mysql.createPool(configDb.db);

async function _getRegion(){
    
    let query = 'SELECT id_region, nombre_region FROM T_REGION  WHERE vigente = 1';

    const result = await pool.query(query);

    if (!result[0]) {
        throw new Error('GET with this id was not found');
      }
      return result[0];

}

async function _getProvincia(id){
    
  try {
   
    let query = 'SELECT DISTINCT pv.id_provincia, pv.nombre_provincia FROM T_PROVINCIA pv inner join T_REGION rg WHERE pv.id_region ='+id+'';

    
    const result = await pool.query(query, id);

    const provincia = result[0];

    if (!result || result.length === 0 || result[0].length === 0) {
      return { error:1, message: 'Id de Región no válido' };
    }else{
      return {provincia}
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error en el servidor' };
  }
}

async function _getComunaiD(id){
    
    try {
        let query = 'SELECT DISTINCT cm.id_comuna, cm.nombre_comuna FROM T_COMUNA cm inner join T_PROVINCIA pv WHERE cm.id_provincia = '+id+''; 
      
      const result = await pool.query(query, id);
  
      const comuna = result[0];
  
      if (!result || result.length === 0 || result[0].length === 0) {
        return { error:1, message: 'Id de Usuario no válido' };
      }else{
        return {comuna}
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error en el servidor' };
    }
  }

  async function _getComuna(texto){
    
    try {
      let query = `SELECT DISTINCT cm.id_comuna, cm.nombre_comuna FROM T_COMUNA cm WHERE cm.nombre_comuna LIKE '%${texto}%'`;
      
      const result = await pool.query(query);
  
      const comuna = result[0];
  
      if (!result || result.length === 0 || result[0].length === 0) {
        return { error:1, message: 'Id de Usuario no válido' };
      }else{
        return {comuna}
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error en el servidor' };
    }
  }

module.exports = {
    getRegion: _getRegion,
    getProvincia: _getProvincia,
    getComunaiD: _getComunaiD,
    getComuna: _getComuna
}