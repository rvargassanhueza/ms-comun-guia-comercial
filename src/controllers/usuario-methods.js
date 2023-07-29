'use strict'
require('dotenv').config({ path: 'env.env' });
const userServices = require('../database/usuario-db');
const httpStatus = require('http-status');
const constants = require('../../common/const');

let _get = async function (req, res) {
    try {
        let result = await userServices.getUser();
        if (result == null) {
            res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
            return;
        }
        res.status(httpStatus.OK).json(result);
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

let _getId = async function (req, res) {
  
    try {
            const id = req.params.id;
            let result = await userServices.getUserId(id);

    if (result.error) {
      if(result.error === 1){//Credenciales inválidas o usuario no encontrado
          return res.status(httpStatus.UNAUTHORIZED).json({ error: result.error, message:result.message });
        }
        
      } else {
        // return res.status(httpStatus.OK).json({ token:result.token, email: result.email_usuario, tipo_usuario: result.tipo_usuario, sesion_activa: result.sesion_activa, id_usuario:result.id_usuario });

        return res.status(httpStatus.OK).json({id_usuario:result.id_usuario, nombre_usuario:result.nombre_usuario, apellido_usuario:result.apellido_usuario, email_usuario:result.email_usuario, descripcion_usuario:result.descripcion_usuario, id_tipo_usuario:result.id_tipo_usuario, nombre_tipo_usuario:result.nombre_tipo_usuario});
      }
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error en el servidor' });
    }
};

let _insert = async function (req, res){
    try{
        const { id_tipo_usuario, nombre_usuario, apellido_usuario, email_usuario, pass_usuario, descripcion_usuario, } = req.body;

        const params = { id_tipo_usuario: id_tipo_usuario, nombre_usuario:nombre_usuario, apellido_usuario:apellido_usuario, email_usuario: email_usuario, pass_usuario:pass_usuario, descripcion_usuario:descripcion_usuario};

        let result = await userServices.insertUser(params);

        if (result === null) {
            res.status(httpStatus.CONFLICT).json({ error: 'El usuario o correo electrónico ya existen',code:1 });
          } else {
            res.status(httpStatus.CREATED).json({ message: 'Usuario registrado exitosamente', userId: result });
          }

    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error en el servidor' });
      }
};

let _update = async function (req, res){
    try{
        // const { objUpdate:{nombre_usuario,
        //     apellido_usuario,
        //     descripcion_usuario,
        //     tipoUsuario,
        //     id_tipo_usuario,
        //     email_usuario}} = req.body;

        let result = await userServices.updateUser(req.body);
        
        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.NO_CONTENT);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

let _delete = async function (req, res){
    try{
        const { params:{id} } = req;
        let result = await userServices.deleteUser(id);
        
        if(result === null){
            res.json(httpStatus.NOT_FOUND);
            res.end();
            return;
        }
        res.json(httpStatus.OK);
        res.end();
        
    }catch(err){
        res.send(httpStatus.INTERNAL_SERVER_ERROR, JSON.stringify({Error: httpStatus.INTERNAL_SERVER_ERROR, Message: constants.Error.INTERNALERROR}) );

    }
};

module.exports = {
    get: _get,
    getId: _getId,
    insertUser: _insert,
    updateUser: _update,
    deleteUser: _delete
}