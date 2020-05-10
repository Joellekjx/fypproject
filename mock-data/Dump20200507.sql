-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: fypdb
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailaddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_auth_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add auth group',7,'add_authgroup'),(26,'Can change auth group',7,'change_authgroup'),(27,'Can delete auth group',7,'delete_authgroup'),(28,'Can view auth group',7,'view_authgroup'),(29,'Can add auth group permissions',8,'add_authgrouppermissions'),(30,'Can change auth group permissions',8,'change_authgrouppermissions'),(31,'Can delete auth group permissions',8,'delete_authgrouppermissions'),(32,'Can view auth group permissions',8,'view_authgrouppermissions'),(33,'Can add auth permission',9,'add_authpermission'),(34,'Can change auth permission',9,'change_authpermission'),(35,'Can delete auth permission',9,'delete_authpermission'),(36,'Can view auth permission',9,'view_authpermission'),(37,'Can add auth user',10,'add_authuser'),(38,'Can change auth user',10,'change_authuser'),(39,'Can delete auth user',10,'delete_authuser'),(40,'Can view auth user',10,'view_authuser'),(41,'Can add auth user groups',11,'add_authusergroups'),(42,'Can change auth user groups',11,'change_authusergroups'),(43,'Can delete auth user groups',11,'delete_authusergroups'),(44,'Can view auth user groups',11,'view_authusergroups'),(45,'Can add auth user user permissions',12,'add_authuseruserpermissions'),(46,'Can change auth user user permissions',12,'change_authuseruserpermissions'),(47,'Can delete auth user user permissions',12,'delete_authuseruserpermissions'),(48,'Can view auth user user permissions',12,'view_authuseruserpermissions'),(49,'Can add comment',13,'add_comment'),(50,'Can change comment',13,'change_comment'),(51,'Can delete comment',13,'delete_comment'),(52,'Can view comment',13,'view_comment'),(53,'Can add django admin log',14,'add_djangoadminlog'),(54,'Can change django admin log',14,'change_djangoadminlog'),(55,'Can delete django admin log',14,'delete_djangoadminlog'),(56,'Can view django admin log',14,'view_djangoadminlog'),(57,'Can add django content type',15,'add_djangocontenttype'),(58,'Can change django content type',15,'change_djangocontenttype'),(59,'Can delete django content type',15,'delete_djangocontenttype'),(60,'Can view django content type',15,'view_djangocontenttype'),(61,'Can add django migrations',16,'add_djangomigrations'),(62,'Can change django migrations',16,'change_djangomigrations'),(63,'Can delete django migrations',16,'delete_djangomigrations'),(64,'Can view django migrations',16,'view_djangomigrations'),(65,'Can add django session',17,'add_djangosession'),(66,'Can change django session',17,'change_djangosession'),(67,'Can delete django session',17,'delete_djangosession'),(68,'Can view django session',17,'view_djangosession'),(69,'Can add task',18,'add_task'),(70,'Can change task',18,'change_task'),(71,'Can delete task',18,'delete_task'),(72,'Can view task',18,'view_task'),(73,'Can add project',19,'add_project'),(74,'Can change project',19,'change_project'),(75,'Can delete project',19,'delete_project'),(76,'Can view project',19,'view_project'),(77,'Can add task attach document',20,'add_taskattachdocument'),(78,'Can change task attach document',20,'change_taskattachdocument'),(79,'Can delete task attach document',20,'delete_taskattachdocument'),(80,'Can view task attach document',20,'view_taskattachdocument'),(81,'Can add site',21,'add_site'),(82,'Can change site',21,'change_site'),(83,'Can delete site',21,'delete_site'),(84,'Can view site',21,'view_site'),(85,'Can add email address',22,'add_emailaddress'),(86,'Can change email address',22,'change_emailaddress'),(87,'Can delete email address',22,'delete_emailaddress'),(88,'Can view email address',22,'view_emailaddress'),(89,'Can add email confirmation',23,'add_emailconfirmation'),(90,'Can change email confirmation',23,'change_emailconfirmation'),(91,'Can delete email confirmation',23,'delete_emailconfirmation'),(92,'Can view email confirmation',23,'view_emailconfirmation'),(93,'Can add social account',24,'add_socialaccount'),(94,'Can change social account',24,'change_socialaccount'),(95,'Can delete social account',24,'delete_socialaccount'),(96,'Can view social account',24,'view_socialaccount'),(97,'Can add social application',25,'add_socialapp'),(98,'Can change social application',25,'change_socialapp'),(99,'Can delete social application',25,'delete_socialapp'),(100,'Can view social application',25,'view_socialapp'),(101,'Can add social application token',26,'add_socialtoken'),(102,'Can change social application token',26,'change_socialtoken'),(103,'Can delete social application token',26,'delete_socialtoken'),(104,'Can view social application token',26,'view_socialtoken'),(105,'Can add Token',27,'add_token'),(106,'Can change Token',27,'change_token'),(107,'Can delete Token',27,'delete_token'),(108,'Can view Token',27,'view_token'),(109,'Can add semester',28,'add_semester'),(110,'Can change semester',28,'change_semester'),(111,'Can delete semester',28,'delete_semester'),(112,'Can view semester',28,'view_semester'),(113,'Can add Token',29,'add_token'),(114,'Can change Token',29,'change_token'),(115,'Can delete Token',29,'delete_token'),(116,'Can view Token',29,'view_token');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `auth_user_ibfk_1_idx` (`project_id`),
  CONSTRAINT `auth_user_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$150000$vaiHQT4U4aBt$944n3Y+V+CUUOrpN0pEaneeF+0uXH0MoQHW8M9XkUh4=','2020-05-07 14:11:41',1,'tester001','tester','001','',1,1,'2019-10-10 00:00:00',0),(2,'pbkdf2_sha256$150000$vaiHQT4U4aBt$944n3Y+V+CUUOrpN0pEaneeF+0uXH0MoQHW8M9XkUh4=','2020-04-23 14:35:12',0,'tester002','tester','002','',0,1,'2019-10-10 00:00:00',1),(3,'pbkdf2_sha256$150000$vaiHQT4U4aBt$944n3Y+V+CUUOrpN0pEaneeF+0uXH0MoQHW8M9XkUh4=','2020-05-06 02:08:03',0,'tester003','tester','003',' ',0,1,'2020-03-18 00:00:00',2);
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('1f40aa4abaffe54543472826c100bc7312ddda22','2020-04-14 03:58:43.601297',3),('5ef974e35cd3195f3e1e2a5f9cf7ccc5bffccba7','2019-12-30 16:16:02.828011',1),('9906f9b4be94a333bfb6109a171817dd672e7da1','2020-03-16 20:56:47.056058',2);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_Id` int(11) NOT NULL AUTO_INCREMENT,
  `task_Id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `creation_Date` datetime NOT NULL,
  PRIMARY KEY (`comment_Id`),
  KEY `task_Id` (`task_Id`),
  KEY `user_Id` (`user_Id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`task_Id`) REFERENCES `task` (`task_Id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_Id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,3,1,'test','2020-02-06 17:51:02'),(2,3,2,'test2','2020-02-06 17:53:34'),(3,7,2,'test4','2020-02-06 17:58:11'),(4,5,2,'test5','2020-02-06 17:58:22'),(5,3,2,'test','2020-02-26 12:43:43'),(6,3,2,'test','2020-03-01 16:33:45'),(10,29,3,'Tester003','2020-04-18 03:59:10'),(11,29,3,'Hello','2020-04-18 04:14:58'),(12,7,2,'Yes, indeed. Tester002, I agree','2020-04-18 04:24:54'),(13,7,1,'Typing something as the professor','2020-04-18 04:28:49'),(14,8,1,'Good job here','2020-04-18 04:28:55'),(15,43,2,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices fermentum lectus sed sodales. In tempor mi sed congue molestie. Nulla facilisi. Nunc egestas justo metus, vitae volutpat dui faucibus ut. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras velit tortor, pharetra pulvinar nulla et, ornare facilisis justo. Ut placerat urna ut est tempor aliquam. Proin ac urna eget nunc sollicitudin bibendum. Maecenas eleifend, ante eget lobortis aliquet, est leo dictum nulla, sit amet hendrerit ipsum turpis et justo. Mauris porta eros vitae nibh tincidunt vestibulum. Pellentesque et aliquam lectus. Sed pretium lacus vitae augue porta, a accumsan quam feugiat. Etiam sit amet odio vel mauris congue accumsan sed quis magna. Phasellus suscipit vehicula eros, nec euismod augue volutpat quis. Suspendisse tortor massa, imperdiet et maximus non, dignissim tincidunt turpis.','2020-04-25 02:39:34'),(16,43,3,'Typing typing typing','2020-04-25 03:19:54'),(17,43,3,'Typing typing','2020-04-25 03:20:45'),(18,31,3,'Hello final report comments','2020-05-04 07:56:23');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2019-12-14 03:51:26','3','Meeting Notes',1,'[{\"added\": {}}]',18,1),(2,'2019-12-14 03:53:30','4','Final Report',1,'[{\"added\": {}}]',18,1),(3,'2019-12-14 03:57:36','3','tester002Meeting Notes',2,'[{\"changed\": {\"fields\": [\"student_id\", \"tutor_id\"]}}]',18,1),(4,'2019-12-23 12:17:16','4','06 Apr 2020 tester002 Final Report',2,'[{\"changed\": {\"fields\": [\"status\"]}}]',18,1),(5,'2019-12-23 12:17:21','3','09 Dec 2019 tester002 Meeting Notes',2,'[{\"changed\": {\"fields\": [\"status\"]}}]',18,1),(6,'2019-12-23 12:18:04','5','16 Dec 2019 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(7,'2019-12-23 12:19:19','6','16 Dec 2019 tester002 Meeting Notes',1,'[{\"added\": {}}]',18,1),(8,'2019-12-23 12:20:28','3','09 Dec 2019 tester002 Weekly Report',2,'[{\"changed\": {\"fields\": [\"task_type\"]}}]',18,1),(9,'2019-12-23 12:20:53','7','23 Dec 2019 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(10,'2019-12-23 12:21:11','8','30 Dec 2019 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(11,'2019-12-23 12:21:32','9','06 Jan 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(12,'2019-12-23 12:21:48','10','13 Jan 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(13,'2019-12-23 12:22:05','11','20 Jan 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(14,'2019-12-23 12:22:28','12','27 Jan 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(15,'2019-12-23 12:22:51','6','11 Dec 2019 tester002 Meeting Notes',2,'[{\"changed\": {\"fields\": [\"task_due_date\"]}}]',18,1),(16,'2020-01-05 14:41:17','13','03 Feb 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(17,'2020-01-05 14:41:37','14','10 Feb 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(18,'2020-01-05 14:41:54','15','17 Feb 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(19,'2020-01-05 14:42:11','16','24 Feb 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(20,'2020-01-05 14:42:33','17','24 Feb 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(21,'2020-01-05 14:42:50','18','02 Mar 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(22,'2020-01-05 14:43:46','19','09 Mar 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(23,'2020-01-05 14:44:06','20','16 Mar 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(24,'2020-01-05 14:44:40','21','23 Mar 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(25,'2020-01-05 14:44:59','22','30 Mar 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(26,'2020-01-05 14:58:14','23','09 Mar 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(27,'2020-01-05 14:58:44','23','09 Mar 2020 tester002 Weekly Report',3,'',18,1),(28,'2020-01-05 15:00:22','24','13 Apr 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(29,'2020-01-05 15:00:38','25','20 Apr 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(30,'2020-01-05 15:02:06','26','27 Apr 2020 tester002 Weekly Report',1,'[{\"added\": {}}]',18,1),(31,'2020-01-05 15:05:25','4','06 Apr 2020 tester002 Weekly Report',2,'[{\"changed\": {\"fields\": [\"task_type\"]}}]',18,1),(32,'2020-01-05 15:07:41','26','27 Apr 2020 tester002 Weekly Report',3,'',18,1),(33,'2020-02-11 17:09:14','1','Semester object (1)',1,'[{\"added\": {}}]',28,1),(34,'2020-02-12 10:40:12','1','Semester 2',2,'[{\"changed\": {\"fields\": [\"semester\"]}}]',28,1),(35,'2020-02-12 10:40:51','2','Semester 1',1,'[{\"added\": {}}]',28,1),(36,'2020-02-12 14:14:21','1','Semester 1',1,'[{\"added\": {}}]',28,1),(37,'2020-02-12 14:14:47','2','Semester 2',1,'[{\"added\": {}}]',28,1),(38,'2020-02-26 09:32:30','1','TaskAttachDocument object (1)',1,'[{\"added\": {}}]',20,1),(39,'2020-03-17 19:08:54','3','Infographics Visualization',2,'[{\"changed\": {\"fields\": [\"tutor_id\"]}}]',19,1),(40,'2020-03-17 19:09:03','3','Infographics Visualization',2,'[{\"changed\": {\"fields\": [\"tutor_id\"]}}]',19,1),(41,'2020-04-18 03:58:53','9','Comment object (9)',3,'',13,1),(42,'2020-04-18 03:58:57','8','Comment object (8)',3,'',13,1),(43,'2020-04-18 03:59:01','7','Comment object (7)',3,'',13,1),(44,'2020-04-23 16:55:10','5','files/Lorem_ipsum_dolor_sit_amet_JoCvzlG.pdf',3,'',20,1),(45,'2020-04-23 16:55:10','4','files/Lorem_ipsum_dolor_sit_amet_sFlvn9q.docx',3,'',20,1),(46,'2020-04-23 16:55:47','36','23 Mar 2020 tester003 Weekly Report',2,'[{\"changed\": {\"fields\": [\"submission_date\", \"content\", \"hours_spent\", \"status\"]}}]',18,1),(47,'2020-04-24 11:49:35','8','files/Lorem_ipsum_dolor_sit_amet_JwY6cbz.pdf',1,'[{\"added\": {}}]',20,1),(48,'2020-04-25 02:32:01','9','files/test-document_XJ7mA2K.pdf',1,'[{\"added\": {}}]',20,1),(49,'2020-04-25 02:39:36','15','Comment object (15)',1,'[{\"added\": {}}]',13,1),(50,'2020-04-25 03:54:29','10','files/test-document_oiYIlU7.pdf',1,'[{\"added\": {}}]',20,1),(51,'2020-04-25 03:56:32','11','files/Lorem_ipsum_dolor_sit_amet_jrsYuMc.pdf',1,'[{\"added\": {}}]',20,1),(52,'2020-05-04 08:34:57','14','files/test-document_QU2PE69.docx',3,'',20,1),(53,'2020-05-04 08:34:57','13','files/test-document_qAOJ0ZP.pdf',3,'',20,1),(54,'2020-05-04 08:39:09','15','files/Lorem_ipsum_dolor_sit_amet_OOjnsgJ.docx',3,'',20,1),(55,'2020-05-04 08:44:34','18','files/Lorem_ipsum_dolor_sit_amet_3iCmTEs.docx',3,'',20,1),(56,'2020-05-04 08:44:34','17','files/Lorem_ipsum_dolor_sit_amet_MC1TVpE.pdf',3,'',20,1),(57,'2020-05-04 08:44:34','16','files/test-document_opu3VWL.pdf',3,'',20,1),(58,'2020-05-04 08:44:34','12','files/Lorem_ipsum_dolor_sit_amet_hgR6FcM.pdf',3,'',20,1),(59,'2020-05-04 08:51:55','22','files/test-document_5x3Dwas.pdf',3,'',20,1),(60,'2020-05-04 08:51:55','21','files/FYP_Meeting_21_Jan_2020.docx',3,'',20,1),(61,'2020-05-05 03:27:09','23','files/FYP_Meeting_2_Mar_2020.docx',3,'',20,1),(62,'2020-05-05 05:42:32','27','files/test-document_OzTu4MS.pdf',3,'',20,1),(63,'2020-05-05 05:42:32','26','files/test-document_8ru3aDE.pdf',3,'',20,1),(64,'2020-05-05 05:42:32','25','files/test-document_9Nwcrha.pdf',3,'',20,1),(65,'2020-05-06 02:31:46','24','files/Lorem_ipsum_dolor_sit_amet_2ttuXWf.pdf',3,'',20,1),(66,'2020-05-06 02:31:46','10','files/test-document_oiYIlU7.pdf',3,'',20,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (22,'account','emailaddress'),(23,'account','emailconfirmation'),(1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(27,'authtoken','token'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(21,'sites','site'),(24,'socialaccount','socialaccount'),(25,'socialaccount','socialapp'),(26,'socialaccount','socialtoken'),(7,'tasklist','authgroup'),(8,'tasklist','authgrouppermissions'),(9,'tasklist','authpermission'),(10,'tasklist','authuser'),(11,'tasklist','authusergroups'),(12,'tasklist','authuseruserpermissions'),(13,'tasklist','comment'),(14,'tasklist','djangoadminlog'),(15,'tasklist','djangocontenttype'),(16,'tasklist','djangomigrations'),(17,'tasklist','djangosession'),(19,'tasklist','project'),(28,'tasklist','semester'),(18,'tasklist','task'),(20,'tasklist','taskattachdocument'),(29,'tasklist','token');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-12-13 12:16:55'),(2,'auth','0001_initial','2019-12-13 12:16:58'),(3,'admin','0001_initial','2019-12-13 12:17:12'),(4,'admin','0002_logentry_remove_auto_add','2019-12-13 12:17:15'),(5,'admin','0003_logentry_add_action_flag_choices','2019-12-13 12:17:15'),(6,'contenttypes','0002_remove_content_type_name','2019-12-13 12:17:18'),(7,'auth','0002_alter_permission_name_max_length','2019-12-13 12:17:18'),(8,'auth','0003_alter_user_email_max_length','2019-12-13 12:17:18'),(9,'auth','0004_alter_user_username_opts','2019-12-13 12:17:18'),(10,'auth','0005_alter_user_last_login_null','2019-12-13 12:17:19'),(11,'auth','0006_require_contenttypes_0002','2019-12-13 12:17:19'),(12,'auth','0007_alter_validators_add_error_messages','2019-12-13 12:17:19'),(13,'auth','0008_alter_user_username_max_length','2019-12-13 12:17:20'),(14,'auth','0009_alter_user_last_name_max_length','2019-12-13 12:17:20'),(15,'auth','0010_alter_group_name_max_length','2019-12-13 12:17:21'),(16,'auth','0011_update_proxy_permissions','2019-12-13 12:17:21'),(17,'sessions','0001_initial','2019-12-13 12:17:21'),(18,'tasklist','0001_initial','2019-12-13 12:17:22'),(19,'tasklist','0002_auto_20191010_1030','2019-12-13 12:17:23'),(20,'tasklist','0003_auto_20191010_1103','2019-12-13 12:17:23'),(21,'tasklist','0004_auto_20191010_1227','2019-12-13 12:17:23'),(22,'tasklist','0005_auto_20191010_1702','2019-12-13 12:17:24'),(23,'tasklist','0006_authgroup_authgrouppermissions_authpermission_authuser_authusergroups_authuseruserpermissions_commen','2019-12-13 12:17:24'),(24,'tasklist','0007_auto_20191212_1918','2019-12-13 12:17:24'),(25,'tasklist','0008_auto_20191212_1923','2019-12-13 12:17:24'),(26,'tasklist','0009_taskattachdocument','2019-12-23 09:27:11'),(27,'account','0001_initial','2019-12-30 16:12:04'),(28,'account','0002_email_max_length','2019-12-30 16:12:06'),(29,'authtoken','0001_initial','2019-12-30 16:12:07'),(30,'authtoken','0002_auto_20160226_1747','2019-12-30 16:12:08'),(31,'sites','0001_initial','2019-12-30 16:12:08'),(32,'sites','0002_alter_domain_unique','2019-12-30 16:12:09'),(33,'socialaccount','0001_initial','2019-12-30 16:12:10'),(34,'socialaccount','0002_token_max_lengths','2019-12-30 16:12:14'),(35,'socialaccount','0003_extra_data_default_dict','2019-12-30 16:12:14'),(36,'tasklist','0010_semester','2020-02-11 16:44:26'),(37,'tasklist','0011_auto_20200212_2158','2020-02-12 13:58:26'),(38,'tasklist','0012_auto_20200212_2233','2020-02-12 14:33:08'),(39,'tasklist','0002_token','2020-03-18 10:11:28'),(40,'tasklist','0003_auto_20200320_1132','2020-03-20 03:32:23'),(41,'tasklist','0004_delete_token','2020-03-20 04:31:18');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('02zdqny3szsux9cuqayhtn1v44ili9kb','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 12:46:26'),('063njujaapffuo1w82ahnnpxp09lkoe8','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-12 05:12:55'),('07rwamuz4cjgnko3fq4raqtdnuneewg2','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:42:23'),('08wsflbozm37skxbkzjzqcay3thcmotb','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 21:46:02'),('0cykonyvtu8418ul4if2upkx7az1mvol','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:37:28'),('0dnmd8oqgv1y9q4s2pg8pf2b4zaaxyn9','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-12 05:08:24'),('0snnua4o7ck9cut782r8bhfnndqpvuhr','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:43:02'),('0vu4m2x8esbiwvtuf1uu9gubm84as0im','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:01:03'),('0zkkpan6474ylca9ivbrkyf1nn4gqhsf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 16:34:13'),('15kiz1zqyfiu3rnin0uf8yh80zzpmm25','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 17:41:16'),('1tm4v78mzknh42rcb1vlzbpl8psvx62r','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:52:34'),('1vwezj9sf5qpihms7zbdr6ps2rqd10m5','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 21:45:28'),('1xj0g6w3lcn1c3qcs1gnnuogrn0f74fc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:14:28'),('1yntcjey15xuqys3a0dy6w2hf49vkb29','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:58:41'),('1zhd0m6uorutakrveq6tq45s2yboglk7','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 12:39:25'),('267crvx06569mgilp0htkospfaa50892','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-31 13:57:53'),('277c7gipn5ua261iprbvv5zsrk9v55mv','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 13:06:11'),('2rvf8mkkqw5hhnm7hmhvb9x37jz61owg','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:44:49'),('2tmazqnd4ypiu4a2la2lc3i15ot2kbwo','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:12:01'),('2wyummd49c4y9tjqe7glwwxzk0r40wdo','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 11:28:26'),('3555z8v3mdags9yay2hbd33gc5hd5z9g','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-22 16:44:11'),('3717cteieh0s17c7jvl2wvtwws3gip2v','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 18:26:29'),('3gk269d5otzsik2uuqdskim0vg3htcl9','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 21:57:37'),('3h3jc48wrdj3oeaysvjrwoq4x3d8cyxk','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:07:24'),('3ko4y3i0ew7oj1iceskjnevvl4pwv00v','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 07:26:31'),('3lzyd57f9c7cwkiw78q9qdq4kgvs94sf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:44:08'),('3pav3xdmanj4wa8ohb2ty344hqbx37ju','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 20:43:29'),('3tigblkd9mb2sx8z26yuyhmvi88mmxcr','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:54:10'),('401lh100ylaixbp2flfefgmtgs662ndn','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 15:10:42'),('42b50gtmn9ytkjss0s7l3djapv6j6gd3','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 22:49:31'),('4aqhkm0rjynirgcao9m1m55wxl5lhdsa','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:45:08'),('4bvnwa7r1rtm0qh9y5nu4kwg69ed1w3w','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:25:14'),('4f2beumyr3abj03ig4uyeb3xfy5w3l44','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-03 04:39:12'),('4mdlqj71m7kl9s80bdalz11icsdnrqei','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 22:57:47'),('4s9oirbjqisbic42smk1t0zz280jbflx','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 09:00:45'),('4txsnad1wdwsf86ysjxq3oj47dz86of0','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 08:34:41'),('4vrvdrn136din5t4v0g6yq7izf3mbq2o','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:41:30'),('4xzlyjy3icnablu4g1fbk1ih43a9tkjn','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:54:30'),('4zpknwy0ftyiw6bzptn684eh6hw4rwab','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 19:22:24'),('57qaicmvdy09i59tj8prnejgxwal51os','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 08:43:03'),('5dnboc3xy10t4nq8r14hp1ft5ppin3of','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:14:12'),('5ei8z7ax953e88610v69rf9kw8t8xmrr','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 19:35:38'),('5ep913wm20bo3r02t0vb1jwa5k9ymfox','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 06:21:20'),('5h3nm9g8qf25yv0g7wrwmz49hr5ko518','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-16 06:09:17'),('5jwz6xk4uh7k95wvwdwglf6sfok4tw26','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:45:55'),('5o1ye6h60egsg97n1fw3n59bvo66fhxv','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 11:47:52'),('5s13f69iw7pbm54wkjh03iap39xgmlnw','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-27 00:05:38'),('615msqg5kbec1lxg95z7i7hmmi19s8jw','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:52:32'),('6j6zjrw88yhu0vckp2dftc4tarv3ii1m','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 12:27:21'),('6jphk3aq59rjy2jfsgjan4pjuood0rd3','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-21 14:11:41'),('6k57ywrgd1c1p6667fam8lhaho52yrcm','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-01-19 07:15:15'),('6z77uak3v8wh25sn7e24lr65j861y6cq','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:11:58'),('707hrmjea7j796ozch1tm6z3g0gn11jf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-03 04:39:38'),('71yynogbga429f8c0cp28j8ajv0t7zl2','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 06:47:56'),('72i46ad4hxxzfdjjbfuvhotq7ioaiwzp','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:22:04'),('774rj2ax3i6qmpm6jbn2kt8lmdwtssc8','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 07:42:44'),('7boarzvcf3ybfugv8if65zmgqe48glur','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:36:00'),('7cm2012gktg41jec85svjiwg9si61bqe','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:10:13'),('7dxz4ks6sslc3tqgy5hb306eeggwllxv','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-19 03:53:52'),('7m45goqbr8yz49ddinu7y7lsk3kpgdwd','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 05:10:44'),('7pb84tr125sknl3wtmf6paoyr7c7voc6','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:29:06'),('7socmdmnpf0kyy5znpvhw5pplsipxkuf','YTEwYTU0N2QzMWE2MmM1ZjMwNzNiZWYwOTVlNmUwMzliOTZlY2JiZTp7fQ==','2020-04-03 02:24:50'),('7u09e8qiwknzwml5ut9tv2g1dj7nkgdf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 15:11:38'),('7yiyajjwz1v9ibonmywzqdw2yg1q5umf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-14 13:35:43'),('7yxmomowumlruabaeodgl0bhoq1sg9wo','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-27 01:16:02'),('7zm73su4mjywf9xd7iyd4y5simh3hiwh','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 11:01:29'),('87h1s3x9l3u0cv36oqmnje2fikshfmrk','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-03 11:30:51'),('88rhk9bcgidzodanau1grblvkgo5sgrz','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-19 05:31:02'),('8c9g7agruzhr178zxyrssj3eeo4d3532','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:16:35'),('8cmxtf6kkhxb8dn2y129pnuzd1x4mb39','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 18:38:49'),('8eircp0e92clo522a1lrkip6it2ngjs5','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 10:44:44'),('8ene1of1kfd58dq6e8xctkerys6v52qd','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-19 14:36:16'),('8h6ye0t25bgah6rthwmgx678yxjrarnu','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-02-03 14:07:59'),('8rmujj294vozx7syq7qrsi29lzcyf43l','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:38:42'),('986ut27ggipzngddixw9750669qdg2lb','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:44:11'),('99prr9becuav5hgsr0rv1fnn5r4d7qi3','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:27:42'),('9i4gvci39x7jxdhbj6j6pgi9qrw7ba4x','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-19 14:55:23'),('9ootqikalg31tcq6hoiz64eoxo994em9','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 08:24:06'),('9quhjvppcwgjkxqq407ge998xk2so4b8','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:52:34'),('9xsfe42iwyf4kxtbazoavxfu204wzfit','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 08:54:41'),('a49xjxmr0w9g1i0mb833x8obh1ts5lbe','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 02:36:44'),('a65kaqk9ygyo0fp0t3xs12sorpbkowrv','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 12:21:03'),('ab52zaiafbgnhgth5egibraec1ednm7u','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:38:01'),('aecmlma8o9el7ok0re9k8cms83mou885','YTEwYTU0N2QzMWE2MmM1ZjMwNzNiZWYwOTVlNmUwMzliOTZlY2JiZTp7fQ==','2020-04-01 13:54:12'),('aeeprqy0kguaosbssef2l8etw6o80xs0','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 11:31:14'),('aqrd3rjcv3wdmu1k32w9wkoxdsd01oez','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:58:38'),('aua8lei6psaxpfs109irxh2gia9t6st0','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:43:01'),('avyhavb2cxsevbq0cr4jw6o2p8a812nv','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:57:29'),('axukry0yj5zp55fuzjj1cv0k4bgfw9os','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 19:24:32'),('b0fte8yj60f8zpg8cqoc8pm9vcmuxhm6','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 06:46:08'),('b0nb3m2j6kgf4h5zhjcrxz1zsr993y5a','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:52:36'),('bg0m83j2wbkrkzmpsvscj3j38q81mhxk','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2019-12-27 12:54:02'),('bni3wjiftfimi6hy6wg1jmcoozor3lqt','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 08:54:35'),('btrjp90u8pacyrdsozf35kjmslnnyw9i','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 16:00:16'),('bzjnytfuxvmht4qi0dyw15v2sdh2tnvs','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-02 03:58:40'),('c77pofoppnrw0t3rc1h3la3cv65i9moo','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:15:26'),('c7a8me2kl3ze5d2hx33nupea9wyuld22','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:42:33'),('ccqcd2s06kq9wnc2zu9cwdzvimi2l98h','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 16:00:09'),('cegihgpmabid10o5vhjlsgbnc64z7ghp','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-07 17:01:55'),('cf7g6qltahe1zv56iuh74vm49bqi9kdr','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-27 01:15:45'),('cl0azdgp9xcte4blxaf3ligrvtqplvr2','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 03:07:58'),('cv4ai2vo9dzvy7qnt52ihqre4e5poa07','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:57:08'),('d3rsve67v1vle6lf48mzho0a1us1dts5','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 07:56:35'),('d5kid4ug7hweekrmtx6dz5t7wmzw6cbx','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:11:54'),('d84m9f9awgc0m5htrvajf15f1plrkap0','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:59:46'),('daafc27cvpm1woz8fxc3hpbzr53bl8qj','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 17:13:49'),('ddrc7qxsn3band00h5umi95b96r7ytak','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 19:28:32'),('dnc8kjkflafs3e2e0b7fjb6j1o6jrz2k','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:34:33'),('dv3ek1e7muwh9my3xi8ona5gu5n7x9lt','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 11:03:04'),('dvtjevchhjd7q7msc8n2242gaouzeq7t','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-03 11:51:46'),('e28y4ludll7s3y52gmra6zuf98phphvk','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:42:56'),('e2w5d6i5pfjngd2qke0kq8vz6fwxpg11','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:13:37'),('e59d74bhap5wvm6i9e5n6qqxhi5kbu5f','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:43:36'),('ee14gj7rh2nlz9ogiod647tlsd19wkoo','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 06:16:36'),('ej9fxrecfbxciu84jgm3zljk2jda2nvc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:12:00'),('eo7vse65su69fmou5khu4axc648r9v2n','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:41:24'),('eoyehnbiw8qp6hsz9bo3ob9cx34863o1','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 20:44:32'),('ewnhouwdaqo2bag5q1n1o0xytp1fmfgh','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-19 14:07:52'),('fcak0jn1dk3na3l18vywd6b6ipjdh69n','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:53:28'),('fdjgzbergx6w9andpwgn35zi6226u5l9','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:35:19'),('fe5bnuakp2z69tz79p0pnpvvkyfv10yw','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-22 12:52:02'),('foqub2q7wryts4dza3wvixwju2h8auk9','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 07:56:13'),('fwso3xo7x8h9d4cjiprqkouir1p4udll','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:09:28'),('fww2c6zzcqi3iei96gtpd849g1s4eyzn','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:44:07'),('g2njf1nw1rcgxkba4fz78r9cuff43s83','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 11:43:55'),('g348py2xl1q9w86avpts4txuof7646p7','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 12:39:41'),('g4hrwr7sg3mhrqm0g2vlcpnoous0vsvi','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 17:05:06'),('gi3z8hq3ek5k6pco477ek9legnjxljsl','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 22:54:59'),('gizg0s82zbt68q991cuy2ysu3ibjwaz5','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:57:57'),('gwfn26nwdh3wxbdcphk9p5v8w8fuh6m0','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:10:17'),('h3l4w20v9vdkgq3zit1ry3h0zb79geou','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:54:48'),('ha47rd634tbxyiq6xrib60ockaqm2i6f','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:11:59'),('hao9vsy5800j8f183pl5uj9o6ixys63e','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:27:12'),('hdgjqj6azq97ejhbk60xshnsjfbg10w6','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-22 12:46:25'),('hgcaqslk30khixy26cbvrv74uc542cdo','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 15:10:50'),('hiw1izmnmfu2bbs4x8bgavhzvnhhth9t','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:36:12'),('hjyjq61844jfdrz81evno4aim52i257z','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 12:47:37'),('hvsakvt5915afznbx73rrd0ddhb8ofax','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 21:43:09'),('i7i1ix9hhh7j3dj22el51gconb63aw4l','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 22:55:16'),('i7ive3900ysdbw56saqi7sqj3a0z0dng','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 09:03:33'),('icyopa6gkf0oyyagnul2zoaqrg5w26x0','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:33:20'),('idg6kh7mvmd05gorhj4rpkyhsbeqsdjy','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-07 14:35:12'),('iqg44qlznd9u99742r1kilafmyzthilc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 11:35:48'),('ir6al5mvlliapiqzeeqnyozeb6cf427c','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 03:58:44'),('isuizsxtaupwuzcf2z1enl1lxh0rd02b','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-22 12:51:58'),('ituy5i3v2smgropj381qmdtn28xrnph7','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:03:24'),('j0wpaqnj4v00qiixmnkklphc9mn7yux9','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 17:39:22'),('jbk3qq8hmllq15b4hlf8zla90x90nbos','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 08:17:59'),('jiofwb01xi0j3a7jcyon5ep6mxqs91xg','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-19 07:46:47'),('jlg6il8zoepmdasrh7e6qdksrjhcu853','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 22:07:11'),('jn1l0fdt0bxz7nfbmv8lwghi4xrrgufy','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:57:23'),('jnaqowks3btq1c473zoddvgekce0v1dw','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 12:55:20'),('k1fcq2szg1avd21q5gix19sju5cpn9ss','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:49:50'),('k31oxnjfcxymlc011oqqofokl3tcan9i','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 19:04:33'),('k3mu2hu20xbp1kiwraopdpti89wpqkqy','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-10 03:47:19'),('k3n66zfiv3ph0c457i7tcbghy859u59v','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 19:49:35'),('k9b3rgvrtkpsbqyi7oy8wtui84if45uu','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:14:55'),('kha30et862u02n1jrttdf1zlkgbsnhgn','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 07:18:26'),('klo2spjznkn8ulp99zcwd59aif8l6dc9','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 23:00:49'),('l4rctsczqm4a1b6erjwo3m5wbatpqgbk','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 21:19:57'),('l6zhwbvkjiewd7rbeipphagp4otyfjtr','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:15:08'),('l7advqldsylatzby0hebcd8e32rc7fqr','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:43:56'),('l9xwotyerpb3fizqmqi0dwxg8mnexxq5','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:31:38'),('laisgpocwbwvkxbouqy1rcc512d9213y','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:33:28'),('lb3u4xecdm50bgsmmx2f8jv8zeqa0bta','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 21:44:58'),('lh1r333b6p0400zzyc089ttszsplcs3i','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:35:28'),('lihyob95v7p6lo1ap2qi6gag898esdto','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:58:36'),('lm24ayi8cjibrjn4gq5i3ppiahpaxuf7','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 17:12:18'),('lmnzkjyho0qxj3e4b2cecvh8xfe8c8do','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 18:39:31'),('lojo7sswlk7ug4q47x4jkvl00bjphsk4','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-03 12:17:20'),('lprozqvh29xbg0hdrfmqo5jcrk9ahwpb','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 21:21:59'),('lsh9jmcc7uvr9q92i6zkyes0ns0qfoiv','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 08:25:55'),('m1nunz64luoo7gkdxmqrocn6yd1dl70w','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-19 14:10:15'),('m2uf7b4i4del59o1s3wgzxu4bv46v4rx','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:49:20'),('m5xaesnx75u84n63t68hf8vy58ynoq37','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 22:24:26'),('m6jgyv2nt5b6mn5k2urppu942m4g83vf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 22:24:38'),('mdey26w7qjmdli90cwn3jcir07xmfdyi','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-02 03:48:40'),('mlznd6wef5l61gtccfxuuaclgebc3xo0','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-03 09:37:48'),('mo7n0cn5e0n0blupauk7k6mhbcam4hcl','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:56:56'),('mqfgphqnuml2x111audwf5ccaysvpaxg','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:35:03'),('murk5att4yrkktwpx9ooguoqrpvdwz9l','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-03 12:00:29'),('mvqb4vox6is0b8yncqtk7eb260t2ccfo','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 19:36:49'),('mw8uzwpaj9bhom570h5gyfd3v09tyvdc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 11:04:33'),('n405og5tzukd79z6q0lozrvb2h3nzt94','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-22 12:52:35'),('n7s6ga0su52jpmbasx2n5xh01jb1knir','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:37:40'),('n87w0bbaj60ss2rzhqvjhf6mxuryqdei','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 05:11:57'),('napaz0etzqgj9tdf5eqt6p0v5dkighpq','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:57:04'),('nfs4sqtkfwh8vkycq1hst6hwhfujhatk','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-07 14:41:40'),('ng1ol5zuhmti2bv415bxl40t8dy9uerf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:13:19'),('nhxryhvdnlrk4t6il3vkzkeb1fqddlrm','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 20:47:43'),('nl3u389us613by12lubmqvart523dcxv','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:49:27'),('nmecjdb03efc1753m8ifstzxiubhxf6f','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:17:30'),('nnnzw2etj4m2mji4n5hmrsi7zue53eru','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:12:42'),('ntqtmoah4gq0pscvqthgk9w8lcrs628y','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-14 04:34:40'),('nz7u4xehmf5hxqutxg121sir276g80p4','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 19:49:27'),('o0j39h594r6u4ybm794h1oxalm0ju1o7','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-07 14:34:11'),('obdzp6ryg8vuk9vhuzlpfc2bn4nivd2q','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 06:37:10'),('obyk80xb2mjk42puf1l4814haxjpip7n','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:27:40'),('oex5axjwz1w3ofe36pnc9v0sgxb40wtu','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 11:58:45'),('os88t1zjk10yam436ayuacoq3r3bchu8','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:17:19'),('otxb6orsjdjnsejzlc4hsstguqa6m0g6','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:26:56'),('p12zlndq7rweg40epgye1nbizcihrh75','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:34:18'),('p3mq714m73gj0c1cszzi2uz62wn2e1ax','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 06:25:52'),('p5nn52zi2kce0ps7hptlul07dflih1cg','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 10:44:59'),('phvwkv3oi6pbw0vnw17xexpsyyqfr6yz','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:56:11'),('pmikit7hkgcq2qemmzbuwxa2g2v0vt9q','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 12:27:01'),('pr9dj0b53wn1mypxhdivjur7lan7kk6b','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 17:12:07'),('prrfc8f3bius7e9y8a305v57egu7o63i','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 21:20:23'),('pz2tgdyici6lxa2m369pu2dych1ed1lh','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 23:16:10'),('pzwugb05rt2ojfqgpt15te7kijzcv36q','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:40:45'),('q24knv9wmonfnr20fhzg939pr7awg9bs','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 05:08:47'),('q6j1vy19q5ft14tim5oevn6i2gkz2lt7','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-08 05:56:56'),('qdo3gqp9aq6uze2vj6v8cplb320z0bvs','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:53:47'),('qfflfhn7fddm27j5gw7c6sw1tiymy697','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 11:29:45'),('qg67jr6kkco4zw5w589sr0snq7bofi8j','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:25:01'),('qjuqss0xi4lprhf9j67n2fx4kp0nhf2m','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-18 07:35:10'),('qqb8jmeswg5501ykjz1i60dw8v61i53g','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 22:21:27'),('qqc86flgno3i6fbebhc6e0gjjdxf5jn4','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 02:11:04'),('qsijpn54i7i8zr6ofs4yammakuiduov5','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:45:03'),('qvxhqrdycjqfy25pt9wj9ii6rubgpcxt','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 15:48:14'),('r3fyuycafa4rdfcj13kv1d4kxufzan3g','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 22:24:20'),('r4mktcku38vlhdj5ne16zs11xlzh5ovj','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-02 04:23:41'),('r7538v5aojs81biulmoqvk1rrb7n59cx','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:42:16'),('r7u8yl03opvy4593a461zr2j7woa4gj2','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:44:05'),('rb5u1agplxz6lfcski7tmdm530ym015c','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:31:24'),('rdpx2j0e6b3odgfyd2dxfgijdr7o80pn','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 22:21:20'),('reai8zfxcwywi81ojeuihw8xu4pl1gvq','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-15 16:22:40'),('rhflc50rrn7wuhcj3bhfdsrf9g2n94en','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 21:38:43'),('rjdkc4mq41pd6w75z69gur07nvhnjkrq','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-19 14:55:32'),('s8w4hwk28aymoh9q8ya3oqtbz7dajpnl','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 21:44:22'),('sfabcrci9fowwe40braqswbeorgfusod','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 11:28:40'),('so1f4cx930pq6xbd4753m2e6fr0isx76','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 18:25:43'),('sxfrmnaeesmvsizsxbxuxgsdx7eswo0w','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 12:17:08'),('sz1aiqbiz2dwf2w7xvctylp8f4qos5tx','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 10:18:26'),('sztysq0val95rjfoe4c4cym88o8su6lb','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:36:35'),('t5clww11157lju0f75oqjoe7i9fhvzgs','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-07 17:10:36'),('t7f2j6nt7yttqyymzn77hvynv83xghro','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 14:47:19'),('tbgv8q1s53f4zrq36867dt04wwldrgfc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:49:30'),('tcevp8cy1h85npq69dozpvx4pqqaci7n','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:29:24'),('tflx0uar09ufx0pr6ysytocnnvct3qup','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 02:25:47'),('tfrjlizs4m674vwr90yjqeyhuaphx94g','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 11:44:27'),('tgexj19793wrxryb5takt5k1g26bjdb5','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-07 14:45:23'),('tkl1pu1rpxuovdvnikunwxlnskemsp3a','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-01-20 10:18:17'),('tmohsq1r2sqy8ot4y31cz3qot4sp9cb6','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-20 02:08:03'),('tnn0uapsbnw5cqpe1gvm5r7nd7cx3kqm','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 13:37:26'),('u2fxu14aio2phr2qkk69yroclf479r8q','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 08:36:43'),('u92giq9l2pkfhg9qcqodfie48mh0yeip','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 12:39:18'),('ug5eudly2v5odrw5zx6ypwvm1lgel97i','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 08:55:43'),('upi82fbn3o2vzq44ew6u18d23pm66dtj','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 22:49:14'),('uqbgeljs5yb427g5uieoecryk1ny0wex','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 21:39:36'),('uru2311vdz3zhvlt1n6hr2nek7lwikgb','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-30 17:47:17'),('ut8v0i7divr9z6dbouww18umkxvj3kru','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 13:27:35'),('v5xnnmh3c8xkkyrtsjdniksreulckb4d','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 08:54:15'),('v9mui64pic82ftfuv4ml71sdy9xc1cps','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 21:10:13'),('va0bkkdg0ask02b0xbq9w2ekpej237ho','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 00:09:34'),('vbxkac7eya2pn46quou30ivhf4bx71he','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 09:56:12'),('vgc2w43hgom8io11n6cbvbydc64dpdwn','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 18:34:00'),('vj5sni1yjvzf7457jcokag0jmek7fy6f','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 12:54:39'),('vkohkrl7y5tz6frjwmkhk09fpgcjqsy8','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:28:59'),('vralt51isoxyvtsasto5ypofllqn5tox','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 10:58:57'),('vyoujf9x9kwrjnd0zxx6zsbii3s4vhax','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-22 12:44:13'),('w00i3okvyts0shrwveuc0h4lyosi7vbc','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:49:55'),('w68gtv6lpubj4kdu4q5atxt47dflgvu2','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-30 18:37:34'),('wh80vfpxzgysn8ccvq6j3q9dm1wznc80','YTI2OWUwOGMzNjNmZGEwYjM3NTYxY2RhMmE3MzkwZjU3Zjc5MTI2Nzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 16:44:53'),('wmepqyf7hnciqsunq1czpu7rh9h4hue4','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 11:35:35'),('wt4j33frj5574v6jvoftl5jz2c9m8bfl','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 13:20:32'),('wunyal6ikniw69mtw568fee8ped31kt7','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-19 06:31:44'),('wwbq39dydj7uk4a19tyta108vu8ljk3u','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-01-06 09:40:21'),('wy3te867ub1od0owuwfkkh5msnyhb2ht','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-08 05:36:20'),('x2v1ndg1ecy68n5rkiayeb5ex304lcjz','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-19 22:32:11'),('x3tnedmsbn338zqv1gin3d6vu3l6q0d2','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-25 19:51:08'),('xaw8vk6mov99yxc5vjkmjncbpg5fzw0h','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 06:41:45'),('xijnnjbv4j8iigzj0227na6dx2jyhxob','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 11:20:45'),('xjiybrc4n3hii5unkos0eeebfiyyzyz4','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 14:23:41'),('xjuvmc24xbdyq3edi1x63711q950xz5k','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-02-19 14:50:48'),('xnloojg37yxtik9fwv16b3mcw1k8fp1r','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 15:10:46'),('xol8dbdzxky50nc0x6tdlspnenoipnoj','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:41:53'),('xqfqn03kizxemlicsdcflr0pgwgns8nf','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:44:56'),('xr8f196zvkujfwovp59o5ix9bvrz1oud','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-29 08:55:06'),('xzqc389r51zdkazn9dpapgl86szibjbv','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 18:37:33'),('y1ghgnzal53s63pneqzm7a8h3d1wnis9','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 17:38:23'),('y3jt1q5m77uafv0noau9fgx1ojzu0nu2','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 12:23:05'),('y3m0uqz6yhvnswel7ihsalijuchnlhvk','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:10:15'),('yd4pakvjct4eo6v9et8r69o0hjs7oswx','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-03-11 09:25:48'),('yinirwu55muv9bby039dcyecnhpxlhu6','OTBlNTQ0NDAxZDE0OWJhMDk3ZTlkM2E2NWY3Y2E5Y2VhNzliYzJlNzp7Il9hdXRoX3VzZXJfaWQiOiIzIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-05-19 03:24:50'),('ynlx4p1tai78ca42eijjdz5c2qzvah0x','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:42:31'),('z5ph0qsngn7qsfzf49wrmqvz1mwmz8cc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 11:32:33'),('z5yeaylp33sbmptgq5bt11436i7idycc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:11:24'),('z8loiconh7itzodfple4jl437p3tujiy','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:53:47'),('zevh8uyxu5axlt0kmlc8mux748wu5pyc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 14:09:44'),('zs3zg8i9q8oa1mxijnitca85i9esa3ux','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-21 16:52:56'),('zsk845ta561p3dysz6t6h8pql1gb66ii','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-01 10:15:04'),('zu4xmhvy7lgjk7k8vrejeqmc97xduoto','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-28 10:08:33'),('zuriz9to3aup1354n34hrg8pom4v4ojc','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-20 12:38:36'),('zx5p61x99bydzw0urezq3tlvmcv1exev','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-24 16:38:01'),('zyck09ygu563wn23h8pkdkdttk04zbiq','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-26 10:41:19'),('zzloewek8wyr2k5j81ctl2us8wo7uk16','ZDE5YjEzM2FiYmRhZjUxMjlhZjE0ZGYxNTE0OTY0Y2E1NDMyMzM2Mzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI0OWUyNDVjM2YyOGE4NWU4YWQ1OTVjZTkyODRhNGVmM2RkYzVmYjE0In0=','2020-04-23 12:52:52');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_Id` int(11) NOT NULL AUTO_INCREMENT,
  `tutor_Id` int(11) NOT NULL,
  `project_Name` varchar(100) NOT NULL,
  `project_Description` varchar(3000) DEFAULT NULL,
  `is_FYP_Project` tinyint(4) NOT NULL,
  PRIMARY KEY (`project_Id`),
  KEY `project_ibfk_1_idx` (`tutor_Id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`tutor_Id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 KEY_BLOCK_SIZE=2;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,1,'Web App Management Project',NULL,1),(2,1,'Interactive Display',NULL,1),(3,1,'Infographics Visualization',NULL,1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semester_start_date`
--

DROP TABLE IF EXISTS `semester_start_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semester_start_date` (
  `semester_Id` int(11) NOT NULL AUTO_INCREMENT,
  `semester` enum('Semester 1','Semester 2') DEFAULT NULL,
  `start_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`semester_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semester_start_date`
--

LOCK TABLES `semester_start_date` WRITE;
/*!40000 ALTER TABLE `semester_start_date` DISABLE KEYS */;
INSERT INTO `semester_start_date` VALUES (1,'Semester 1','2019-08-11 16:00:00'),(2,'Semester 2','2020-01-12 16:00:00');
/*!40000 ALTER TABLE `semester_start_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `uid` varchar(191) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `socialapp_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `token_secret` longtext NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_Id` int(11) NOT NULL AUTO_INCREMENT,
  `project_Id` int(11) NOT NULL,
  `student_Id` int(11) NOT NULL,
  `tutor_Id` int(11) NOT NULL,
  `task_Type` enum('Weekly Report','Meeting Notes','FYP Plan Strategy','Interim Report','Final Report') DEFAULT NULL,
  `desc` varchar(300) DEFAULT NULL,
  `task_Created_Date` datetime NOT NULL,
  `task_Due_Date` datetime NOT NULL,
  `submission_Date` datetime DEFAULT NULL,
  `content` varchar(3000) DEFAULT NULL,
  `hours_Spent` int(11) DEFAULT NULL,
  `status` enum('Pending','Completed','Late','Late Submission') DEFAULT 'Pending',
  PRIMARY KEY (`task_Id`),
  KEY `project_Id` (`project_Id`),
  KEY `student_Id` (`student_Id`),
  KEY `tutor_Id` (`tutor_Id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`project_Id`) REFERENCES `project` (`project_Id`),
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`student_Id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `task_ibfk_3` FOREIGN KEY (`tutor_Id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (3,1,2,1,'Weekly Report',NULL,'2019-12-14 03:50:21','2019-12-09 15:59:59',NULL,'',3,'Completed'),(4,1,2,1,'Weekly Report',NULL,'2019-12-14 03:51:48','2020-04-05 16:00:00',NULL,NULL,NULL,'Pending'),(5,1,2,1,'Weekly Report',NULL,'2019-12-16 15:59:59','2019-12-16 15:59:59','2020-02-26 15:26:15','test',2,'Completed'),(6,1,2,1,'Meeting Notes',NULL,'2019-12-23 12:19:08','2019-12-11 15:59:59',NULL,NULL,NULL,'Pending'),(7,1,2,1,'Weekly Report',NULL,'2019-12-23 15:59:59','2019-12-23 15:59:59','2020-02-26 15:29:43','testtest',1,'Completed'),(8,1,2,1,'Weekly Report',NULL,'2019-12-23 12:21:00','2019-12-30 15:59:59',NULL,NULL,NULL,'Pending'),(9,1,2,1,'Weekly Report',NULL,'2020-01-06 15:59:59','2020-01-06 15:59:59','2020-03-01 11:20:09','tst',1,'Completed'),(10,1,2,1,'Weekly Report',NULL,'2019-12-23 12:21:39','2020-01-13 15:59:59',NULL,NULL,NULL,'Pending'),(11,1,2,1,'Weekly Report',NULL,'2019-12-23 12:21:55','2020-01-20 15:59:59',NULL,NULL,NULL,'Pending'),(12,1,2,1,'Weekly Report',NULL,'2019-12-23 12:22:16','2020-01-27 15:59:59',NULL,NULL,NULL,'Pending'),(13,1,2,1,'Weekly Report',NULL,'2020-01-05 14:40:59','2020-02-03 15:59:59',NULL,NULL,NULL,'Pending'),(14,1,2,1,'Weekly Report',NULL,'2020-01-05 14:41:29','2020-02-10 15:59:59',NULL,NULL,NULL,'Pending'),(15,1,2,1,'Weekly Report',NULL,'2020-01-05 14:41:46','2020-02-17 15:59:59',NULL,NULL,NULL,'Pending'),(18,1,2,1,'Weekly Report',NULL,'2020-01-05 14:42:41','2020-03-02 15:59:59',NULL,NULL,NULL,'Pending'),(19,1,2,1,'Weekly Report',NULL,'2020-01-05 14:42:57','2020-03-09 15:59:59',NULL,NULL,NULL,'Pending'),(20,1,2,1,'Weekly Report',NULL,'2020-01-05 14:43:58','2020-03-16 15:59:59',NULL,NULL,NULL,'Pending'),(21,1,2,1,'Weekly Report',NULL,'2020-01-05 14:44:12','2020-03-23 15:59:59',NULL,NULL,NULL,'Pending'),(22,1,2,1,'Weekly Report',NULL,'2020-01-05 14:44:48','2020-03-30 15:59:59',NULL,NULL,NULL,'Pending'),(24,1,2,1,'Weekly Report',NULL,'2020-01-05 14:59:32','2020-04-13 15:59:59',NULL,NULL,NULL,'Pending'),(25,1,2,1,'Weekly Report',NULL,'2020-01-05 15:00:28','2020-04-20 15:59:59',NULL,NULL,NULL,'Pending'),(26,1,2,1,'Meeting Notes',NULL,'2020-04-13 16:00:00','2020-04-13 16:00:00',NULL,NULL,NULL,'Pending'),(28,2,3,1,'Meeting Notes',NULL,'2020-04-14 04:00:00','2020-04-14 04:00:00','2020-04-19 10:01:02','Teseteiewfn2312',0,'Completed'),(29,2,3,1,'Weekly Report',NULL,'2020-04-05 16:00:00','2020-04-05 16:00:00','2020-04-19 10:41:46','twesfenun32r',3,'Completed'),(30,1,2,1,'Meeting Notes',NULL,'2020-04-14 16:00:00','2020-04-14 16:00:00',NULL,NULL,NULL,'Pending'),(31,2,3,1,'Final Report',NULL,'2020-04-28 16:00:00','2020-04-28 16:00:00',NULL,NULL,NULL,'Pending'),(32,1,2,1,'Final Report',NULL,'2020-04-28 16:00:00','2020-04-28 16:00:00',NULL,NULL,NULL,'Pending'),(33,1,2,1,'Meeting Notes',NULL,'2020-04-14 16:00:00','2020-04-14 16:10:00',NULL,NULL,NULL,'Pending'),(34,1,2,1,'Interim Report',NULL,'2020-04-27 16:00:00','2020-04-27 16:00:00',NULL,NULL,NULL,'Pending'),(35,2,3,1,'Weekly Report',NULL,'2020-04-12 16:00:00','2020-04-12 16:00:00','2020-04-23 16:41:35','sfefwegwrgwerg',12,'Completed'),(36,2,3,1,'Weekly Report',NULL,'2020-03-22 16:00:00','2020-03-22 16:00:00',NULL,NULL,NULL,'Pending'),(37,2,3,1,'Meeting Notes',NULL,'2020-04-19 03:00:00','2020-04-19 04:00:00',NULL,NULL,NULL,'Pending'),(38,1,2,1,'FYP Plan Strategy',NULL,'2020-04-20 16:00:00','2020-04-20 16:00:00',NULL,NULL,NULL,'Pending'),(40,1,2,1,'FYP Plan Strategy',NULL,'2020-04-23 16:00:00','2020-04-23 16:00:00',NULL,NULL,NULL,'Pending'),(42,2,3,1,'Meeting Notes',NULL,'2020-04-24 04:00:00','2020-04-24 05:00:00',NULL,NULL,NULL,'Pending'),(43,2,3,1,'Interim Report',NULL,'2020-04-23 16:00:00','2020-04-23 16:00:00',NULL,NULL,NULL,'Pending'),(48,1,2,1,'Meeting Notes',NULL,'2020-05-13 04:00:00','2020-05-13 05:00:00',NULL,NULL,NULL,'Pending'),(49,2,3,1,'Meeting Notes',NULL,'2020-05-04 16:00:00','2020-05-04 16:00:00',NULL,NULL,NULL,'Pending'),(50,1,2,1,'Meeting Notes',NULL,'2020-05-04 16:00:00','2020-05-04 16:00:00',NULL,NULL,NULL,'Pending');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_attach_document`
--

DROP TABLE IF EXISTS `task_attach_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_attach_document` (
  `task_Attach_Document_Id` int(11) NOT NULL AUTO_INCREMENT,
  `task_Id` int(11) NOT NULL,
  `attach_Document` varchar(100) NOT NULL,
  `uploaded_Date` datetime NOT NULL,
  PRIMARY KEY (`task_Attach_Document_Id`),
  KEY `task_Id` (`task_Id`),
  CONSTRAINT `task_attach_document_ibfk_1` FOREIGN KEY (`task_Id`) REFERENCES `task` (`task_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1 KEY_BLOCK_SIZE=4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_attach_document`
--

LOCK TABLES `task_attach_document` WRITE;
/*!40000 ALTER TABLE `task_attach_document` DISABLE KEYS */;
INSERT INTO `task_attach_document` VALUES (1,9,'files/Social_Engineering.docx','2020-03-01 11:20:00'),(2,29,'files/Lorem_ipsum_dolor_sit_amet_9O7Gkm4.pdf','2020-04-23 14:47:00'),(3,36,'files/Lorem_ipsum_dolor_sit_amet_E75CESZ.pdf','2020-04-23 16:31:00'),(6,29,'files/Lorem_ipsum_dolor_sit_amet_Qbawmn7.docx','2020-04-24 08:24:00'),(7,28,'files/Lorem_ipsum_dolor_sit_amet_huJ3Rm4.pdf','2020-04-24 08:28:00'),(8,43,'files/Lorem_ipsum_dolor_sit_amet_JwY6cbz.pdf','2020-04-24 11:49:33'),(9,43,'files/test-document_XJ7mA2K.pdf','2020-04-25 02:31:59'),(11,31,'files/Lorem_ipsum_dolor_sit_amet_jrsYuMc.pdf','2020-04-22 03:56:27'),(19,31,'files/Lorem_ipsum_dolor_sit_amet_az8V40p.pdf','2020-05-04 08:44:00'),(20,31,'files/test-document_uW1vT4q.docx','2020-05-04 08:47:00'),(28,31,'files/Lorem_ipsum_dolor_sit_amet_9ffO99f.docx','2020-05-05 05:42:00');
/*!40000 ALTER TABLE `task_attach_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasklist_semester`
--

DROP TABLE IF EXISTS `tasklist_semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasklist_semester` (
  `semester_id` int(11) NOT NULL AUTO_INCREMENT,
  `semester` varchar(17) NOT NULL,
  `start_Date` datetime(6) NOT NULL,
  PRIMARY KEY (`semester_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasklist_semester`
--

LOCK TABLES `tasklist_semester` WRITE;
/*!40000 ALTER TABLE `tasklist_semester` DISABLE KEYS */;
INSERT INTO `tasklist_semester` VALUES (1,'Semester 2','2020-01-12 16:00:00.000000'),(2,'Semester 1','2019-08-11 16:00:00.000000');
/*!40000 ALTER TABLE `tasklist_semester` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-07 22:29:04
