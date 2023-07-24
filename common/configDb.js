'use strict'
//urls for database secrets
const userSecret = process.env.KV_SQL_SERVER_USER;
const passwordSecret = process.env.KV_SQL_SERVER_PASSWORD;
const dbSecret = process.env.KV_SQL_SERVER_BD;
const hostSecret = process.env.KV_SQL_SERVER_HOST;
 
const mysql = require('mysql2/promise');

console.log("userSecret: ",userSecret);
console.log("passwordSecret: ",passwordSecret);
console.log("dbSecret: ",dbSecret);
console.log("hostSecret: ",hostSecret);

 
module.exports = {
    name: 'comun-comercial-ms',
    hostname : 'http://localhost',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3003,
    db: {
			host     : hostSecret,
			user     : userSecret,
			password : passwordSecret,
			database : dbSecret,
    }
}