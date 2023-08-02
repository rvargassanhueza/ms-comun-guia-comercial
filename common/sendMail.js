const nodemailer = require('nodemailer');
const fs = require('fs'); // Módulo para trabajar con archivos en Node.js
const path = require('path');

const passSecretGuia = process.env.PASS_MAIL_GUIA;

const rutaArchivo = path.join('C:', 'codes', 'guia-comercial', 'ms-comun-guia-comercial', 'common', 'htmlMailSend','bienvenida.html');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type:'login',
        user: 'tu.guiacomercial.dev@gmail.com',
        pass: passSecretGuia,
    },
  });

function enviarCorreoBienvenida(email) {
    const mailOptions = {
      from: 'tu.guiacomercial.dev@gmail.com',
      to: email,
      subject: 'Bienvenido a nuestra aplicación',
        html:''
    };
      // Leer el contenido del archivo "bienvenida.html"
  fs.readFile(rutaArchivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo bienvenida.html:', err);
    } else {
      // Asignar el contenido del archivo HTML al campo "html" de las opciones del correo
      mailOptions.html = data;

      // Enviar el correo electrónico con Nodemailer
      // Código para enviar el correo aquí...
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Error al enviar el correo:', error);
        } else {
          console.log('Correo enviado:', info.response);
        }
      });
    }
  });
}
  module.exports = { enviarCorreoBienvenida };
  