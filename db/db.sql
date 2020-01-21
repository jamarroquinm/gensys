SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';


DROP SCHEMA IF EXISTS `control` ;
CREATE SCHEMA IF NOT EXISTS `control` DEFAULT CHARACTER SET utf8 ;
USE `control` ;


-- ////////////////////////////////////////////////////////
--                 BASE DATOS DE CONTROL
-- ////////////////////////////////////////////////////////

-- -----------------------------------------------------
-- `dbserver`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`dbserver` ;

CREATE  TABLE IF NOT EXISTS `control`.`dbserver` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(20) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(150),   

  `dbserver` VARCHAR(200) NOT NULL, 
  `dbport` VARCHAR(100) NOT NULL , 
  `dbuser` VARCHAR(100) NOT NULL , 
  `dbpassword` VARCHAR(100) NOT NULL , 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `dbserver` (`code` ASC),
  INDEX `dbservers` (`name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- `emserver`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`emserver` ;

CREATE  TABLE IF NOT EXISTS `control`.`emserver` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(20) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(150),   

  `emserver` VARCHAR(100) NOT NULL , 
  `emport` VARCHAR(100) NOT NULL , 
  `emuser` VARCHAR(100) NOT NULL , 
  `empassword` VARCHAR(100) NOT NULL , 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `emserver` (`code` ASC),
  INDEX `emservers` (`name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`group` ;

CREATE  TABLE IF NOT EXISTS `control`.`group` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dbserverId` BIGINT(20) UNSIGNED NOT NULL, 
  `emserverId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL,    -- se usa como postfijo para la base de datos companyrial
  `name` VARCHAR(100) NOT NULL, 

-- Base de datos y alieas de correo
  `dbschema` VARCHAR(100) NOT NULL, 

-- Base de datos y Folder de contenido
  `hardpath` VARCHAR(100) NOT NULL, 
  `relativepath` VARCHAR(100) NOT NULL , 
  `groupfolder` VARCHAR(20) NOT NULL, 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `groupo` (`code`),
  CONSTRAINT `dbserver_group` FOREIGN KEY (`dbserverId`)  REFERENCES `dbserver` (`id`), 
  CONSTRAINT `emserver_group` FOREIGN KEY (`emserverId`)  REFERENCES `emserver` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


- -----------------------------------------------------
-- Table `company`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`company` ;

CREATE  TABLE IF NOT EXISTS `control`.`company` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `groupId` BIGINT(20) UNSIGNED NOT NULL,
  `code` VARCHAR(20) NOT NULL,   
  `name` VARCHAR(100) NOT NULL, 
  `companyfolder` VARCHAR(20), 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `companys` (`code` ASC),
  CONSTRAINT `group_company` FOREIGN KEY (`groupId`)  REFERENCES `group` (`id`) )  
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `meta` Metaadmins
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`meta` ;

