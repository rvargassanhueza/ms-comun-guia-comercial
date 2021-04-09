CREATE TABLE T_REGION(
	id_region				int  not null,
	nombre_region 			varchar(50) not null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_REGION PRIMARY KEY (id_region)
);

CREATE TABLE T_PROVINCIA(
	id_provincia			int  not null,
	nombre_provincia		varchar(50) null,
	id_region				int not null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_PROVINCIA PRIMARY KEY (id_provincia)
);

CREATE TABLE T_COMUNA(
	id_comuna				int  not null,
	nombre_comuna 			varchar(50) null,
	id_provincia			int not null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_COMUNA PRIMARY KEY (id_comuna)
);

CREATE TABLE T_LOCALIDAD(
	id_localidad			int  not null AUTO_INCREMENT,
	id_comuna 				int not null,
	nombre_localidad		varchar(50) null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_LOCALIDAD PRIMARY KEY (id_localidad)
);

CREATE TABLE T_CATEGORIA(
	id_categoria			int  not null AUTO_INCREMENT,
	nombre_categoria		varchar(50) null,
	descripcion_categoria	varchar(200) null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_CATEGORIA PRIMARY KEY (id_categoria)
);

CREATE TABLE T_SUB_CATEGORIA(
	id_sub_categoria		int  not null AUTO_INCREMENT,
	nombre_sub_categoria 	varchar(50) null,
	descripcion_categoria	varchar(200) null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_SUB_CATEGORIA PRIMARY KEY (id_sub_categoria)
);

CREATE TABLE T_USUARIO(
	id_usuario				int not null AUTO_INCREMENT,
	id_tipo_usuario			int not null,
	nombre_usuario 			varchar(50) null,
	pass_usuario			varchar(200) null,
	descripcion_usuario		varchar(200) null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_USUARIO PRIMARY KEY (id_usuario) 
);

CREATE TABLE T_TIPO_USUARIO(
	id_tipo_usuario				int  not null AUTO_INCREMENT,
	nombre_tipo_usuario 		varchar(50) null,
	descripcion_tipo_usuario	varchar(200) null,
	fecha_creacion 				date null,
  	fecha_modificacion 			date null,
  	usuario_creacion 			int null,
  	usuario_modificacion 		int null,
 	vigente 					bit(0),
 	CONSTRAINT PK_T_TIPO_USUARIO PRIMARY KEY (id_tipo_usuario) 
);

CREATE TABLE T_CLIENTE(
	id_cliente				int not null AUTO_INCREMENT,
	id_tipo_cliente			int not null,
	nombre_cliente 			varchar(50) null,
	descripcion_cliente		varchar(200) null,
	fecha_creacion 			date null,
  	fecha_modificacion 		date null,
  	usuario_creacion 		int null,
  	usuario_modificacion 	int null,
 	vigente 				bit(0),
 	CONSTRAINT PK_T_CLIENTE PRIMARY KEY (id_cliente) 
);

-- CREATE TABLE ASC_DESTACADA_CATEGORIA(
-- 	id_localidad			int not null,
-- 	id_categoria			int not null,
-- 	destacado_cliente 		bit(0),
-- 	fecha_creacion 			date null,
--   	fecha_modificacion 		date null,
--   	usuario_creacion 		int null,
--   	usuario_modificacion 	int null,
--  	vigente 				bit(0)
-- );

CREATE TABLE T_TIPO_CLIENTE(
	id_tipo_cliente				int not null AUTO_INCREMENT,
	nombre_tipo_cliente 		varchar(50) null,
	descripcion_tipo_cliente	varchar(200) null,
	fecha_creacion 				date null,
  	fecha_modificacion 			date null,
  	usuario_creacion 			int null,
  	usuario_modificacion 		int null,
 	vigente 					bit(0),
 	CONSTRAINT PK_T_CLIENTE PRIMARY KEY (id_tipo_cliente) 
);

CREATE TABLE T_PASO_LOCALIDAD_CATEGORIA(
	id_localidad				int not null,
	id_categoria 				int not null
);

CREATE TABLE T_PASO_CATEGORIA_SUB_CATEGORIA(
	id_categoria				int not null,
	id_sub_categoria 			int not null
);


/* === FOREIGN === */

ALTER TABLE T_PROVINCIA   ADD  CONSTRAINT FK_T_PROVINCIA_REGION FOREIGN KEY(id_region)
REFERENCES T_REGION (id_region);

ALTER TABLE T_COMUNA    ADD  CONSTRAINT FK_T_COMUNA_PROVINCIA FOREIGN KEY(id_provincia)
REFERENCES T_PROVINCIA (id_provincia);

ALTER TABLE T_CLIENTE  ADD  CONSTRAINT FK_T_FORMULARIOS_T_CLIENTE FOREIGN KEY(id_tipo_cliente)
REFERENCES T_TIPO_CLIENTE (id_tipo_cliente);

ALTER TABLE T_USUARIO    ADD  CONSTRAINT FK_T_USUARIOS_TIPO_USUARIO FOREIGN KEY(id_tipo_usuario)
REFERENCES T_TIPO_USUARIO (id_tipo_usuario);

ALTER TABLE T_LOCALIDAD    ADD  CONSTRAINT FK_T_LOCALIDAD_COMUNA FOREIGN KEY(id_comuna)
REFERENCES T_COMUNA (id_comuna);


ALTER TABLE T_PASO_CATEGORIA_SUB_CATEGORIA    ADD  CONSTRAINT FK_T_CATEGORIA_SUB_CATEGORIA_id_sub_categoria FOREIGN KEY(id_sub_categoria)
REFERENCES T_SUB_CATEGORIA (id_sub_categoria);

ALTER TABLE T_PASO_CATEGORIA_SUB_CATEGORIA    ADD  CONSTRAINT FK_T_CATEGORIA_SUB_CATEGORIA_id_categoria FOREIGN KEY(id_categoria)
REFERENCES T_CATEGORIA (id_categoria);

ALTER TABLE T_PASO_LOCALIDAD_CATEGORIA    ADD  CONSTRAINT FK_T_REGISTRO_LOCALIDAD_CATEGORIAS_id_categoria FOREIGN KEY(id_categoria)
REFERENCES T_CATEGORIA (id_categoria);

ALTER TABLE T_PASO_LOCALIDAD_CATEGORIA    ADD  CONSTRAINT FK_T_REGISTRO_LOCALIDAD_CATEGORIAS_id_localidad FOREIGN KEY(id_localidad)
REFERENCES T_LOCALIDAD (id_localidad);