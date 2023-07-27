// // Versión 1.0.0
require('dotenv').config({ path: 'env.env' });

const express = require('express');
const cors = require('cors');
const moment = require('moment');
// const joi = require('joi');
const multer = require('multer');

// const validator = require('./common/validator');
const handler = require('./common/errorHandler');

const API_MIN_VERSION = '1.0.0';
const API_CURRENT_VERSION = process.env.APPLICATION_ENV;

const app = express();

const upload = multer();
app.use(upload.none()); // Usar este middleware para procesar datos de FormData sin archivos adjuntos

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:8080',
//   methods: 'GET, POST, PUT, DELETE', // Especifica los métodos HTTP que deseas permitir
//   allowedHeaders: 'Content-Type, Authorization', // Especifica los encabezados que deseas permitir
//   credentials: true, // Permite el envío de cookies desde el cliente (si las usas para autenticación)
// }));

app.use(cors());
// app.use(upload.none()); // Usar este middleware para procesar datos de FormData sin archivos adjuntos
// Setup validators
// app.use(validator.paramValidation(joi));
handler.register(app);
// app.options('*', cors());

// Setup route handling
const routers = [
  require('./routers/v1/tipo-cliente-routers'),
  require('./routers/v1/cliente-routers'),
  require('./routers/v1/tipo-usuario-routers'),
  require('./routers/v1/usuario-routers'),
  require('./routers/v1/categoria-routers'),
  require('./routers/v1/asc-categoria-sub_categoria-routers'),
  require('./routers/v1/asc-localidad-categoria-routers'),
  require('./routers/v1/localidad-routers'),
  require('./routers/v1/sub_categoria-routers'),
  require('./routers/v1/login-routers')
];

routers.forEach(router => {
  router.register(app);
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
