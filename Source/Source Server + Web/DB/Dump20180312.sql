CREATE DATABASE  IF NOT EXISTS `dsd` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `dsd`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: dsd
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `tree_id` int(11) DEFAULT NULL,
  `volume` double DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `sdasd_idx` (`staff_id`),
  KEY `ssss_idx` (`tree_id`),
  CONSTRAINT `sdasd` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ssss` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`tree_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_code` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `staff_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `staff_dob` date DEFAULT NULL,
  `staff_phone` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `staff_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `staff_role` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `staff_state` int(11) DEFAULT '1',
  `username` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'dasd','asdas','1996-10-09','2051654651','sdfghfjjgds','64564',0,'123','123');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree`
--

DROP TABLE IF EXISTS `tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree` (
  `tree_id` int(11) NOT NULL AUTO_INCREMENT,
  `tree_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tree_type` int(11) DEFAULT NULL,
  `current_water` double DEFAULT NULL,
  `current_state` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `x` double DEFAULT NULL,
  `y` double DEFAULT NULL,
  `tree_state` int(11) DEFAULT '1',
  PRIMARY KEY (`tree_id`),
  KEY `key1_idx` (`tree_type`),
  CONSTRAINT `key1` FOREIGN KEY (`tree_type`) REFERENCES `tree_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,'C9_301',1,0.5,'NORMAL',1,87,1),(2,'C1_111',2,0.5,'NORMAL',3,45,1),(3,'C3_333',3,0.5,'NORMAL',4,75,1),(4,'C9_456',4,0.5,'NORMAL',6,63,1);
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_type`
--

DROP TABLE IF EXISTS `tree_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `standard_temperature` double DEFAULT NULL,
  `standard_humidity` double DEFAULT NULL,
  `standart_water` double DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_type`
--

LOCK TABLES `tree_type` WRITE;
/*!40000 ALTER TABLE `tree_type` DISABLE KEYS */;
INSERT INTO `tree_type` VALUES (1,'Sấu',25,80,0.5),(2,'Bàng',25,80,0.5),(3,'Phượng',25,80,0.5),(4,'Xà cừ',25,80,0.5);
/*!40000 ALTER TABLE `tree_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `water_station`
--

DROP TABLE IF EXISTS `water_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `water_station` (
  `water_id` int(11) NOT NULL AUTO_INCREMENT,
  `water_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `water_location` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `x` double DEFAULT NULL,
  `y` double DEFAULT NULL,
  PRIMARY KEY (`water_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `water_station`
--

LOCK TABLES `water_station` WRITE;
/*!40000 ALTER TABLE `water_station` DISABLE KEYS */;
/*!40000 ALTER TABLE `water_station` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_history`
--

DROP TABLE IF EXISTS `work_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `shift` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `llll_idx` (`staff_id`),
  CONSTRAINT `llll` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_history`
--

LOCK TABLES `work_history` WRITE;
/*!40000 ALTER TABLE `work_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-12 22:38:10
