// Versión 1.0.0
require('dotenv').config({ path: 'env.env' });

const corsMiddleware = require('restify-cors-middleware')

const moment = require('moment');

const joi = require('joi');

const validator = require('./common/validator');
const handler = require('./common/errorHandler');

const API_MIN_VERSION = '1.0.0';
const API_CURRENT_VERSION = process.env.APPLICATION_ENV;

const restify = require('restify');
const versioning = require('restify-url-semver');

const server = restify.createServer({
  name : `Comun Api v:${API_CURRENT_VERSION}`,
  acceptable: 'application/json',
  versions: [API_MIN_VERSION, API_CURRENT_VERSION],
  version: API_CURRENT_VERSION,
  rejectUnauthorized: true,
  ignoreTrailingSlash: true,
  handleUncaughtExceptions: true,
  formatters: { 'application/json': require('./common/jsend') }
});

server.pre(restify.pre.sanitizePath());
server.pre(versioning({ prefix: '/' }));

server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.use(restify.plugins.throttle({
  burst: 100,
  rate: 50,
  ip: true
}));


// Setup validators
server.use(validator.paramValidation(joi));
handler.register(server);

// Setup route Handling

const tipo_clienteRouters = require('./routers/v1/tipo-cliente-routers');
const clienteRouters = require('./routers/v1/cliente-routers');
const tipoUsuarioRouters = require('./routers/v1/tipo-usuario-routers');
const uruarioRouters = require('./routers/v1/usuario-routers');
const categoriaRouters = require('./routers/v1/categoria-routers');
const asocCatSubCatRouters = require('./routers/v1/asc-categoria-sub_categoria-routers');
const asocLocalidadCategoriaRouters = require('./routers/v1/asc-localidad-categoria-routers');
const localidadRouters = require('./routers/v1/localidad-routers');
const subCategoriaRouters = require('./routers/v1/sub_categoria-routers');


tipo_clienteRouters.register(server);
clienteRouters.register(server);
tipoUsuarioRouters.register(server);
uruarioRouters.register(server);
categoriaRouters.register(server);
asocCatSubCatRouters.register(server);
asocLocalidadCategoriaRouters.register(server);
localidadRouters.register(server);
subCategoriaRouters.register(server);


const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['http://localhost:3000'],
  allowHeaders: ['Authorization'],
  allowMethods: ['*'],
  exposeHeaders: ['API-Token-Expiry']
});

server.pre(cors.preflight);
server.use(cors.actual);

const ipaddress = process.env.IP;

server.listen(process.env.PORT || 3002, ipaddress, function () {
  console.log('Server %s listening at %s', server.name, server.url)

})