CREATE  TABLE IF NOT EXISTS `control`.`meta` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(15) NOT NULL, 
  `password` VARCHAR(60) NOT NULL, 
  `name` VARCHAR(50), 
  `lastname` VARCHAR(50), 
  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `metaadminis` (`user` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `msession`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`msession` ;

CREATE  TABLE IF NOT EXISTS `control`.`msession` (
  `id` VARCHAR(30) NOT NULL,
  `userId` BIGINT(20) UNSIGNED NOT NULL, 
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `msessiones` (`userId`), 
  CONSTRAINT `metasession` FOREIGN KEY (`userId`) REFERENCES `meta` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `asession` sessiones de administradires
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`asession` ;

CREATE  TABLE IF NOT EXISTS `control`.`asession` (
  `id` VARCHAR(30) NOT NULL,
  `groupId` BIGINT(20) UNSIGNED NOT NULL, 
  `companyId` BIGINT(20) UNSIGNED, 
  `adminId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL,   
  `super` TINYINT NOT NULL DEFAULT 0, 
  `hardpath` VARCHAR(100) NOT NULL, 
  `relativepath` VARCHAR(100) NOT NULL , 
  `groupfolder` VARCHAR(20) NOT NULL, 
  `companyfolder` VARCHAR(20), 
  `language` VARCHAR(2), 
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `asessiones` (`groupId`, `companyId`, `adminId`), 
  CONSTRAINT `company_asession` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `usession`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`usession` ;

CREATE  TABLE IF NOT EXISTS `control`.`usession` (
  `id` VARCHAR(30) NOT NULL,
  `groupId` BIGINT(20) UNSIGNED NOT NULL, 
  `companyId` BIGINT(20) UNSIGNED NOT NULL, 
  `userId` BIGINT(20) UNSIGNED NOT NULL, 
  `hardpath` VARCHAR(100) NOT NULL, 
  `relativepath` VARCHAR(100) NOT NULL , 
  `groupfolder` VARCHAR(20) NOT NULL, 
  `companyfolder` VARCHAR(20), 
  `language` VARCHAR(2), 
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usessiones` (`groupId`, `companyId`, `userId`), 
  CONSTRAINT `company_usession` FOREIGN KEY (`companyId`) REFERENCES `control`.`company` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



-- ////////////////////////////////////////////////////////
--                  SEGURIDAD
-- ////////////////////////////////////////////////////////

-- -----------------------------------------------------
-- `solution`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`solution` ;

CREATE  TABLE IF NOT EXISTS `control`.`solution` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(20) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(300),   

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `solution` (`code` ASC),
  INDEX `solutions` (`name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- `module`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`module` ;

CREATE  TABLE IF NOT EXISTS `control`.`module` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `solutionId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(300),

  `type` CHAR(1) DEFAULT 'd',  -- d Desktop | m Movile
  `apifolder` VARCHAR(20), 

  `multitenant` TINYINT NOT NULL DEFAULT 1,
  `multilanguege` TINYINT NOT NULL DEFAULT 1,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `module` (`solutionId` ASC, `code` ASC),
  INDEX `modules` (`name` ASC), 
  CONSTRAINT `solution_module` FOREIGN KEY (`solutionId`) REFERENCES `control`.`solution` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- `access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`access` ;

CREATE  TABLE IF NOT EXISTS `control`.`access` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `moduleId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(300),

  `login` TINYINT NOT NULL DEFAULT 1,
  `loginUrl` VARCHAR(60), 
  `loginImage` VARCHAR(60), 

  `block` TINYINT NOT NULL DEFAULT 1,
  `unblockUrl` VARCHAR(60),
  `blockImage` VARCHAR(60),

  `changePassword` TINYINT NOT NULL DEFAULT 1,
  `changePasswordUrl` VARCHAR(60), 
  `changePasswordImage` VARCHAR(60), 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `access` (`solutionId` ASC, `code` ASC),
  INDEX `accesses` (`name` ASC), 
  CONSTRAINT `module_access` FOREIGN KEY (`solutionId`) REFERENCES `control`.`solution` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;




-- -----------------------------------------------------
-- `menu`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`menu` ;

CREATE  TABLE IF NOT EXISTS `control`.`menu` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `moduleId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL, 

  `name` VARCHAR(60), 
  `description` VARCHAR(300),
  `icon` VARCHAR(20), 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `menu` (`moduleId` ASC, `code` ASC),
  INDEX `menus` (`name` ASC),
  CONSTRAINT `module_menu` FOREIGN KEY (`moduleId`) REFERENCES `control`.`module` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- `option`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`option` ;

CREATE  TABLE IF NOT EXISTS `control`.`option` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `menuId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL, 

  `type` CHAR(1) DEFAULT 's',  -- s Submenu | c Container | x Component
  `name` VARCHAR(60), 
  `description` VARCHAR(300),
  `icon` VARCHAR(20), 
  `xtype` VARCHAR(20), 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `option` (`menuId` ASC, `code` ASC),
  INDEX `options` (`name` ASC),
  CONSTRAINT `menu_option` FOREIGN KEY (`menuId`) REFERENCES `control`.`menu` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- `suboption`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`suboption` ;

CREATE  TABLE IF NOT EXISTS `control`.`suboption` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `optionId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL, 

  `type` CHAR(1) DEFAULT 'c',  -- c Container | x Component | r Crud | p Parameters
  `name` VARCHAR(60), 
  `description` VARCHAR(300),
  `icon` VARCHAR(20), 
  `xtype` VARCHAR(20), 

  `dataform` VARCHAR(20), 
  `filterform` VARCHAR(20), 
  `create` TINYINT NOT NULL DEFAULT 1,
  `read` TINYINT NOT NULL DEFAULT 1,
  `update` TINYINT NOT NULL DEFAULT 1,
  `delete` TINYINT NOT NULL DEFAULT 1,
  `find` TINYINT NOT NULL DEFAULT 1,
  `search` TINYINT NOT NULL DEFAULT 1,
  `pagination` TINYINT NOT NULL DEFAULT 1,
  `datafilter` TINYINT NOT NULL DEFAULT 1,
  `datefilter` TINYINT NOT NULL DEFAULT 1,
  `datefield` VARCHAR(20), 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `suboption` (`optionId`, `code` ASC),
  INDEX `suboptions` (`name` ASC),
  CONSTRAINT `option_suboption` FOREIGN KEY (`optionId`) REFERENCES `control`.`option` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- `crudgrid`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`crudgrid` ;

CREATE  TABLE IF NOT EXISTS `control`.`crudgrid` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `suboptionId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL, 

  `name` VARCHAR(60), 
  `description` VARCHAR(300),

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `crudgrid` (`suboptionId` ASC, `code` ASC),
  INDEX `crudsgrid` (`name` ASC),
  CONSTRAINT `suboption_crudgrid` FOREIGN KEY (`suboptionId`) REFERENCES `control`.`suboption` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- `crudgridcolumn`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `control`.`crudgridcolumn` ;

CREATE  TABLE IF NOT EXISTS `control`.`crudgridcolumn` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `crudgridId` BIGINT(20) UNSIGNED NOT NULL, 
  `code` VARCHAR(20) NOT NULL, 

  `name` VARCHAR(60), 
  `description` VARCHAR(300),

  `type` CHAR(1) DEFAULT 'c',  -- c Gridcolumn | n Numeric | d Date | t Tpl |
  `field` VARCHAR(20), 
  `tpl` TEXT, 
  `hidden` TINYINT NOT NULL DEFAULT 0,
  `filter` TINYINT NOT NULL DEFAULT 0,
  `order` TINYINT NOT NULL DEFAULT 0,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `crudgridcolumn` (`crudgridId` ASC, `code` ASC),
  INDEX `crudsgridcolumn` (`name` ASC),
  CONSTRAINT `crudgrid_column` FOREIGN KEY (`crudgridId`) REFERENCES `control`.`crudgrid` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SET GLOBAL event_scheduler = ON;


Insert into `control`.`meta`
    (`user`, `password`, `name`, lastname)
  values
    ('jamm', sha2('jamm', 224), 'Alejandro', 'Marroquin');


INSERT INTO `control`.`dbserver`
    (`code`, `name`, `description`, `dbserver`, `dbport`, `dbuser`, `dbpassword`) 
  VALUES
    ('Dev', 'Desarrollo', 'Desarrollo', 'ZGhHNzZ6VUpvRm45eUFnU0I2dEdyUT09', 'RzVnSjFoemZxa3QrOVg0TFdkODlsZz09', 'S3BCR2R5L1hwRXZ5NTFuemNJZFV0UT09', 'T2VmZXBaS3FrMGMvUzdhdFViQ1gzdz09');


INSERT INTO `control`.`emserver`
    ( `code`, `name`, `description`, `emserver`, `emport`, `emuser`, `empassword`)
  VALUES
    ( 'Test', 'Test', 'Test', 'd3Q3VEZuaDVPUWtZTUsvSWRTMDdYS2UvSnA4d2xCeDVZRHZLSG9VM1kybz0', 'THpwd1RMaHMwL0tKcjkvdG9tZWVXdz09', 'L0tCSFA3N1FHcUZIZFdKc3BVaFpiVS9UUTdoOTNhdS9nZDBWNUNMMHBWST0', 'TGhXaWpwWjBvSUJRajlReG9qT0VWQT09' );



Insert into `solution` (code, name, description ) values ('erp', 'microerp', 'Solución de ERP');

Insert into `module` (solutionId, code, name, description, apifolder ) values 
	(1, 'ventas', 'Ventas', 'Control de Ventas', 'mws/ventas'),
    (1, 'compras', 'Compras', 'Control de Compras', 'mws/compras');

Insert into `menu` (moduleId, code, name, description, icon ) values 
	(1, 'inicio', 'Inicio', 'Tablero Comercial', 'home' ),
    (1, 'comercial', 'Comercial', 'Operaciones Comerciales', 'sales' ),
    (1, 'clientes', 'Clientes', 'Operaciones con Clientes', 'users'),
    (2, 'inicio', 'Inicio', 'Tablero de Abastos', 'home' ),
    (2, 'ventas', 'Ventas', 'Operaciones de Compras', 'buy' ),
    (2, 'proveedores', 'Proveedores', 'Operaciones con Proveedores', 'users');

Insert into `option` (menuId, code, type, name, description, icon, xtype ) values 
    (1, 'tableroVts', 'x', 'Tablero', 'Tablero de Ventas', null, 'ventas-tablero'),
    (2, 'cotiza', 's', 'Cotizaciones', 'Preparación de Cotizaciones', 'doc', null),
    (2, 'pedido', 's', 'Pedidos', 'Preparación de Pedidos', 'doc', null),
    (2, 'factura', 's', 'Facturas', 'Preparación de Facturas', 'doc', null),
    (3, 'clientes', 's', 'Clientes', 'Datos de Clientes', 'doc', null),
    (3, 'familiasCts', 's', 'Familias', 'Familias de Clientes', 'doc', null),
    (4, 'tableroAbs', 'x', 'Tablero', 'Tablero de Ventas', null, 'abastos-tablero'),
    (5, 'cotiza', 's', 'Cotizaciones', 'Recepción de Cotizaciones', 'doc', null),
    (5, 'pedido', 's', 'Pedidos', 'Recepción de Pedidos', 'doc', null),
    (5, 'factura', 's', 'Facturas', 'Recepción de Facturas', 'doc', null),
    (6, 'proveedor', 's', 'Proveedores', 'Datos de Proveedores', 'doc', null),
    (6, 'familiasPro', 's', 'Familias', 'Familias de Proveedores', 'doc', null);