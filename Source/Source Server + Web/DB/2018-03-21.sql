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
-- Table structure for table `history_detail`
--

DROP TABLE IF EXISTS `history_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tree_id` int(11) DEFAULT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `volume` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ssss_idx` (`tree_id`),
  KEY `ssssss_idx` (`staff_id`),
  CONSTRAINT `ssss` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`tree_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ssssss` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_detail`
--

LOCK TABLES `history_detail` WRITE;
/*!40000 ALTER TABLE `history_detail` DISABLE KEYS */;
INSERT INTO `history_detail` VALUES (1,1,1,'2018-03-20 22:46:04',1),(2,1,1,'2018-03-20 22:46:25',1),(3,1,1,'2018-03-20 21:46:28',1),(4,1,1,'2018-03-20 20:46:28',1),(5,1,1,'2018-03-20 11:46:29',1),(6,1,1,'2018-03-20 12:46:29',1),(7,1,1,'2018-03-20 14:46:35',1),(8,1,1,'2018-03-20 13:46:36',1),(9,1,1,'2018-03-20 14:46:37',1),(10,1,1,'2018-03-20 15:46:38',1),(11,1,1,'2018-03-20 16:46:38',1),(12,1,1,'2018-03-20 10:46:39',1),(13,3,2,'2018-03-20 22:46:51',1),(14,3,2,'2018-03-20 22:46:52',1),(15,3,2,'2018-03-20 22:46:53',1),(16,3,2,'2018-03-20 22:46:54',1),(17,3,2,'2018-03-20 22:46:56',1),(18,3,2,'2018-03-20 22:46:56',1),(19,3,2,'2018-03-20 22:46:57',1),(20,3,2,'2018-03-20 22:46:58',1),(21,3,2,'2018-03-20 22:46:59',1),(22,3,2,'2018-03-20 22:46:59',1),(23,3,2,'2018-03-20 22:47:00',1),(24,3,2,'2018-03-20 22:47:01',1),(25,3,2,'2018-03-20 22:47:01',1),(26,1,2,'2018-03-20 22:49:07',1);
/*!40000 ALTER TABLE `history_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor`
--

DROP TABLE IF EXISTS `sensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensor` (
  `sensor_id` int(11) NOT NULL AUTO_INCREMENT,
  `sensor_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sensor_detail` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `current_tree_id` int(11) DEFAULT NULL,
  `sensor_state` int(11) DEFAULT '1',
  PRIMARY KEY (`sensor_id`),
  KEY `aaaaaaa_idx` (`current_tree_id`),
  CONSTRAINT `aaaaaaa` FOREIGN KEY (`current_tree_id`) REFERENCES `tree` (`tree_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor`
--

LOCK TABLES `sensor` WRITE;
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;
INSERT INTO `sensor` VALUES (1,'SS_C9_202','This is a sensor which has humity, temorature',2,0),(2,'SS_C9_101','This is the sensor which has humity, temorature',4,1),(3,'SS_C9_101','This is the sensor which has humity, temorature',5,1),(4,'SS_C9_101','This is the sensor which has humity, temorature',1,1),(5,'SS_C9_202','This is a sensor which has humity, temorature',3,1),(6,'SS_C9_202','This is a sensor which has humity, temorature',6,1);
/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;
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
  `x` int(11) DEFAULT '0',
  `y` int(11) DEFAULT '0',
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (0,'TNV','Tình nguyện viên','2000-02-02','0','Every Where','TNV',1,'TNV','TNV',0,0),(1,'QL_01_LinhPH','Phạm Hải Linh','1996-11-30','01667645238','Bạch Mai - Hà Nội','MANAGER',1,'linhph','linhph',0,0),(2,'NV_01_TUNGTS','Trần Sơn Tùng','1996-12-09','01685423584','Đại La - HBT - Hà Nội','STAFF',1,'tungts','tungts',0,0),(3,'NV_02_THANHNV','Nguyễn Văn Thanh','1996-06-03','01689745875','Đại La - HBT - Hà Nội','STAFF',1,'thanhnv','thanhnv',0,0),(4,'NV_03_DUCNV','Nguyễn Văn Đức','1996-02-04','09452425328','Tôn Thất Tùng - HN','STAFF',1,'ducnv','ducnv',0,0);
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
  `is_blocking` int(11) DEFAULT '0',
  PRIMARY KEY (`tree_id`),
  KEY `key1_idx` (`tree_type`),
  CONSTRAINT `key1` FOREIGN KEY (`tree_type`) REFERENCES `tree_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree`
--

LOCK TABLES `tree` WRITE;
/*!40000 ALTER TABLE `tree` DISABLE KEYS */;
INSERT INTO `tree` VALUES (1,'C9_301',1,-12.5,'NORMAL',1,10,1,0),(2,'C9_30_2',3,1.5,'DANGEROUS',15,20,1,0),(3,'444444',1,-12.5,'NORMAL',17,46,1,0),(4,'444444',1,0.5,'NORMAL',35,22,1,0),(5,'C9_30_9',2,2.5,'NORMAL',37,20,1,0),(6,'C9_301',1,0.5,'NORMAL',14,24,1,0),(7,'C9_30_2',3,1.5,'DANGEROUS',6,43,1,0),(8,'444444',1,0.5,'NORMAL',27,12,1,0),(9,'444444',1,0.5,'NORMAL',11,36,1,0),(10,'C9_30_9',2,2.5,'NORMAL',48,40,1,0),(11,'C9_30_9',2,2.5,'NORMAL',4,7,1,0),(12,'C9_301',1,0.5,'NORMAL',11,15,1,0),(13,'C9_30_2',3,1.5,'DANGEROUS',6,6,1,0),(14,'444444',1,0.5,'NORMAL',12,12,1,0),(15,'444444',1,0.5,'NORMAL',19,3,1,0),(16,'C9_30_9',2,2.5,'NORMAL',22,11,1,0);
/*!40000 ALTER TABLE `tree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tree_state`
--

DROP TABLE IF EXISTS `tree_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tree_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tree_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `tree_state` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tree_description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `comfirmed` int(11) DEFAULT '0',
  `tree_state_image` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `asss_idx` (`tree_id`),
  CONSTRAINT `asss` FOREIGN KEY (`tree_id`) REFERENCES `tree` (`tree_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tree_state`
--

LOCK TABLES `tree_state` WRITE;
/*!40000 ALTER TABLE `tree_state` DISABLE KEYS */;
INSERT INTO `tree_state` VALUES (1,1,'2018-03-14 13:46:48','DEAD','Chet CMNR ',0,NULL),(2,1,'2018-03-14 16:23:29','asdasd','asdas',0,'http://localhost:3000/images/uploads/1521019409806.pdf'),(3,1,'2018-03-14 16:25:06','DM TUNG','Khong co gi ca',0,'http://localhost:3000/images/uploads/1521019506839.pdf');
/*!40000 ALTER TABLE `tree_state` ENABLE KEYS */;
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
  `standard_water` double DEFAULT NULL,
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
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT '1',
  PRIMARY KEY (`water_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `water_station`
--

LOCK TABLES `water_station` WRITE;
/*!40000 ALTER TABLE `water_station` DISABLE KEYS */;
INSERT INTO `water_station` VALUES (1,'WC_D35_F1','WC tầng 1 tòa nhà D35',0,49,1),(2,'WC_D35_F1','WC tần 1 tòa nhà D3-5',0,0,1),(3,'WC_D35_F1','WC tầng 1 tòa nhà D3-----5',49,49,1),(4,'WC_D35_F1','WC tầng 1 tòa nhà D3-----5',12,40,1),(5,'WC_D35_F1','WC tầng 1 tòa nhà D3-----5',49,0,1),(6,'WC_D35_F1','WC tầng 1 tòa nhà D3-----5',26,30,1);
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

--
-- Table structure for table `work_register`
--

DROP TABLE IF EXISTS `work_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_register` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `register_time` datetime DEFAULT NULL,
  `state` varchar(45) COLLATE utf8_unicode_ci DEFAULT 'WAIT',
  PRIMARY KEY (`id`),
  KEY `lj_idx` (`staff_id`),
  CONSTRAINT `lj` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_register`
--

LOCK TABLES `work_register` WRITE;
/*!40000 ALTER TABLE `work_register` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-21  0:46:28
