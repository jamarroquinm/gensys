SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';


DROP SCHEMA IF EXISTS `gensys` ;
CREATE SCHEMA IF NOT EXISTS `gensys` DEFAULT CHARACTER SET utf8 ;
USE `gensys` ;



-- -----------------------------------------------------
-- Table `admin`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`admin` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(15) NOT NULL, 
  `password` VARCHAR(60) NOT NULL, 
  `firstName` VARCHAR(50), 
  `lastName` VARCHAR(50), 
  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`), 
  UNIQUE INDEX `admins` (`user` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `asession`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `asession` (
  `id` VARCHAR(30) NOT NULL,
  `userId` BIGINT UNSIGNED NOT NULL ,
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  INDEX `asessiones` (`userId`) ,
  CONSTRAINT `admin_msession` FOREIGN KEY (`userId` ) REFERENCES `admin` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `language`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`language` (
  `languageId` CHAR(2) NOT NULL, 
  `language` VARCHAR(60) NOT NULL, 
  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`languageId`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;




-- ////////////////////////////////////////////////////////
--                  SOLUTIONS DESIGN
-- ////////////////////////////////////////////////////////

-- -----------------------------------------------------
-- `solution`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`solution` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(15) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(300),

  `multitenant` TINYINT NOT NULL DEFAULT 1,
  `multilingual` TINYINT NOT NULL DEFAULT 1,

  `solutionNotes` text,
  `modulesNotes` text,

  `operationalDbPrefix` VARCHAR(5), 
  `operationalDbName` VARCHAR(30), 
  `operationalDbNotes` text,

  `centralDbName` VARCHAR(30), 
  `centralDbNotes` text,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `solution` (`key` ASC),
  INDEX `solutions` (`name` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- `module`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`module` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `solutionId` BIGINT UNSIGNED NOT NULL, 
  `languageId` CHAR(2) NOT NULL, 

  `key` VARCHAR(15) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(300),

  `type` CHAR(1) DEFAULT 'd',  -- d Desktop | m Mobile

  `apiFolder` VARCHAR(20), 
  `contentFolder` VARCHAR(20), 

  `loginScript` VARCHAR(60), 
  `unlockScript` VARCHAR(60),
  `changeScript` VARCHAR(60), 
  `notes` text,

  `menusIdx` TINYINT NOT NULL DEFAULT 1,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `module` (`solutionId` ASC, `key` ASC),
  INDEX `modules` (`name` ASC), 
  CONSTRAINT `solution_module` FOREIGN KEY (`solutionId`) REFERENCES `gensys`.`solution` (`id`),
  CONSTRAINT `language_module` FOREIGN KEY (`languageId`) REFERENCES `gensys`.`language` (`languageId`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- `access`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`access` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `moduleId` BIGINT UNSIGNED NOT NULL, 
  `access` CHAR(6) NOT NULL, 

  `key` VARCHAR(15) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(300),

  `contentSubfolder` VARCHAR(60), 
  `background` VARCHAR(60), 
  `loginScript` VARCHAR(60), 

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `access` (`moduleId` ASC, `key` ASC),
  UNIQUE INDEX `key` (`access` ASC),
  INDEX `accesses` (`name` ASC), 
  CONSTRAINT `module_access` FOREIGN KEY (`moduleId`) REFERENCES `gensys`.`module` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;




-- -----------------------------------------------------
-- `menu`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`menu` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `moduleId` BIGINT UNSIGNED NOT NULL, 

  `key` VARCHAR(15) NOT NULL, 
  `name` VARCHAR(60), 
  `description` VARCHAR(300),
  `icon` VARCHAR(30), 
  `tip` VARCHAR(60), 
  `notes` text,

  `order` TINYINT NOT NULL DEFAULT 0,
  `optionsIdx` TINYINT NOT NULL DEFAULT 1,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `menu` (`moduleId` ASC, `key` ASC),
  INDEX `menus` (`name` ASC),
  INDEX `orderedmenus` (`moduleId` ASC, `order` ASC),
  CONSTRAINT `module_menu` FOREIGN KEY (`moduleId`) REFERENCES `gensys`.`module` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- `option`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`option` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `menuId` BIGINT UNSIGNED NOT NULL, 
  `key` VARCHAR(15) NOT NULL, 

  `type` CHAR(1) DEFAULT 's',  -- s Submenu | c Container | x Component
  `name` VARCHAR(30), 
  `tip` VARCHAR(60), 
  `description` VARCHAR(300),
  `icon` VARCHAR(30), 
  `xtype` VARCHAR(60), 
  `notes` text,

  `order` TINYINT NOT NULL DEFAULT 0,
  `suboptionsIdx` TINYINT NOT NULL DEFAULT 1,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `option` (`menuId` ASC, `key` ASC),
  INDEX `options` (`name` ASC),
  INDEX `orderedoptions` (`menuId` ASC, `order` ASC),
  CONSTRAINT `menu_option` FOREIGN KEY (`menuId`) REFERENCES `gensys`.`menu` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- `suboption`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`suboption` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `optionId` BIGINT UNSIGNED NOT NULL, 
  `tableId` BIGINT UNSIGNED, 

  `key` VARCHAR(15) NOT NULL, 
  `type` CHAR(1) DEFAULT 'x',  -- x Component | d Dictionary crud | c Cat dictionary crud | p Parameters
  `name` VARCHAR(60), 
  `tip` VARCHAR(60), 
  `description` VARCHAR(300),
  `icon` VARCHAR(30), 
  `notes` text,

  `xtype` VARCHAR(60), 

  `titleform` VARCHAR(50), 
  `dataform` VARCHAR(30), 
  `store` VARCHAR(30), 

  `order` TINYINT NOT NULL DEFAULT 0,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `suboption` (`optionId`, `key` ASC),
  INDEX `suboptions` (`name` ASC),
  INDEX `orderedsuboptions` (`optionId` ASC, `order` ASC),
  CONSTRAINT `option_suboption` FOREIGN KEY (`optionId`) REFERENCES `gensys`.`option` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;





-- ////////////////////////////////////////////////////////
--                  SOLUTIONS DATABASE
-- ////////////////////////////////////////////////////////

-- -----------------------------------------------------
-- `database`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`database` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `solutionId` BIGINT UNSIGNED NOT NULL, 
  `key` VARCHAR(15) NOT NULL, 

  `name` VARCHAR(60), 
  `description` VARCHAR(300),
  `notes` text,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `database` (`key` ASC),
  INDEX `databases` (`name` ASC),
  CONSTRAINT `solution_database` FOREIGN KEY (`solutionId`) REFERENCES `gensys`.`solution` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- `section`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`section` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `databaseId` BIGINT UNSIGNED NOT NULL, 
  `key` VARCHAR(15) NOT NULL, 

  `name` VARCHAR(60), 
  `description` VARCHAR(300),
  `notes` text,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `section` (`key` ASC),
  INDEX `sections` (`name` ASC),
  CONSTRAINT `database_section` FOREIGN KEY (`databaseId`) REFERENCES `gensys`.`database` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- `table`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `gensys`.`table` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sectionId` BIGINT UNSIGNED NOT NULL, 
  `key` VARCHAR(15) NOT NULL, 

  `name` VARCHAR(60), 
  `description` VARCHAR(300),
  `type` CHAR(1) DEFAULT 'y',  -- y Dictionary | z Categorized dictionary | c Catalog | m Master | d Detail | o Other
  `notes` text,

  `active` TINYINT NOT NULL DEFAULT 1,
  `deleted` TINYINT NOT NULL DEFAULT 0, 
  `_creation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `_modification` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (`id`),
  UNIQUE INDEX `table` (`sectionId` ASC, `key` ASC),
  INDEX `tables` (`name` ASC),
  CONSTRAINT `section_table` FOREIGN KEY (`sectionId`) REFERENCES `gensys`.`section` (`id`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

SET GLOBAL event_scheduler = ON;


-- //////////////////////  Store Procedures
-- -----------------------------------------------------
-- Before insert menu
-- -----------------------------------------------------
DELIMITER //
CREATE TRIGGER before_menu_insert 
  BEFORE INSERT ON menu
  FOR EACH ROW 
 
  BEGIN
  
    Select menusIdx into @idx from module where id = new.moduleId;
    Set new.order = @idx;
    Update module set menusIdx = @idx + 1 where id = new.moduleId;
  
 END//
DELIMITER ;

-- -----------------------------------------------------
-- Before insert option
-- -----------------------------------------------------
DELIMITER //
CREATE TRIGGER before_option_insert 
  BEFORE INSERT ON `option`
  FOR EACH ROW 
 
  BEGIN
  
    Select optionsIdx into @idx from menu where id = new.menuId;
    Set new.order = @idx;
    Update menu set optionsIdx = @idx + 1 where id = new.menuId;
  
 END//
DELIMITER ;


-- -----------------------------------------------------
-- Before insert suboption
-- -----------------------------------------------------
DELIMITER //
CREATE TRIGGER before_suboption_insert 
  BEFORE INSERT ON `suboption`
  FOR EACH ROW 
 
  BEGIN
  
    Select suboptionsIdx into @idx from `option` where id = new.optionId;
    Set new.order = @idx;
    Update `option` set suboptionsIdx = @idx + 1 where id = new.optionId;
  
 END//
DELIMITER ;











-- Base inicial
Insert into `gensys`.`admin`
    (`user`, `password`, `firstName`, `lastName`)
  values
    ('admin', sha2('admin', 224), 'Alejandro', 'Marroquin');

Insert into `gensys`.`language`
    (`languageId`, `language`)
  values
    ('es', 'Español'),
    ('en', 'English');

Insert into `solution` (`key`, `name`, `description`, `multitenant` ) values 
    ('gensys', 'Gensys Fast Development', 'Soluciones inteligentes', 0),
    ('ctlap', 'Activos Productivos', 'Control de Activos Productivos', 1),
    ('fsm', 'Field Service Management', 'Field Service Management', 1);

Insert into `module` (`solutionId`, `languageId`, `key`, `name`, `description`, `apiFolder`, `contentFolder`, `loginScript`, `unlockScript`, `changeScript` ) values 
	  (1, 'es', 'designer', 'Designer', 'Solutions Designer', 'designer', '../content/', 'login', 'unlock', 'changepwd'),
    (2, 'es', 'op5s', 'Operacion 5s', 'Operación basada en 5s', 'opcs', '../content/', 'login', 'unlock', 'changepwd'),
    (2, 'es', 'mttoap', 'Mantenimiento AP', 'Mantenimiento a Activos Productivos', 'mtto', '../content/', 'login', 'unlock', 'changepwd'),
    (3, 'es', 'meta', 'Meta Admin', 'FSM - Meta Admin', 'meta', '../content/', 'login', 'unlock', 'changepwd'),
    (3, 'es', 'admin', 'User Admin', 'FSM - User Admin', 'admin', '../content/', 'login', 'unlock', 'changepwd'),
    (3, 'es', 'oper', 'Operation', 'FSM - Operation', 'operation', '../content/', 'login', 'unlock', 'changepwd');

Insert into `access` (moduleId, `key`, name, access, contentSubfolder, background) values 
    (1, 'gensys', 'gensys', 'a', 'gensys', 'bg.jpg'),
    (2, 'demo', 'Empresa Demo', 'b', 'demo', null),
    (3, 'demo', 'Empresa Demo', 'c', 'demo', null);



-- Creación del designer
Insert into `menu` (`moduleId`, `key`, `name`, `description`, `icon`, `tip` ) values 
	  (1, 'inicio', 'Inicio', 'Tablero de indicadores', 'home', 'Tablero de indicadores' ),
	  (1, 'accesos', 'Accesos', 'Control de Accesos', 'user-shield', 'Control de Accesos' ),
    (1, 'operacion', 'Operación', 'Operación de diseño', 'paper-plane', 'Operación de diseño' ),
    (1, 'config', 'Configuración', 'Configuración de la operación', 'cogs', 'Configuración de la operación');

Insert into `option` (menuId, `key`, name, tip, icon, type, xtype, description ) values 
    (1, 'indicadores', 'Indicadores', 'Tablero de indicadores', 'chart-line', 'x', null, 'Tablero de indicadores'),
    (2, 'accesos', 'Accesos', 'Control de acesos', 'user-lock', 't', null, 'Control de acesos'),
    (3, 'soluciones', 'Soluciones', 'Soluciones', 'drafting-compass', 't', null, 'Soluciones'),
    (3, 'generacion', 'Generación', 'Generación de código', 'rocket', 't', null, 'Generación de código'),
    (3, 'traduccion', 'Traducción', 'Traducción', 'language', 't', null, 'Traducción'),
    (4, 'config', 'Configuración', 'Configuración', 'cog', 'x', null, 'Configuración');

Insert into `suboption` (optionId, `key`, name, tip, icon, type, xtype, description, titleform, store, tableId ) values 
    (2, 'accesos', 'Accesos', 'Control de acesos', 'user-lock', 'x', null, 'Control de acesos', 'Control de acesos', null, 6),
    (3, 'solucion', 'Soluciones', 'Soluciones', 'drafting-compass', 'x', 'operation-solutions-solutions', 'Soluciones', 'Soluciones', null, 1),
    (4, 'centralbase', 'Base Central', 'Base de Datos Central', 'database', 'x', null, 'Base de Datos Central', 'Base de Datos Central', null, 2),
    (4, 'database', 'Base de Datos', 'Base de Datos Operativa', 'database', 'x', null, 'Base de Datos Operativa', 'Base de Datos Operativa', null, 3),
    (4, 'middleware', 'Middleware', 'Servicios de middleware', 'server', 'x', null, 'Servicios de middleware', 'Servicios de middleware', null, 4),
    (4, 'webfend', 'Front End', 'Front End Web', 'desktop', 'x', null, 'Front End Web', 'Front End Web', null, 4),
    (4, 'movilefend', 'Front End', 'Front End Mobile', 'mobile-alt', 'x', null, 'Front End Mobile', 'Front End Mobile', null, 4),
    (5, 'traduccion', 'Traducción', 'Traducción', 'language', 'x', null, 'Traducción', 'Traducción', null, 6);




    
-- Creacion del AP
Insert into `menu` (`moduleId`, `key`, `name`, `description`, `icon`, `tip` ) values 
	  (2, 'inicio', 'Inicio', 'Tablero de indicadores', 'home', 'Tablero de indicadores' ),
    (2, 'operacion', 'Operación', 'Operación', 'paper-plane', 'Operación' ),
    (2, 'config', 'Configuración', 'Configuración de datos', 'cogs', 'Configuración de datos');

Insert into `option` (menuId, `key`, name, tip, icon, type, xtype, description ) values 
    (4, 'operacion', 'Operación', 'Tiempo de uptime', 'industry', 'x', null, 'Tiempo de uptime'),
    (4, 'fallas', 'Fallas', 'Reportes de fallos', 'tools', 'x', null, 'Reportes de fallos'),
    (4, 'servicios', 'Servicios', 'Solicitudes de servicio', 'paint-roller', 'x', null, 'Solicitudes de servicio'),
    (4, 'calificaciones', 'Calificaciones', 'Calificaciones de las auditorias', 'chart-line', 'x', null, 'Calificaciones de las auditorias'),

    (5, 'fallas', 'Fallas', 'Reportes de fallas', 'tools', 't', null, 'Reportes de fallas'),
    (5, 'servicios', 'Servicios', 'Reportes de servicio', 'paint-roller', 't', null, 'Reportes de servicio'),

    (6, 'fallas', 'Fallas', 'Reportes de fallas', 'tools', 't', null, 'Reportes de fallas');


Insert into `suboption` (optionId, `key`, name, tip, icon, type, xtype, description ) values 
    (10, 'nuevos', 'Nuevos', 'Reportes nuevos', 'chart-line', 'x', null, 'Reportes nuevos'),
    (10, 'seguimiento', 'Seguimiento', 'Reportes en seguimiento', 'file-alt', 'x', null, 'Reportes en seguimiento'),
    (10, 'concluido', 'Concluídos', 'Reportes concluídos', 'folder-open', 'x', null, 'Reportes concluídos'),
    (10, 'cerrado', 'Cerrados', 'Reportes cerrados', 'folder', 'x', null, 'Reportes cerrados'),

    (11, 'nuevas', 'Nuevas', 'Solicitudes nuevas', 'chart-line', 'x', null, 'Solicitudes nuevas'),
    (11, 'seguimiento', 'Seguimiento', 'Solicitudes en seguimiento', 'file-alt', 'x', null, 'Solicitudes en seguimiento'),
    (11, 'concluido', 'Concluídos', 'Solicitudes concluídas', 'folder-open', 'x', null, 'Solicitudes concluídas'),
    (11, 'cerrado', 'Cerrados', 'Solicitudes cerradas', 'folder', 'x', null, 'Solicitudes cerradas');

Insert into `suboption` (optionId, `key`, name, tip, icon, type, xtype, description, titleform, store, tableId ) values 
    (12, 'reportes', 'Tipos', 'Tipos de reportes de fallas', 'file', 'x', null, 'Tipos de reportes de fallas', null, null, null),
    (12, 'categorias', 'Categorías', 'Categorías de reportes de fallas', 'file-alt', 'c', null, 'Categorías de reportes de fallas', 'Categoría de reporte de fallas', 'categorias-reportes', 1);



-- Creacion del FSM - Operation
Insert into `menu` (`moduleId`, `key`, `name`, `description`, `icon`, `tip` ) values 
	  (6, 'home', 'Home', 'Dashboard', 'Home', 'Dashboard' ),
    (6, 'sandd', 'Schedule', 'Schedule & Dispatch', 'calendar', 'Schedule & Dispatch' ),
    (6, 'service', 'Servce Manager', 'Service Manager', 'briefcase', 'Service Manager' ),
    (6, 'customers', 'Customers', 'Customers', 'users', 'Customers' ),
    (6, 'kwnoladge', 'Knowladge Base', 'Knowladge Base', 'book', 'Knowladge Base' ),
    (6, 'access', 'Access Control', 'Access Control', 'shield', 'Access Control' ),
    (6, 'config', 'Configuración', 'Configuración de datos', 'cogs', 'Configuración de datos');

Insert into `option` (menuId, `key`, name, tip, icon, type, xtype, description ) values 
    (8, 'load', 'Work Load', 'Work Load', 'sliders', 'x', null, 'Current Work Load'),

    (9, 'request', 'Requests', 'Requests Taker', 'phone', 's', null, 'Request Taker'),
    (9, 'contract', 'Contracts', 'Contract Services', 'file-text-o', 's', null, 'Contract Services'),
    (9, 'schdisp', 'Schedule & Dispatch', 'Schedule & Dispatch', 'truck', 's', null, 'Schedule & Dispatch'),

    (10, 'quotation', 'Quotations', 'Quotations', 'file-text-o', 's', null, 'Quotations'),
    (10, 'workorder', 'Work Orders', 'Work Orders', 'file-text', 's', null, 'Work Orders'),
    (10, 'servteam', 'Service Team', 'Service Team', 'user-md', 's', null, 'Service Team'),
    (10, 'qualteam', 'Quality Team', 'Quality Team', 'user-plus', 's', null, 'Quality Team'),

    (11, 'customers', 'Customers', 'Customers', 'users', 's', null, 'Customers'),
    (11, 'contracts', 'Contracts', 'Contracts', 'file', 's', null, 'Contracts'),

    (12, 'equipment', 'Equipment', 'Equipment', 'th-large', 's', null, 'Equipment'),
    (12, 'procedure', 'Procedures', 'Procedures', 'list-ol', 's', null, 'Procedures'),

    (13, 'users', 'Users', 'Users', 'users', 'c', null, 'Users'),
    (13, 'log', 'Log', 'Log', 'list-alt', 'c', null, 'Log'),

    (14, 'area', 'Areas', 'Service Areas', 'map-marker', 's', null, 'Service Areas'),
    (14, 'services', 'Services', 'Services', 'medkit', 's', null, 'Services'),
    (14, 'contractsdef', 'Contracts', 'Contracts', 'file', 's', null, 'Contracts'),
    (14, 'quotationdef', 'Quotations', 'Quotations', 'file-text-o', 's', null, 'Quotations'),
    (14, 'notification', 'Notification', 'Notification', 'mobile', 's', null, 'Notification');


Insert into `suboption` (optionId, `key`, name, tip, icon, type, xtype, description ) values 
    (15, 'quotreq', 'Quotations', 'Quotations', 'file-text-o', 'x', null, 'Quotations'),
    (15, 'woreq', 'Work Orders', 'Work Orders', 'file-text', 'x', null, 'Work Orders'),

    (16, 'contrservs', 'Services', 'Programmed services', 'file-text-o', 'x', null, 'Programmed services'),
    (16, 'contropen', 'Contracts', 'Contracts', 'file', 'x', null, 'Contracts'),

    (17, 'schedule', 'Schedule', 'Schedule & Dispatch', 'calendar', 'x', null, 'Schedule & Dispatch'),

    (18, 'tmp18', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (19, 'tmp19', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (20, 'tmp20', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (21, 'tmp21', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (22, 'tmp22', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (23, 'tmp23', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (24, 'tmp24', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (25, 'tmp25', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (26, 'tmp26', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (27, 'tmp27', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (28, 'tmp28', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (29, 'tmp29', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (30, 'tmp30', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (31, 'tmp31', 'tmp', 'tmp', 'circle', 'x', null, 'tmp'),
    (32, 'tmp32', 'tmp', 'tmp', 'circle', 'x', null, 'tmp');
