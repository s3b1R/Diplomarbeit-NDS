-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: resourceplanner
-- ------------------------------------------------------
-- Server version	5.7.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `capacity`
--

DROP TABLE IF EXISTS `capacity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `capacity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `capa` decimal(2,1) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9e7f95067985f981082a564f73c` (`userId`),
  CONSTRAINT `FK_9e7f95067985f981082a564f73c` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capacity`
--

LOCK TABLES `capacity` WRITE;
/*!40000 ALTER TABLE `capacity` DISABLE KEYS */;
INSERT INTO `capacity` VALUES (1,0.0,1,'2021-03-14'),(2,0.0,2,'2021-03-13'),(3,1.0,2,'2021-03-16'),(4,0.0,4,'2021-03-14'),(5,0.3,1,'2021-03-03'),(6,0.8,7,'2021-03-01'),(7,0.0,4,'2021-03-08'),(8,1.0,3,'2021-03-02'),(9,1.0,2,'2021-03-02'),(10,0.0,1,'2021-04-04'),(11,0.0,1,'2021-03-07'),(13,0.3,1,'2021-03-08'),(14,0.8,2,'2021-04-02'),(15,1.0,3,'2021-04-05'),(16,1.0,3,'2021-03-10'),(17,0.0,3,'2021-03-06'),(18,0.3,1,'2021-03-17'),(19,0.3,1,'2021-03-19'),(20,0.3,1,'2021-03-10'),(21,0.8,2,'2021-03-04'),(22,0.3,1,'2021-03-22'),(23,1.0,3,'2021-03-05'),(24,0.7,4,'2021-03-26'),(25,0.0,3,'2021-03-14'),(26,0.4,3,'2021-03-15'),(27,0.0,2,'2021-03-06'),(28,0.3,1,'2021-03-02'),(29,0.3,1,'2021-03-05'),(30,0.3,1,'2021-03-12'),(31,0.0,4,'2021-04-04'),(32,0.0,1,'2021-04-10'),(33,1.0,4,'2021-04-01'),(34,0.8,2,'2021-04-21'),(35,0.2,1,'2021-02-02'),(36,0.3,2,'2021-02-01'),(37,0.4,2,'2021-02-02'),(38,0.5,3,'2021-02-01'),(39,0.6,3,'2021-02-02'),(40,0.7,4,'2021-02-01'),(41,0.8,4,'2021-02-02'),(42,0.9,7,'2021-02-01'),(43,1.0,7,'2021-02-02'),(44,0.2,1,'2021-02-01'),(45,0.2,1,'2021-02-10'),(46,0.0,1,'2021-03-06'),(47,0.3,1,'2021-03-01'),(51,0.2,4,'2021-03-01'),(52,0.2,4,'2021-03-02'),(53,0.2,4,'2021-03-03'),(54,0.2,4,'2021-03-04'),(55,0.2,4,'2021-03-05'),(56,1.0,3,'2021-03-09'),(57,1.0,3,'2021-03-08'),(58,1.0,3,'2021-03-11'),(59,1.0,3,'2021-03-12'),(60,1.0,3,'2021-03-01'),(61,1.0,3,'2021-03-04'),(62,1.0,3,'2021-03-03'),(63,1.0,2,'2021-03-01'),(64,0.5,2,'2021-03-03'),(65,0.5,7,'2021-03-22'),(66,0.5,7,'2021-03-23'),(67,0.5,7,'2021-03-24'),(68,0.5,7,'2021-03-25'),(69,0.5,7,'2021-03-26'),(70,0.5,7,'2021-03-30'),(71,0.5,7,'2021-03-31'),(72,0.5,7,'2021-03-29'),(73,0.4,1,'2021-04-01'),(74,0.4,1,'2021-04-05'),(75,0.4,1,'2021-04-09'),(76,0.4,1,'2021-04-13'),(77,0.4,1,'2021-04-02'),(78,0.4,1,'2021-04-07'),(79,0.4,1,'2021-04-12'),(80,0.4,1,'2021-04-06'),(81,0.4,1,'2021-04-16'),(82,0.4,1,'2021-04-19'),(83,0.4,1,'2021-04-14'),(84,0.4,1,'2021-04-15'),(85,0.4,1,'2021-04-20'),(86,0.4,1,'2021-04-23'),(87,0.4,1,'2021-04-26'),(88,0.4,1,'2021-04-21'),(89,0.4,1,'2021-04-29'),(90,0.4,1,'2021-04-28'),(91,0.4,1,'2021-04-30'),(92,0.4,1,'2021-04-08'),(93,0.4,1,'2021-04-22'),(94,0.4,1,'2021-04-27'),(95,0.0,2,'2021-04-01'),(96,0.5,2,'2021-04-08'),(97,0.5,2,'2021-04-07'),(98,0.5,2,'2021-04-06'),(99,0.5,2,'2021-04-09'),(100,0.5,2,'2021-04-05'),(101,0.0,2,'2021-04-12'),(102,0.0,2,'2021-04-13'),(103,0.0,2,'2021-04-14'),(104,0.0,2,'2021-04-15'),(105,0.0,2,'2021-04-16'),(106,0.8,2,'2021-04-19'),(107,0.8,2,'2021-04-20'),(108,0.8,2,'2021-04-22'),(109,0.8,2,'2021-04-23'),(110,0.8,2,'2021-04-26'),(111,0.8,2,'2021-04-27'),(112,0.8,2,'2021-04-28'),(113,0.8,2,'2021-04-29'),(114,0.8,2,'2021-04-30'),(115,1.0,3,'2021-04-01'),(116,1.0,3,'2021-04-15'),(117,1.0,3,'2021-04-02'),(118,1.0,3,'2021-04-16'),(119,1.0,3,'2021-04-06'),(120,1.0,3,'2021-04-19'),(121,1.0,3,'2021-04-07'),(122,1.0,3,'2021-04-20'),(123,1.0,3,'2021-04-21'),(124,1.0,3,'2021-04-12'),(125,1.0,3,'2021-04-22'),(126,1.0,3,'2021-04-09'),(127,1.0,3,'2021-04-23'),(128,1.0,3,'2021-04-08'),(129,1.0,3,'2021-04-26'),(130,1.0,3,'2021-04-27'),(131,1.0,3,'2021-04-29'),(132,1.0,3,'2021-04-28'),(133,1.0,3,'2021-04-13'),(134,1.0,3,'2021-04-14'),(135,1.0,3,'2021-04-30'),(136,0.3,1,'2021-03-15'),(137,0.3,1,'2021-03-31'),(138,0.3,1,'2021-03-16'),(139,0.3,1,'2021-03-23'),(140,0.3,1,'2021-03-09'),(141,0.3,1,'2021-03-25'),(142,0.3,1,'2021-03-26'),(143,0.3,1,'2021-03-11'),(144,0.3,1,'2021-03-29'),(145,0.3,1,'2021-03-18'),(146,0.3,1,'2021-03-04'),(147,0.3,1,'2021-03-30'),(148,0.3,1,'2021-03-24'),(149,0.1,1,'2021-01-01'),(150,0.1,1,'2021-01-08'),(151,0.1,1,'2021-01-04'),(152,0.1,1,'2021-01-05'),(153,0.1,1,'2021-01-07'),(154,0.1,1,'2021-01-12'),(155,0.1,1,'2021-01-14'),(156,0.1,1,'2021-01-13'),(157,0.1,1,'2021-01-06'),(158,0.1,1,'2021-01-11'),(159,0.1,1,'2021-01-15'),(160,0.1,1,'2021-01-18'),(161,0.1,1,'2021-01-19'),(162,0.1,1,'2021-01-20'),(163,0.1,1,'2021-01-21'),(164,0.1,1,'2021-01-22'),(165,0.1,1,'2021-01-25'),(166,0.1,1,'2021-01-27'),(167,0.1,1,'2021-01-26'),(168,0.1,1,'2021-01-28'),(169,0.1,1,'2021-01-29'),(170,0.2,1,'2021-02-03'),(171,0.2,1,'2021-02-11'),(172,0.2,1,'2021-02-04'),(173,0.2,1,'2021-02-05'),(174,0.2,1,'2021-02-08'),(175,0.2,1,'2021-02-09'),(176,0.2,1,'2021-02-12'),(177,0.2,1,'2021-02-15'),(178,0.2,1,'2021-02-16'),(179,0.2,1,'2021-02-17'),(180,0.2,1,'2021-02-19'),(181,0.2,1,'2021-02-18'),(182,0.2,1,'2021-02-22'),(183,0.2,1,'2021-02-23'),(184,0.2,1,'2021-02-25'),(185,0.2,1,'2021-02-24'),(186,0.2,1,'2021-02-26'),(187,0.5,1,'2021-05-03'),(188,0.5,1,'2021-05-04'),(189,0.5,1,'2021-05-10'),(190,0.5,1,'2021-05-05'),(191,0.5,1,'2021-05-07'),(192,0.5,1,'2021-05-06'),(193,0.5,1,'2021-05-11'),(194,0.5,1,'2021-05-12'),(195,0.5,1,'2021-05-14'),(196,0.5,1,'2021-05-13'),(197,0.5,1,'2021-05-17'),(198,0.5,1,'2021-05-18'),(199,0.5,1,'2021-05-19'),(200,0.5,1,'2021-05-20'),(201,0.5,1,'2021-05-21'),(202,0.5,1,'2021-05-24'),(203,0.5,1,'2021-05-25'),(204,0.5,1,'2021-05-26'),(205,0.5,1,'2021-05-27'),(206,0.5,1,'2021-05-28'),(207,0.5,1,'2021-05-31'),(208,0.6,1,'2021-06-10'),(209,0.6,1,'2021-06-01'),(210,0.6,1,'2021-06-07'),(211,0.6,1,'2021-06-03'),(212,0.6,1,'2021-06-04'),(213,0.6,1,'2021-06-02'),(214,0.6,1,'2021-06-08'),(215,0.6,1,'2021-06-11'),(216,0.6,1,'2021-06-09'),(217,0.6,1,'2021-06-14'),(218,0.6,1,'2021-06-15'),(219,0.6,1,'2021-06-16'),(220,0.6,1,'2021-06-17'),(221,0.6,1,'2021-06-18'),(222,0.6,1,'2021-06-21'),(223,0.6,1,'2021-06-22'),(224,0.6,1,'2021-06-23'),(225,0.6,1,'2021-06-25'),(226,0.6,1,'2021-06-24'),(227,0.6,1,'2021-06-28'),(228,0.6,1,'2021-06-30'),(229,0.6,1,'2021-06-29'),(230,1.0,4,'2021-04-27'),(231,1.0,4,'2021-04-26'),(232,1.0,4,'2021-04-29'),(233,1.0,4,'2021-04-30'),(234,1.0,4,'2021-04-28'),(235,0.8,2,'2021-05-31'),(236,0.8,2,'2021-05-03'),(237,0.8,2,'2021-05-12'),(238,0.8,2,'2021-05-28'),(239,0.8,2,'2021-05-05'),(240,0.8,2,'2021-05-17'),(241,0.8,2,'2021-05-04'),(242,0.8,2,'2021-05-26'),(243,0.8,2,'2021-05-13'),(244,0.8,2,'2021-05-25'),(245,0.8,2,'2021-05-06'),(246,0.8,2,'2021-05-24'),(247,0.8,2,'2021-05-07'),(248,0.8,2,'2021-05-27'),(249,0.8,2,'2021-05-21'),(250,0.8,2,'2021-05-10'),(251,0.8,2,'2021-05-19'),(252,0.8,2,'2021-05-20'),(253,0.8,2,'2021-05-18'),(254,0.8,2,'2021-05-11'),(255,0.8,2,'2021-05-14');
/*!40000 ALTER TABLE `capacity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pi`
--

DROP TABLE IF EXISTS `pi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `piStart` date NOT NULL,
  `piEnd` date NOT NULL,
  `sprintCounts` int(11) NOT NULL,
  `sprint1Start` date DEFAULT NULL,
  `sprint1End` date DEFAULT NULL,
  `sprint2Start` date DEFAULT NULL,
  `sprint2End` date DEFAULT NULL,
  `sprint3Start` date DEFAULT NULL,
  `sprint3End` date DEFAULT NULL,
  `sprint4Start` date DEFAULT NULL,
  `sprint4End` date DEFAULT NULL,
  `sprint5Start` date DEFAULT NULL,
  `sprint5End` date DEFAULT NULL,
  `sprint6Start` date DEFAULT NULL,
  `sprint6End` date DEFAULT NULL,
  `piShortname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pi`
--

LOCK TABLES `pi` WRITE;
/*!40000 ALTER TABLE `pi` DISABLE KEYS */;
INSERT INTO `pi` VALUES (9,'2021-01-06','2021-03-31',6,'2021-01-06','2021-01-19','2021-01-20','2021-02-02','2021-02-03','2021-02-16','2021-02-17','2021-03-02','2021-03-03','2021-03-16','2021-03-17','2021-03-31','2103'),(10,'2021-04-01','2021-06-09',5,'2021-04-01','2021-04-13','2021-04-14','2021-04-27','2021-04-28','2021-05-11','2021-05-12','2021-05-25','2021-05-26','2021-06-09',NULL,NULL,'2106');
/*!40000 ALTER TABLE `pi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jan Troeltsch'),(2,'Sebastian Rüegg'),(3,'Katja Sauerwein'),(4,'Antonio Notarnicola'),(7,'Greg Müller');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workload`
--

DROP TABLE IF EXISTS `workload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assignee` varchar(255) NOT NULL,
  `sprint` varchar(255) NOT NULL,
  `storyPoints` decimal(2,1) NOT NULL,
  `project` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workload`
--

LOCK TABLES `workload` WRITE;
/*!40000 ALTER TABLE `workload` DISABLE KEYS */;
INSERT INTO `workload` VALUES (1,'Franz Müller','',0.0,'Go4 100 Mio'),(2,'Manuel Schär','Dagobert 2103-5 (17.-31.3.)',0.0,'Go4 100 Mio'),(3,'Clint Reichenbach','',3.0,'Go4 100 Mio'),(4,'Franz Müller','',0.0,'Go4 100 Mio'),(5,'Clint Reichenbach','',0.5,'Go4 100 Mio'),(6,'Franz Müller','',0.0,'Go4 100 Mio'),(7,'Tatiana Kielburger','Dagobert 2103-5 (17.-31.3.)',1.0,'Go4 100 Mio'),(8,'Sebastian Rüegg','Dagobert 2103-5 (17.-31.3.)',2.0,'Go4 100 Mio'),(9,'Clint Reichenbach','',3.0,'Go4 100 Mio'),(10,'Franz Müller','',0.0,'Go4 100 Mio'),(11,'Jan Troeltsch','Dagobert 2103-5 (17.-31.3.)',1.0,'Go4 100 Mio'),(12,'Jan Troeltsch','Dagobert 2103-5 (17.-31.3.)',0.5,'Go4 100 Mio'),(13,'Jan Troeltsch','Dagobert 2101-3 (25.11.-8.12.)',0.5,'Go4 100 Mio'),(14,'Jan Troeltsch','Dagobert 2101-3 (25.11.-8.12.)',2.0,'Go4 100 Mio'),(15,'Clint Reichenbach','',3.0,'Go4 100 Mio'),(16,'Clint Reichenbach','',1.0,'Go4 100 Mio'),(17,'Jan Troeltsch','Dagobert 2101-3 (25.11.-8.12.)',0.5,'Go4 100 Mio'),(18,'Clint Reichenbach','',3.0,'Go4 100 Mio'),(19,'Jan Troeltsch','',2.0,'Go4 100 Mio'),(20,'Jan Troeltsch','Dagobert 2101-3 (25.11.-8.12.)',2.0,'Go4 100 Mio'),(21,'Jan Troeltsch','',0.5,'Go4 100 Mio'),(22,'Clint Reichenbach','',1.0,'Go4 100 Mio'),(23,'Franz Müller','',0.0,'Go4 100 Mio'),(24,'Jan Troeltsch','',2.0,'Go4 100 Mio'),(25,'Jan Troeltsch','Dagobert 2010-5 (14.-28.10.)',0.0,'Go4 100 Mio'),(26,'Jan Troeltsch','',0.5,'Go4 100 Mio'),(27,'Franz Müller','',0.0,'Go4 100 Mio'),(28,'Solveig Huber','',1.0,'Go4 100 Mio'),(29,'Solveig Huber','',2.0,'Go4 100 Mio'),(30,'Solveig Huber','',2.0,'Go4 100 Mio'),(31,'Solveig Huber','',2.0,'Go4 100 Mio'),(32,'Solveig Huber','',2.0,'Go4 100 Mio'),(33,'Solveig Huber','',0.5,'Go4 100 Mio'),(34,'Jan Troeltsch','',0.5,'Go4 100 Mio'),(35,'Jan Troeltsch','',0.5,'Go4 100 Mio'),(36,'Roman Tschalér','Smila 2001-2 (27.11-10.12.)',1.0,'Go4 100 Mio'),(37,'Roman Tschalér','Smila 2001-1 (13.-26.11.)',1.0,'Go4 100 Mio'),(38,'Jan Troeltsch','',0.5,'Go4 100 Mio'),(39,'Jan Troeltsch','',2.0,'Go4 100 Mio'),(40,'Jan Troeltsch','',1.0,'Go4 100 Mio'),(41,'Unassigned','',0.0,'Go4 100 Mio'),(42,'Jan Troeltsch','',1.0,'Go4 100 Mio'),(43,'Jan Troeltsch','',1.0,'Go4 100 Mio'),(44,'Michel Lapiccirella','MacGyver 1906-5 (29.5.-10.6.)',0.0,'Go4 100 Mio'),(45,'Michel Lapiccirella','MacGyver 1906-5 (29.5.-10.6.)',0.0,'Go4 100 Mio'),(46,'Unassigned','',0.0,'Go4 100 Mio'),(47,'Jan Troeltsch','',1.0,'Go4 100 Mio'),(48,'Michel Lapiccirella','',0.0,'Go4 100 Mio'),(49,'Unassigned','',0.0,'Go4 100 Mio'),(50,'Marcel Curien','',1.0,'Go4 100 Mio'),(51,'Marcel Curien','',3.0,'Go4 100 Mio'),(52,'Marcel Curien','',3.0,'Go4 100 Mio'),(53,'Marcel Curien','',3.0,'Go4 100 Mio'),(54,'Franz Müller','',0.0,'Go4 100 Mio'),(55,'Franz Müller','',0.0,'Go4 100 Mio');
/*!40000 ALTER TABLE `workload` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-18 12:28:40