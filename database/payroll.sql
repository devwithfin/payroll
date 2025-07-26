-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 26, 2025 at 09:41 AM
-- Server version: 5.7.33
-- PHP Version: 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `payroll`
--

-- --------------------------------------------------------

--
-- Table structure for table `allowances`
--

CREATE TABLE `allowances` (
  `allowance_id` int(11) NOT NULL,
  `allowance_name` varchar(100) NOT NULL,
  `is_fixed` tinyint(1) DEFAULT '0',
  `default_amount` decimal(15,2) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `allowances`
--

INSERT INTO `allowances` (`allowance_id`, `allowance_name`, `is_fixed`, `default_amount`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Tunjangan Makan', 1, 1000000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 'Tunjangan Transport', 1, 1000000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 'Tunjangan Jabatan', 1, NULL, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `attendance_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `check_in_time` time DEFAULT NULL,
  `check_out_time` time DEFAULT NULL,
  `status` enum('Present','Sick','Leave','Absent') NOT NULL DEFAULT 'Present',
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`attendance_id`, `employee_id`, `attendance_date`, `check_in_time`, `check_out_time`, `status`, `notes`) VALUES
(1, 1, '2025-06-26', '08:03:13', '17:15:31', 'Present', NULL),
(2, 2, '2025-06-26', '08:00:23', '17:15:31', 'Present', NULL),
(3, 3, '2025-06-26', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(4, 4, '2025-06-26', '08:00:08', '17:08:58', 'Present', NULL),
(5, 5, '2025-06-26', '08:03:06', '17:15:50', 'Present', NULL),
(6, 6, '2025-06-26', '08:03:19', '17:09:27', 'Present', NULL),
(7, 7, '2025-06-26', '08:00:09', '17:01:38', 'Present', NULL),
(8, 8, '2025-06-26', '08:05:15', '17:04:19', 'Present', NULL),
(9, 9, '2025-06-26', '08:05:45', '17:09:49', 'Present', NULL),
(10, 10, '2025-06-26', '08:05:36', '17:03:32', 'Present', NULL),
(11, 11, '2025-06-26', '08:10:42', '17:01:40', 'Present', NULL),
(12, 12, '2025-06-26', NULL, NULL, 'Leave', 'Izin pribadi'),
(13, 13, '2025-06-26', '08:13:28', '17:12:09', 'Present', NULL),
(14, 14, '2025-06-26', '08:07:11', '17:13:44', 'Present', NULL),
(15, 15, '2025-06-26', '08:06:10', '17:07:19', 'Present', NULL),
(16, 1, '2025-06-27', '08:03:11', '17:13:20', 'Present', NULL),
(17, 2, '2025-06-27', '08:11:08', '17:09:49', 'Present', NULL),
(18, 3, '2025-06-27', '08:02:14', '17:01:51', 'Present', NULL),
(19, 4, '2025-06-27', '08:03:18', '17:15:47', 'Present', NULL),
(20, 5, '2025-06-27', '08:11:44', '17:10:23', 'Present', NULL),
(21, 6, '2025-06-27', '08:06:35', '17:09:57', 'Present', NULL),
(22, 7, '2025-06-27', NULL, NULL, 'Sick', 'Sakit kepala'),
(23, 8, '2025-06-27', NULL, NULL, 'Sick', 'Sakit kepala'),
(24, 9, '2025-06-27', '08:14:50', '17:06:15', 'Present', NULL),
(25, 10, '2025-06-27', '08:13:17', '17:09:35', 'Present', NULL),
(26, 11, '2025-06-27', '08:13:03', '17:09:04', 'Present', NULL),
(27, 12, '2025-06-27', '08:11:23', '17:08:38', 'Present', NULL),
(28, 13, '2025-06-27', NULL, NULL, 'Leave', 'Izin pribadi'),
(29, 14, '2025-06-27', NULL, NULL, 'Sick', 'Sakit kepala'),
(30, 15, '2025-06-27', NULL, NULL, 'Leave', 'Izin pribadi'),
(31, 1, '2025-06-30', NULL, NULL, 'Leave', 'Izin pribadi'),
(32, 2, '2025-06-30', '08:14:24', '17:12:43', 'Present', NULL),
(33, 3, '2025-06-30', '08:11:44', '17:12:12', 'Present', NULL),
(34, 4, '2025-06-30', '08:10:33', '17:09:45', 'Present', NULL),
(35, 5, '2025-06-30', '08:14:40', '17:00:23', 'Present', NULL),
(36, 6, '2025-06-30', '08:03:46', '17:05:42', 'Present', NULL),
(37, 7, '2025-06-30', '08:07:32', '17:02:46', 'Present', NULL),
(38, 8, '2025-06-30', NULL, NULL, 'Sick', 'Sakit kepala'),
(39, 9, '2025-06-30', '08:01:12', '17:04:38', 'Present', NULL),
(40, 10, '2025-06-30', NULL, NULL, 'Leave', 'Izin pribadi'),
(41, 11, '2025-06-30', '08:08:36', '17:01:50', 'Present', NULL),
(42, 12, '2025-06-30', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(43, 13, '2025-06-30', '08:06:16', '17:14:50', 'Present', NULL),
(44, 14, '2025-06-30', '08:07:34', '17:10:59', 'Present', NULL),
(45, 15, '2025-06-30', '08:15:51', '17:02:04', 'Present', NULL),
(46, 1, '2025-07-01', '08:03:29', '17:15:40', 'Present', NULL),
(47, 2, '2025-07-01', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(48, 3, '2025-07-01', '08:04:09', '17:02:25', 'Present', NULL),
(49, 4, '2025-07-01', '08:15:49', '17:02:59', 'Present', NULL),
(50, 5, '2025-07-01', '08:12:10', '17:00:53', 'Present', NULL),
(51, 6, '2025-07-01', '08:03:41', '17:14:08', 'Present', NULL),
(52, 7, '2025-07-01', '08:06:33', '17:00:00', 'Present', NULL),
(53, 8, '2025-07-01', '08:06:44', '17:07:16', 'Present', NULL),
(54, 9, '2025-07-01', '08:06:01', '17:11:46', 'Present', NULL),
(55, 10, '2025-07-01', '08:06:17', '17:09:45', 'Present', NULL),
(56, 11, '2025-07-01', '08:12:38', '17:15:20', 'Present', NULL),
(57, 12, '2025-07-01', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(58, 13, '2025-07-01', '08:11:56', '17:05:38', 'Present', NULL),
(59, 14, '2025-07-01', NULL, NULL, 'Sick', 'Sakit kepala'),
(60, 15, '2025-07-01', '08:09:34', '17:00:44', 'Present', NULL),
(61, 1, '2025-07-02', NULL, NULL, 'Leave', 'Izin pribadi'),
(62, 2, '2025-07-02', '08:11:59', '17:02:02', 'Present', NULL),
(63, 3, '2025-07-02', NULL, NULL, 'Leave', 'Izin pribadi'),
(64, 4, '2025-07-02', '08:11:43', '17:06:51', 'Present', NULL),
(65, 5, '2025-07-02', '08:15:12', '17:00:31', 'Present', NULL),
(66, 6, '2025-07-02', NULL, NULL, 'Sick', 'Sakit kepala'),
(67, 7, '2025-07-02', NULL, NULL, 'Leave', 'Izin pribadi'),
(68, 8, '2025-07-02', '08:09:06', '17:12:56', 'Present', NULL),
(69, 9, '2025-07-02', '08:03:33', '17:15:55', 'Present', NULL),
(70, 10, '2025-07-02', '08:07:53', '17:03:52', 'Present', NULL),
(71, 11, '2025-07-02', '08:09:31', '17:04:20', 'Present', NULL),
(72, 12, '2025-07-02', '08:12:35', '17:15:06', 'Present', NULL),
(73, 13, '2025-07-02', '08:13:05', '17:07:45', 'Present', NULL),
(74, 14, '2025-07-02', '08:14:33', '17:02:43', 'Present', NULL),
(75, 15, '2025-07-02', NULL, NULL, 'Sick', 'Sakit kepala'),
(76, 1, '2025-07-03', NULL, NULL, 'Leave', 'Izin pribadi'),
(77, 2, '2025-07-03', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(78, 3, '2025-07-03', '08:14:32', '17:10:27', 'Present', NULL),
(79, 4, '2025-07-03', '08:12:09', '17:01:09', 'Present', NULL),
(80, 5, '2025-07-03', '08:09:17', '17:10:05', 'Present', NULL),
(81, 6, '2025-07-03', '08:15:57', '17:11:45', 'Present', NULL),
(82, 7, '2025-07-03', '08:07:25', '17:00:34', 'Present', NULL),
(83, 8, '2025-07-03', '08:15:31', '17:10:34', 'Present', NULL),
(84, 9, '2025-07-03', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(85, 10, '2025-07-03', '08:03:50', '17:05:30', 'Present', NULL),
(86, 11, '2025-07-03', '08:05:15', '17:05:05', 'Present', NULL),
(87, 12, '2025-07-03', '08:03:10', '17:08:30', 'Present', NULL),
(88, 13, '2025-07-03', '08:09:46', '17:02:12', 'Present', NULL),
(89, 14, '2025-07-03', '08:03:37', '17:05:14', 'Present', NULL),
(90, 15, '2025-07-03', '08:01:33', '17:02:28', 'Present', NULL),
(91, 1, '2025-07-04', '08:07:49', '17:07:24', 'Present', NULL),
(92, 2, '2025-07-04', '08:11:30', '17:01:57', 'Present', NULL),
(93, 3, '2025-07-04', NULL, NULL, 'Leave', 'Izin pribadi'),
(94, 4, '2025-07-04', '08:11:48', '17:13:21', 'Present', NULL),
(95, 5, '2025-07-04', '08:04:05', '17:10:47', 'Present', NULL),
(96, 6, '2025-07-04', '08:05:27', '17:11:43', 'Present', NULL),
(97, 7, '2025-07-04', '08:05:09', '17:06:38', 'Present', NULL),
(98, 8, '2025-07-04', '08:11:48', '17:08:21', 'Present', NULL),
(99, 9, '2025-07-04', '08:11:18', '17:01:03', 'Present', NULL),
(100, 10, '2025-07-04', '08:08:11', '17:13:30', 'Present', NULL),
(101, 11, '2025-07-04', '08:09:09', '17:02:03', 'Present', NULL),
(102, 12, '2025-07-04', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(103, 13, '2025-07-04', '08:04:41', '17:01:14', 'Present', NULL),
(104, 14, '2025-07-04', '08:12:44', '17:04:48', 'Present', NULL),
(105, 15, '2025-07-04', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(106, 1, '2025-07-07', '08:11:28', '17:07:00', 'Present', NULL),
(107, 2, '2025-07-07', '08:00:42', '17:15:47', 'Present', NULL),
(108, 3, '2025-07-07', '08:07:56', '17:14:23', 'Present', NULL),
(109, 4, '2025-07-07', '08:14:42', '17:08:23', 'Present', NULL),
(110, 5, '2025-07-07', '08:00:45', '17:07:24', 'Present', NULL),
(111, 6, '2025-07-07', '08:01:57', '17:05:43', 'Present', NULL),
(112, 7, '2025-07-07', '08:12:49', '17:01:32', 'Present', NULL),
(113, 8, '2025-07-07', NULL, NULL, 'Leave', 'Izin pribadi'),
(114, 9, '2025-07-07', '08:15:43', '17:10:08', 'Present', NULL),
(115, 10, '2025-07-07', '08:13:27', '17:15:18', 'Present', NULL),
(116, 11, '2025-07-07', '08:00:59', '17:01:36', 'Present', NULL),
(117, 12, '2025-07-07', '08:10:05', '17:02:28', 'Present', NULL),
(118, 13, '2025-07-07', NULL, NULL, 'Sick', 'Sakit kepala'),
(119, 14, '2025-07-07', '08:09:15', '17:06:33', 'Present', NULL),
(120, 15, '2025-07-07', '08:03:14', '17:13:46', 'Present', NULL),
(121, 1, '2025-07-08', '08:02:55', '17:03:35', 'Present', NULL),
(122, 2, '2025-07-08', '08:08:34', '17:13:06', 'Present', NULL),
(123, 3, '2025-07-08', '08:12:05', '17:14:46', 'Present', NULL),
(124, 4, '2025-07-08', NULL, NULL, 'Leave', 'Izin pribadi'),
(125, 5, '2025-07-08', '08:14:14', '17:11:02', 'Present', NULL),
(126, 6, '2025-07-08', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(127, 7, '2025-07-08', NULL, NULL, 'Sick', 'Sakit kepala'),
(128, 8, '2025-07-08', NULL, NULL, 'Leave', 'Izin pribadi'),
(129, 9, '2025-07-08', '08:13:21', '17:04:09', 'Present', NULL),
(130, 10, '2025-07-08', NULL, NULL, 'Leave', 'Izin pribadi'),
(131, 11, '2025-07-08', NULL, NULL, 'Leave', 'Izin pribadi'),
(132, 12, '2025-07-08', NULL, NULL, 'Leave', 'Izin pribadi'),
(133, 13, '2025-07-08', NULL, NULL, 'Leave', 'Izin pribadi'),
(134, 14, '2025-07-08', NULL, NULL, 'Leave', 'Izin pribadi'),
(135, 15, '2025-07-08', '08:10:14', '17:08:46', 'Present', NULL),
(136, 1, '2025-07-09', '08:13:42', '17:02:04', 'Present', NULL),
(137, 2, '2025-07-09', '08:07:52', '17:00:34', 'Present', NULL),
(138, 3, '2025-07-09', '08:00:01', '17:10:19', 'Present', NULL),
(139, 4, '2025-07-09', '08:01:16', '17:05:44', 'Present', NULL),
(140, 5, '2025-07-09', '08:04:03', '17:05:22', 'Present', NULL),
(141, 6, '2025-07-09', '08:11:38', '17:15:42', 'Present', NULL),
(142, 7, '2025-07-09', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(143, 8, '2025-07-09', '08:03:14', '17:13:03', 'Present', NULL),
(144, 9, '2025-07-09', '08:03:58', '17:10:36', 'Present', NULL),
(145, 10, '2025-07-09', '08:11:17', '17:08:47', 'Present', NULL),
(146, 11, '2025-07-09', '08:09:18', '17:02:44', 'Present', NULL),
(147, 12, '2025-07-09', '08:05:11', '17:12:43', 'Present', NULL),
(148, 13, '2025-07-09', '08:14:04', '17:10:30', 'Present', NULL),
(149, 14, '2025-07-09', '08:13:56', '17:10:07', 'Present', NULL),
(150, 15, '2025-07-09', '08:00:36', '17:15:53', 'Present', NULL),
(151, 1, '2025-07-10', '08:03:02', '17:02:05', 'Present', NULL),
(152, 2, '2025-07-10', '08:13:46', '17:13:36', 'Present', NULL),
(153, 3, '2025-07-10', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(154, 4, '2025-07-10', NULL, NULL, 'Leave', 'Izin pribadi'),
(155, 5, '2025-07-10', NULL, NULL, 'Leave', 'Izin pribadi'),
(156, 6, '2025-07-10', '08:11:46', '17:14:16', 'Present', NULL),
(157, 7, '2025-07-10', '08:13:18', '17:14:36', 'Present', NULL),
(158, 8, '2025-07-10', '08:03:11', '17:01:40', 'Present', NULL),
(159, 9, '2025-07-10', NULL, NULL, 'Sick', 'Sakit kepala'),
(160, 10, '2025-07-10', '08:05:16', '17:13:45', 'Present', NULL),
(161, 11, '2025-07-10', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(162, 12, '2025-07-10', NULL, NULL, 'Sick', 'Sakit kepala'),
(163, 13, '2025-07-10', '08:02:27', '17:14:09', 'Present', NULL),
(164, 14, '2025-07-10', '08:01:18', '17:14:06', 'Present', NULL),
(165, 15, '2025-07-10', '08:13:59', '17:07:49', 'Present', NULL),
(166, 1, '2025-07-11', '08:06:01', '17:00:02', 'Present', NULL),
(167, 2, '2025-07-11', '08:07:16', '17:07:42', 'Present', NULL),
(168, 3, '2025-07-11', NULL, NULL, 'Sick', 'Sakit kepala'),
(169, 4, '2025-07-11', '08:08:44', '17:06:51', 'Present', NULL),
(170, 5, '2025-07-11', '08:03:37', '17:14:09', 'Present', NULL),
(171, 6, '2025-07-11', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(172, 7, '2025-07-11', '08:02:48', '17:10:59', 'Present', NULL),
(173, 8, '2025-07-11', '08:02:10', '17:00:14', 'Present', NULL),
(174, 9, '2025-07-11', '08:13:43', '17:07:39', 'Present', NULL),
(175, 10, '2025-07-11', '08:10:50', '17:15:27', 'Present', NULL),
(176, 11, '2025-07-11', '08:15:14', '17:12:54', 'Present', NULL),
(177, 12, '2025-07-11', '08:06:59', '17:15:32', 'Present', NULL),
(178, 13, '2025-07-11', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(179, 14, '2025-07-11', '08:11:47', '17:13:28', 'Present', NULL),
(180, 15, '2025-07-11', NULL, NULL, 'Leave', 'Izin pribadi'),
(181, 1, '2025-07-14', '08:08:22', '17:04:19', 'Present', NULL),
(182, 2, '2025-07-14', '08:13:36', '17:12:45', 'Present', NULL),
(183, 3, '2025-07-14', '08:11:02', '17:08:18', 'Present', NULL),
(184, 4, '2025-07-14', '08:09:08', '17:15:00', 'Present', NULL),
(185, 5, '2025-07-14', '08:01:09', '17:12:56', 'Present', NULL),
(186, 6, '2025-07-14', '08:15:48', '17:04:53', 'Present', NULL),
(187, 7, '2025-07-14', '08:04:08', '17:03:13', 'Present', NULL),
(188, 8, '2025-07-14', '08:10:43', '17:09:03', 'Present', NULL),
(189, 9, '2025-07-14', NULL, NULL, 'Sick', 'Sakit kepala'),
(190, 10, '2025-07-14', '08:00:09', '17:04:29', 'Present', NULL),
(191, 11, '2025-07-14', '08:06:50', '17:03:33', 'Present', NULL),
(192, 12, '2025-07-14', '08:13:12', '17:11:44', 'Present', NULL),
(193, 13, '2025-07-14', '08:10:08', '17:15:26', 'Present', NULL),
(194, 14, '2025-07-14', NULL, NULL, 'Leave', 'Izin pribadi'),
(195, 15, '2025-07-14', NULL, NULL, 'Leave', 'Izin pribadi'),
(196, 1, '2025-07-15', '08:14:04', '17:08:13', 'Present', NULL),
(197, 2, '2025-07-15', '08:08:00', '17:01:53', 'Present', NULL),
(198, 3, '2025-07-15', '08:01:33', '17:13:01', 'Present', NULL),
(199, 4, '2025-07-15', '08:10:48', '17:12:28', 'Present', NULL),
(200, 5, '2025-07-15', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(201, 6, '2025-07-15', '08:08:57', '17:02:05', 'Present', NULL),
(202, 7, '2025-07-15', '08:06:36', '17:13:11', 'Present', NULL),
(203, 8, '2025-07-15', '08:03:12', '17:06:31', 'Present', NULL),
(204, 9, '2025-07-15', '08:06:59', '17:13:00', 'Present', NULL),
(205, 10, '2025-07-15', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(206, 11, '2025-07-15', '08:05:03', '17:07:57', 'Present', NULL),
(207, 12, '2025-07-15', '08:13:37', '17:15:44', 'Present', NULL),
(208, 13, '2025-07-15', '08:12:15', '17:07:50', 'Present', NULL),
(209, 14, '2025-07-15', '08:15:58', '17:08:48', 'Present', NULL),
(210, 15, '2025-07-15', '08:05:48', '17:02:11', 'Present', NULL),
(211, 1, '2025-07-16', '08:09:06', '17:15:42', 'Present', NULL),
(212, 2, '2025-07-16', '08:00:06', '17:02:19', 'Present', NULL),
(213, 3, '2025-07-16', '08:02:03', '17:13:39', 'Present', NULL),
(214, 4, '2025-07-16', '08:04:46', '17:07:29', 'Present', NULL),
(215, 5, '2025-07-16', '08:07:39', '17:14:13', 'Present', NULL),
(216, 6, '2025-07-16', '08:13:53', '17:11:36', 'Present', NULL),
(217, 7, '2025-07-16', '08:08:54', '17:11:09', 'Present', NULL),
(218, 8, '2025-07-16', NULL, NULL, 'Leave', 'Izin pribadi'),
(219, 9, '2025-07-16', NULL, NULL, 'Sick', 'Sakit kepala'),
(220, 10, '2025-07-16', NULL, NULL, 'Leave', 'Izin pribadi'),
(221, 11, '2025-07-16', '08:01:04', '17:08:13', 'Present', NULL),
(222, 12, '2025-07-16', '08:03:43', '17:02:04', 'Present', NULL),
(223, 13, '2025-07-16', '08:09:03', '17:14:45', 'Present', NULL),
(224, 14, '2025-07-16', '08:03:04', '17:10:35', 'Present', NULL),
(225, 15, '2025-07-16', NULL, NULL, 'Sick', 'Sakit kepala'),
(226, 1, '2025-07-17', '08:03:09', '17:10:59', 'Present', NULL),
(227, 2, '2025-07-17', '08:15:09', '17:05:47', 'Present', NULL),
(228, 3, '2025-07-17', NULL, NULL, 'Leave', 'Izin pribadi'),
(229, 4, '2025-07-17', '08:14:29', '17:05:19', 'Present', NULL),
(230, 5, '2025-07-17', '08:00:31', '17:11:20', 'Present', NULL),
(231, 6, '2025-07-17', '08:06:09', '17:14:31', 'Present', NULL),
(232, 7, '2025-07-17', NULL, NULL, 'Leave', 'Izin pribadi'),
(233, 8, '2025-07-17', '08:08:36', '17:07:53', 'Present', NULL),
(234, 9, '2025-07-17', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(235, 10, '2025-07-17', NULL, NULL, 'Leave', 'Izin pribadi'),
(236, 11, '2025-07-17', NULL, NULL, 'Leave', 'Izin pribadi'),
(237, 12, '2025-07-17', '08:12:06', '17:15:29', 'Present', NULL),
(238, 13, '2025-07-17', '08:00:18', '17:14:14', 'Present', NULL),
(239, 14, '2025-07-17', '08:15:58', '17:06:23', 'Present', NULL),
(240, 15, '2025-07-17', '08:13:53', '17:04:56', 'Present', NULL),
(241, 1, '2025-07-18', '08:03:17', '17:13:10', 'Present', NULL),
(242, 2, '2025-07-18', '08:08:07', '17:04:59', 'Present', NULL),
(243, 3, '2025-07-18', '08:11:57', '17:04:12', 'Present', NULL),
(244, 4, '2025-07-18', NULL, NULL, 'Leave', 'Izin pribadi'),
(245, 5, '2025-07-18', '08:03:27', '17:06:18', 'Present', NULL),
(246, 6, '2025-07-18', '08:11:18', '17:08:57', 'Present', NULL),
(247, 7, '2025-07-18', '08:05:07', '17:04:14', 'Present', NULL),
(248, 8, '2025-07-18', NULL, NULL, 'Sick', 'Sakit kepala'),
(249, 9, '2025-07-18', '08:05:16', '17:05:32', 'Present', NULL),
(250, 10, '2025-07-18', '08:00:47', '17:01:11', 'Present', NULL),
(251, 11, '2025-07-18', NULL, NULL, 'Leave', 'Izin pribadi'),
(252, 12, '2025-07-18', '08:00:00', '17:15:22', 'Present', NULL),
(253, 13, '2025-07-18', '08:00:34', '17:15:15', 'Present', NULL),
(254, 14, '2025-07-18', '08:08:17', '17:13:43', 'Present', NULL),
(255, 15, '2025-07-18', NULL, NULL, 'Sick', 'Sakit kepala'),
(256, 1, '2025-07-21', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(257, 2, '2025-07-21', '08:15:27', '17:12:25', 'Present', NULL),
(258, 3, '2025-07-21', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(259, 4, '2025-07-21', '08:06:38', '17:07:06', 'Present', NULL),
(260, 5, '2025-07-21', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(261, 6, '2025-07-21', NULL, NULL, 'Sick', 'Sakit kepala'),
(262, 7, '2025-07-21', '08:13:50', '17:05:59', 'Present', NULL),
(263, 8, '2025-07-21', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(264, 9, '2025-07-21', '08:07:04', '17:06:41', 'Present', NULL),
(265, 10, '2025-07-21', '08:15:36', '17:15:25', 'Present', NULL),
(266, 11, '2025-07-21', '08:10:44', '17:11:34', 'Present', NULL),
(267, 12, '2025-07-21', '08:01:40', '17:10:17', 'Present', NULL),
(268, 13, '2025-07-21', NULL, NULL, 'Leave', 'Izin pribadi'),
(269, 14, '2025-07-21', '08:09:53', '17:05:08', 'Present', NULL),
(270, 15, '2025-07-21', '08:02:34', '17:01:39', 'Present', NULL),
(271, 1, '2025-07-22', '08:09:42', '17:04:43', 'Present', NULL),
(272, 2, '2025-07-22', '08:07:56', '17:06:05', 'Present', NULL),
(273, 3, '2025-07-22', NULL, NULL, 'Absent', 'Tanpa keterangan'),
(274, 4, '2025-07-22', NULL, NULL, 'Leave', 'Izin pribadi'),
(275, 5, '2025-07-22', '08:08:28', '17:05:12', 'Present', NULL),
(276, 6, '2025-07-22', '08:03:35', '17:03:20', 'Present', NULL),
(277, 7, '2025-07-22', NULL, NULL, 'Sick', 'Sakit kepala'),
(278, 8, '2025-07-22', NULL, NULL, 'Sick', 'Sakit kepala'),
(279, 9, '2025-07-22', NULL, NULL, 'Leave', 'Izin pribadi'),
(280, 10, '2025-07-22', '08:08:14', '17:06:16', 'Present', NULL),
(281, 11, '2025-07-22', '08:00:55', '17:02:43', 'Present', NULL),
(282, 12, '2025-07-22', '08:10:13', '17:04:50', 'Present', NULL),
(283, 13, '2025-07-22', '08:12:42', '17:14:33', 'Present', NULL),
(284, 14, '2025-07-22', '08:10:20', '17:04:24', 'Present', NULL),
(285, 15, '2025-07-22', '08:05:08', '17:13:40', 'Present', NULL),
(286, 1, '2025-07-23', '08:01:09', '17:14:59', 'Present', NULL),
(287, 2, '2025-07-23', '08:15:44', '17:13:21', 'Present', NULL),
(288, 3, '2025-07-23', '08:15:56', '17:13:46', 'Present', NULL),
(289, 4, '2025-07-23', NULL, NULL, 'Leave', 'Izin pribadi'),
(290, 5, '2025-07-23', '08:12:42', '17:13:52', 'Present', NULL),
(291, 6, '2025-07-23', NULL, NULL, 'Sick', 'Sakit kepala'),
(292, 7, '2025-07-23', '08:08:21', '17:14:55', 'Present', NULL),
(293, 8, '2025-07-23', '08:05:17', '17:02:46', 'Present', NULL),
(294, 9, '2025-07-23', NULL, NULL, 'Sick', 'Sakit kepala'),
(295, 10, '2025-07-23', '08:06:26', '17:01:37', 'Present', NULL),
(296, 11, '2025-07-23', '08:00:14', '17:09:05', 'Present', NULL),
(297, 12, '2025-07-23', NULL, NULL, 'Leave', 'Izin pribadi'),
(298, 13, '2025-07-23', '08:12:40', '17:11:41', 'Present', NULL),
(299, 14, '2025-07-23', '08:06:13', '17:15:59', 'Present', NULL),
(300, 15, '2025-07-23', '08:13:37', '17:01:03', 'Present', NULL),
(301, 1, '2025-07-24', '08:05:54', '17:14:23', 'Present', NULL),
(302, 2, '2025-07-24', '08:14:12', '17:04:12', 'Present', NULL),
(303, 3, '2025-07-24', '08:13:44', '17:10:04', 'Present', NULL),
(304, 4, '2025-07-24', '08:08:14', '17:01:46', 'Present', NULL),
(305, 5, '2025-07-24', NULL, NULL, 'Leave', 'Izin pribadi'),
(306, 6, '2025-07-24', '08:10:08', '17:08:34', 'Present', NULL),
(307, 7, '2025-07-24', '08:03:59', '17:07:05', 'Present', NULL),
(308, 8, '2025-07-24', '08:06:36', '17:10:07', 'Present', NULL),
(309, 9, '2025-07-24', NULL, NULL, 'Sick', 'Sakit kepala'),
(310, 10, '2025-07-24', '08:00:51', '17:12:31', 'Present', NULL),
(311, 11, '2025-07-24', '08:05:01', '17:12:25', 'Present', NULL),
(312, 12, '2025-07-24', '08:10:37', '17:02:50', 'Present', NULL),
(313, 13, '2025-07-24', '08:06:55', '17:09:48', 'Present', NULL),
(314, 14, '2025-07-24', NULL, NULL, 'Sick', 'Sakit kepala'),
(315, 15, '2025-07-24', '08:05:05', '17:06:02', 'Present', NULL),
(316, 1, '2025-07-25', '08:04:43', '17:13:24', 'Present', NULL),
(317, 2, '2025-07-25', '08:12:09', '17:14:22', 'Present', NULL),
(318, 3, '2025-07-25', '08:01:50', '17:09:24', 'Present', NULL),
(319, 4, '2025-07-25', '08:08:59', '17:08:29', 'Present', NULL),
(320, 5, '2025-07-25', '08:12:56', '17:04:25', 'Present', NULL),
(321, 6, '2025-07-25', NULL, NULL, 'Sick', 'Sakit kepala'),
(322, 7, '2025-07-25', NULL, NULL, 'Sick', 'Sakit kepala'),
(323, 8, '2025-07-25', '08:06:23', '17:14:40', 'Present', NULL),
(324, 9, '2025-07-25', NULL, NULL, 'Leave', 'Izin pribadi'),
(325, 10, '2025-07-25', '08:11:24', '17:05:14', 'Present', NULL),
(326, 11, '2025-07-25', '08:01:04', '17:08:58', 'Present', NULL),
(327, 12, '2025-07-25', '08:03:44', '17:12:41', 'Present', NULL),
(328, 13, '2025-07-25', '08:08:24', '17:02:27', 'Present', NULL),
(329, 14, '2025-07-25', '08:14:15', '17:03:15', 'Present', NULL),
(330, 15, '2025-07-25', '08:10:06', '17:02:13', 'Present', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `calculated_overtimes`
--

CREATE TABLE `calculated_overtimes` (
  `calculated_id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `overtime_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `overtime_amount` decimal(15,2) NOT NULL,
  `calculation_details` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calculated_overtimes`
--

INSERT INTO `calculated_overtimes` (`calculated_id`, `request_id`, `employee_id`, `overtime_date`, `start_time`, `end_time`, `duration_minutes`, `overtime_amount`, `calculation_details`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 19, 15, '2025-07-08', '18:00:00', '20:00:00', 120, 111271.68, 'Durasi: 120 menit, Tanggal: 2025-07-08', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 18, 14, '2025-07-17', '18:00:00', '20:00:00', 120, 131502.89, 'Durasi: 120 menit, Tanggal: 2025-07-17', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 17, 13, '2025-07-18', '18:00:00', '20:00:00', 120, 151734.10, 'Durasi: 120 menit, Tanggal: 2025-07-18', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(4, 16, 12, '2025-07-22', '18:00:00', '20:00:00', 120, 131502.89, 'Durasi: 120 menit, Tanggal: 2025-07-22', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(5, 15, 11, '2025-07-01', '18:00:00', '20:00:00', 120, 111271.68, 'Durasi: 120 menit, Tanggal: 2025-07-01', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(6, 14, 11, '2025-07-13', '18:00:00', '20:00:00', 120, 158959.54, 'Durasi: 120 menit, Tanggal: 2025-07-13', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(7, 13, 10, '2025-07-04', '18:00:00', '20:00:00', 120, 141618.50, 'Durasi: 120 menit, Tanggal: 2025-07-04', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(8, 12, 10, '2025-07-15', '18:00:00', '20:00:00', 120, 141618.50, 'Durasi: 120 menit, Tanggal: 2025-07-15', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(9, 11, 9, '2025-07-23', '18:00:00', '20:00:00', 120, 161849.71, 'Durasi: 120 menit, Tanggal: 2025-07-23', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(10, 10, 9, '2025-07-07', '18:00:00', '20:00:00', 120, 161849.71, 'Durasi: 120 menit, Tanggal: 2025-07-07', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(11, 9, 8, '2025-07-08', '18:00:00', '20:00:00', 120, 263005.78, 'Durasi: 120 menit, Tanggal: 2025-07-08', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(12, 8, 7, '2025-06-26', '18:00:00', '20:00:00', 120, 121387.28, 'Durasi: 120 menit, Tanggal: 2025-06-26', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(13, 7, 6, '2025-07-12', '18:00:00', '20:00:00', 120, 317919.08, 'Durasi: 120 menit, Tanggal: 2025-07-12', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(14, 6, 6, '2025-07-21', '18:00:00', '20:00:00', 120, 222543.35, 'Durasi: 120 menit, Tanggal: 2025-07-21', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(15, 5, 5, '2025-07-24', '18:00:00', '20:00:00', 120, 182080.92, 'Durasi: 120 menit, Tanggal: 2025-07-24', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(16, 4, 5, '2025-07-14', '18:00:00', '20:00:00', 120, 182080.92, 'Durasi: 120 menit, Tanggal: 2025-07-14', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(17, 3, 4, '2025-07-15', '18:00:00', '20:00:00', 120, 202312.14, 'Durasi: 120 menit, Tanggal: 2025-07-15', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(18, 2, 4, '2025-07-01', '18:00:00', '20:00:00', 120, 202312.14, 'Durasi: 120 menit, Tanggal: 2025-07-01', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(19, 1, 3, '2025-06-30', '18:00:00', '20:00:00', 120, 202312.14, 'Durasi: 120 menit, Tanggal: 2025-06-30', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `deductions`
--

CREATE TABLE `deductions` (
  `deduction_id` int(11) NOT NULL,
  `deduction_name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deductions`
--

INSERT INTO `deductions` (`deduction_id`, `deduction_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Pinjaman Karyawan', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Engineering', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 'IT Infrastructure', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 'Product', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(4, 'Design', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(5, 'Human Resources', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(6, 'Finance', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(7, 'Customer Support', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(8, 'Marketing', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(9, 'Sales', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(10, 'Operations', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `position_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `role` enum('HR','Finance','Employee') NOT NULL,
  `employee_nik` varchar(20) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('W','M') DEFAULT NULL,
  `address` text,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `employment_status` enum('Permanent','Contract','Probation','Outsourced','Intern','Resigned') DEFAULT NULL,
  `join_date` date DEFAULT NULL,
  `resignation_date` date DEFAULT NULL,
  `npwp_number` varchar(20) DEFAULT NULL,
  `pt_kp` enum('TK0','TK1','TK2','TK3','K0','K1','K2','K3') DEFAULT NULL,
  `bank_account_number` varchar(30) DEFAULT NULL,
  `bank_name` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `position_id`, `department_id`, `id_user`, `role`, `employee_nik`, `full_name`, `dob`, `gender`, `address`, `phone_number`, `email`, `employment_status`, `join_date`, `resignation_date`, `npwp_number`, `pt_kp`, `bank_account_number`, `bank_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 8, 5, 1, 'HR', '1234567890', 'Bayu Anggara', '1990-01-01', 'M', 'Jl. Raya Pajajaran No. 78,', '081234567890', 'bayuanggara@gmail.com', 'Permanent', '2020-01-01', NULL, '12.345.678.9-012.000', 'K2', '123456789', 'Bank Central Asia', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 10, 6, 2, 'Finance', '2234567890', 'Dewi Puspita', '1992-02-02', 'W', 'Jl. Ahmad Yani No. 27,', '081234567891', 'puspitadewi@gmail.com', 'Permanent', '2020-02-02', NULL, '98.765.432.1-001.000', 'K1', '987654321', 'Bank Mandiri', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 1, 1, 3, 'Employee', '3302020991', 'Alfiansyah Wicaksono', '2004-12-09', 'M', 'Jl. Raya Bogor KM 38', '085819727856', 'alfiansyahcahyow@gmail.com', 'Permanent', '2024-09-02', NULL, '45.852.123.0-009.000', 'TK0', '18009346', 'Bank Mandiri', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(4, 1, 1, 4, 'Employee', '4000000001', 'Nadya Pratiwi', '1996-05-12', 'W', 'Jl. Mawar No. 15', '081234500001', 'nadya.pratiwi@gmail.com', 'Contract', '2022-01-15', NULL, '11.111.111.1-111.000', 'K1', '987650001', 'Bank BRI', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(5, 2, 1, 5, 'Employee', '4000000002', 'Rio Darmawan', '1995-11-20', 'M', 'Jl. Kenanga No. 10', '081234500002', 'rio.darmawan@gmail.com', 'Permanent', '2021-03-01', NULL, '22.222.222.2-222.000', 'K0', '987650002', 'Bank BNI', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(6, 3, 2, 6, 'Employee', '4000000003', 'Agus Purnomo', '1990-07-15', 'M', 'Jl. Melati No. 12', '081234500003', 'agus.purnomo@gmail.com', 'Intern', '2024-06-01', NULL, '33.333.333.3-333.000', 'K2', '987650003', 'Bank Mandiri', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(7, 4, 2, 7, 'Employee', '4000000004', 'Ratna Sari', '1993-09-25', 'W', 'Jl. Anggrek No. 5', '081234500004', 'ratna.sari@gmail.com', 'Permanent', '2023-02-01', NULL, '44.444.444.4-444.000', 'TK0', '987650004', 'Bank BCA', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(8, 5, 3, 8, 'Employee', '4000000005', 'Satria Yudha', '1988-03-30', 'M', 'Jl. Teratai No. 20', '081234500005', 'satria.yudha@gmail.com', 'Contract', '2019-09-10', NULL, '55.555.555.5-555.000', 'K3', '987650005', 'Bank BTN', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(9, 6, 4, 9, 'Employee', '4000000006', 'Yuni Kartika', '1997-08-08', 'W', 'Jl. Flamboyan No. 2', '081234500006', 'yuni.kartika@gmail.com', 'Intern', '2025-06-10', NULL, '66.666.666.6-666.000', 'K0', '987650006', 'Bank BSI', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(10, 7, 4, 10, 'Employee', '4000000007', 'Deni Prakoso', '1994-10-10', 'M', 'Jl. Cempaka No. 18', '081234500007', 'deni.prakoso@gmail.com', 'Contract', '2021-05-05', NULL, '77.777.777.7-777.000', 'TK0', '987650007', 'Bank Danamon', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(11, 11, 7, 11, 'Employee', '4000000008', 'Wulan Fitriani', '1992-06-18', 'W', 'Jl. Dahlia No. 3', '081234500008', 'wulan.fitriani@gmail.com', 'Permanent', '2021-08-20', NULL, '88.888.888.8-888.000', 'K1', '987650008', 'Bank BJB', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(12, 12, 8, 12, 'Employee', '4000000009', 'Andika Saputra', '1991-04-12', 'M', 'Jl. Merpati No. 1', '081234500009', 'andika.saputra@gmail.com', 'Intern', '2025-06-01', NULL, '99.999.999.9-999.000', 'TK0', '987650009', 'Bank BTPN', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(13, 13, 9, 13, 'Employee', '4000000010', 'Siska Rahma', '1998-12-01', 'W', 'Jl. Garuda No. 17', '081234500010', 'siska.rahma@gmail.com', 'Permanent', '2023-03-01', NULL, '10.101.010.0-010.000', 'K2', '987650010', 'Bank Panin', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(14, 14, 10, 14, 'Employee', '4000000011', 'Fajar Hidayat', '1990-01-01', 'M', 'Jl. Cendrawasih No. 9', '081234500011', 'fajar.hidayat@gmail.com', 'Contract', '2022-11-11', NULL, '12.121.212.1-212.000', 'K1', '987650011', 'Bank CIMB Niaga', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(15, 11, 7, 15, 'Employee', '4000000012', 'Rino Hartono', '1992-01-20', 'M', 'Jl. Rajawali No. 5', '081234500012', 'rino.hartono@gmail.com', 'Intern', '2025-07-01', NULL, '99.111.222.0-012.000', 'TK0', '987650012', 'Bank Muamalat', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_allowances`
--

CREATE TABLE `employee_allowances` (
  `emp_allowance_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `allowance_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `effective_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_allowances`
--

INSERT INTO `employee_allowances` (`emp_allowance_id`, `employee_id`, `allowance_id`, `amount`, `effective_date`, `end_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 3, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 3, 3, 500000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(4, 4, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(5, 4, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(6, 4, 3, 500000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(7, 5, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(8, 5, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(9, 5, 3, 400000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(10, 6, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(11, 6, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(12, 6, 3, 600000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(13, 7, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(14, 7, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(15, 7, 3, 250000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(16, 8, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(17, 8, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(18, 8, 3, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(19, 9, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(20, 9, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(21, 9, 3, 350000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(22, 10, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(23, 10, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(24, 10, 3, 300000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(25, 1, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(26, 1, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(27, 1, 3, 300000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(28, 2, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(29, 2, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(30, 2, 3, 300000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(31, 11, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(32, 11, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(33, 11, 3, 200000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(34, 15, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(35, 15, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(36, 15, 3, 200000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(37, 12, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(38, 12, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(39, 12, 3, 300000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(40, 13, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(41, 13, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(42, 13, 3, 400000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(43, 14, 1, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(44, 14, 2, 1000000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(45, 14, 3, 350000.00, '2025-06-26', '2025-07-25', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_deductions`
--

CREATE TABLE `employee_deductions` (
  `emp_deduction_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `deduction_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `effective_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `overtime_rates`
--

CREATE TABLE `overtime_rates` (
  `rate_id` int(11) NOT NULL,
  `rate_type` varchar(50) NOT NULL,
  `multiplier` decimal(5,2) NOT NULL,
  `description` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `overtime_requests`
--

CREATE TABLE `overtime_requests` (
  `request_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `request_date` datetime DEFAULT NULL,
  `overtime_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `reason` text,
  `submitted_by` int(11) NOT NULL,
  `approval_status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `approved_by_hrd` int(11) DEFAULT NULL,
  `approval_date_hrd` datetime DEFAULT NULL,
  `notes_approval` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `overtime_requests`
--

INSERT INTO `overtime_requests` (`request_id`, `employee_id`, `request_date`, `overtime_date`, `start_time`, `end_time`, `reason`, `submitted_by`, `approval_status`, `approved_by_hrd`, `approval_date_hrd`, `notes_approval`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 3, '2025-07-26 09:37:57', '2025-06-30', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 3, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 4, '2025-07-26 09:37:57', '2025-07-01', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 4, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 4, '2025-07-26 09:37:57', '2025-07-15', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 4, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(4, 5, '2025-07-26 09:37:57', '2025-07-14', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 5, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(5, 5, '2025-07-26 09:37:57', '2025-07-24', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 5, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(6, 6, '2025-07-26 09:37:57', '2025-07-21', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 6, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(7, 6, '2025-07-26 09:37:57', '2025-07-12', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 6, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(8, 7, '2025-07-26 09:37:57', '2025-06-26', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 7, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(9, 8, '2025-07-26 09:37:57', '2025-07-08', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 8, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(10, 9, '2025-07-26 09:37:57', '2025-07-07', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 9, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(11, 9, '2025-07-26 09:37:57', '2025-07-23', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 9, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(12, 10, '2025-07-26 09:37:57', '2025-07-15', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 10, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(13, 10, '2025-07-26 09:37:57', '2025-07-04', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 10, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(14, 11, '2025-07-26 09:37:57', '2025-07-13', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 11, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(15, 11, '2025-07-26 09:37:57', '2025-07-01', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 11, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(16, 12, '2025-07-26 09:37:57', '2025-07-22', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 12, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(17, 13, '2025-07-26 09:37:57', '2025-07-18', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 13, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(18, 14, '2025-07-26 09:37:57', '2025-07-17', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 14, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(19, 15, '2025-07-26 09:37:57', '2025-07-08', '18:00:00', '20:00:00', 'Mengerjakan tugas tambahan', 15, 'Approved', 1, '2025-07-26 09:37:57', 'Disetujui oleh sistem', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

--
-- Triggers `overtime_requests`
--
DELIMITER $$
CREATE TRIGGER `after_overtime_approval` AFTER UPDATE ON `overtime_requests` FOR EACH ROW BEGIN
        IF NEW.approval_status = 'Approved' AND OLD.approval_status != 'Approved' THEN

          INSERT INTO calculated_overtimes (
            request_id,
            employee_id,
            overtime_date,
            start_time,
            end_time,
            duration_minutes,
            overtime_amount,
            calculation_details,
            created_at,
            updated_at
          )
          SELECT
            NEW.request_id,
            NEW.employee_id,
            NEW.overtime_date,
            NEW.start_time,
            NEW.end_time,
            TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time),
            CASE 
              WHEN DAYOFWEEK(NEW.overtime_date) IN (1,7) THEN
                CASE
                  WHEN TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) <= 60 THEN (p.base_salary / 173) * 2.0
                  ELSE 
                    ((p.base_salary / 173) * 2.0) + 
                    (FLOOR((TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) - 60)/60) * (p.base_salary / 173) * 3.0)
                END
              ELSE
                CASE
                  WHEN TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) <= 60 THEN (p.base_salary / 173) * 1.5
                  ELSE 
                    ((p.base_salary / 173) * 1.5) + 
                    (FLOOR((TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time) - 60)/60) * (p.base_salary / 173) * 2.0)
                END
            END,
            CONCAT(
              'Durasi: ', TIMESTAMPDIFF(MINUTE, NEW.start_time, NEW.end_time), ' menit, ',
              'Tanggal: ', NEW.overtime_date
            ),
            NOW(),
            NOW()
          FROM employees e
          JOIN positions p ON e.position_id = p.position_id
          WHERE e.employee_id = NEW.employee_id;

        END IF;
      END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_details`
--

CREATE TABLE `payroll_details` (
  `payroll_detail_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `total_working_days` int(11) NOT NULL,
  `total_attendance_days` int(11) NOT NULL,
  `base_salary` decimal(15,2) NOT NULL,
  `total_allowances` decimal(15,2) NOT NULL,
  `total_overtime_pay` decimal(15,2) NOT NULL,
  `gross_salary` decimal(15,2) NOT NULL,
  `pph21_deduction` decimal(15,2) NOT NULL DEFAULT '0.00',
  `bpjs_kesehatan_deduction` decimal(15,2) NOT NULL DEFAULT '0.00',
  `bpjs_ketenagakerjaan_deduction` decimal(15,2) NOT NULL DEFAULT '0.00',
  `other_deductions` decimal(15,2) NOT NULL,
  `total_deductions` decimal(15,2) NOT NULL,
  `net_salary` decimal(15,2) NOT NULL,
  `payroll_status` enum('Draft','Final') NOT NULL DEFAULT 'Draft',
  `is_paid` tinyint(1) NOT NULL DEFAULT '0',
  `payment_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_periods`
--

CREATE TABLE `payroll_periods` (
  `period_id` int(11) NOT NULL,
  `period_name` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `payroll_date` date NOT NULL,
  `status` enum('Open','Closed') NOT NULL DEFAULT 'Open'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payroll_periods`
--

INSERT INTO `payroll_periods` (`period_id`, `period_name`, `start_date`, `end_date`, `payroll_date`, `status`) VALUES
(1, 'Juli 2025', '2025-06-26', '2025-07-25', '2025-08-04', 'Open');

-- --------------------------------------------------------

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `position_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `position_name` varchar(100) NOT NULL,
  `base_salary` decimal(15,2) NOT NULL,
  `job_allowance` decimal(15,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`position_id`, `department_id`, `position_name`, `base_salary`, `job_allowance`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Software Engineer', 10000000.00, 500000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 1, 'Backend Developer', 9000000.00, 400000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 2, 'DevOps Engineer', 11000000.00, 600000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(4, 2, 'IT Support', 6000000.00, 250000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(5, 3, 'Product Manager', 13000000.00, 1000000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(6, 4, 'UI/UX Designer', 8000000.00, 350000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(7, 4, 'Graphic Designer', 7000000.00, 300000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(8, 5, 'HR Generalist', 7000000.00, 300000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(9, 5, 'Recruitment Officer', 6500000.00, 250000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(10, 6, 'Finance Analyst', 8000000.00, 300000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(11, 7, 'Customer Support Specialist', 5500000.00, 200000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(12, 8, 'Marketing Specialist', 6500000.00, 300000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(13, 9, 'Sales Executive', 7500000.00, 400000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(14, 10, 'Office Manager', 6500000.00, 350000.00, '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250706184310-create-departments.js'),
('20250706190755-create-positions.js'),
('20250706190815-create-employees.js'),
('20250706191722-create-users.js'),
('20250706192102-create-allowances.js'),
('20250706192625-create-attendances.js'),
('20250706192801-create-overtime-rates.js'),
('20250706193340-create-deductions.js'),
('20250706193951-create-payroll-periods.js'),
('20250707041249-create-overtime-requests.js'),
('20250707041647-create-calculated-overtimes.js'),
('20250707041911-create-employee-allowances.js'),
('20250707042308-create-employee-deductions.js'),
('20250707042710-create-payroll-details.js'),
('20250707043358-create-tax-bpjs-config.js'),
('20250710053919-create-after-user-trigger.js'),
('20250720185506-create-after-approve-overtime-trigger.js');

-- --------------------------------------------------------

--
-- Table structure for table `tax_bpjs_config`
--

CREATE TABLE `tax_bpjs_config` (
  `config_id` int(11) NOT NULL,
  `config_name` varchar(100) NOT NULL,
  `pph21_rules` json NOT NULL,
  `bpjs_kesehatan_employee_rate` decimal(5,4) NOT NULL,
  `bpjs_kesehatan_company_rate` decimal(5,4) NOT NULL,
  `bpjs_tk_jkm_employee_rate` decimal(5,4) NOT NULL,
  `bpjs_tk_jkm_company_rate` decimal(5,4) NOT NULL,
  `bpjs_tk_jht_employee_rate` decimal(5,4) NOT NULL,
  `bpjs_tk_jht_company_rate` decimal(5,4) NOT NULL,
  `bpjs_tk_jp_employee_rate` decimal(5,4) NOT NULL,
  `bpjs_tk_jp_company_rate` decimal(5,4) NOT NULL,
  `bpjs_tk_jkk_company_rate` decimal(5,4) NOT NULL,
  `effective_start_date` date NOT NULL,
  `effective_end_date` date NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tax_bpjs_config`
--

INSERT INTO `tax_bpjs_config` (`config_id`, `config_name`, `pph21_rules`, `bpjs_kesehatan_employee_rate`, `bpjs_kesehatan_company_rate`, `bpjs_tk_jkm_employee_rate`, `bpjs_tk_jkm_company_rate`, `bpjs_tk_jht_employee_rate`, `bpjs_tk_jht_company_rate`, `bpjs_tk_jp_employee_rate`, `bpjs_tk_jp_company_rate`, `bpjs_tk_jkk_company_rate`, `effective_start_date`, `effective_end_date`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Config 2025', '{\"PKP\": [{\"max\": 60000000, \"min\": 0, \"rate\": 0.05}, {\"max\": 250000000, \"min\": 60000000, \"rate\": 0.15}, {\"max\": 500000000, \"min\": 250000000, \"rate\": 0.25}, {\"max\": 5000000000, \"min\": 500000000, \"rate\": 0.3}, {\"max\": null, \"min\": 5000000000, \"rate\": 0.35}], \"PTKP\": {\"K0\": 58500000, \"K1\": 63000000, \"K2\": 67500000, \"K3\": 72000000, \"TK0\": 54000000, \"TK1\": 58500000, \"TK2\": 63000000, \"TK3\": 67500000}}', 0.0100, 0.0400, 0.0000, 0.0030, 0.0200, 0.0370, 0.0100, 0.0200, 0.0089, '2025-01-01', '2025-12-31', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('HR','Finance','Employee') DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `employee_id`, `email`, `password`, `role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'bayuanggara@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'HR', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(2, 2, 'puspitadewi@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Finance', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(3, 3, 'alfiansyahcahyow@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(4, 4, 'nadya.pratiwi@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(5, 5, 'rio.darmawan@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(6, 6, 'agus.purnomo@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(7, 7, 'ratna.sari@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(8, 8, 'satria.yudha@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(9, 9, 'yuni.kartika@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(10, 10, 'deni.prakoso@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(11, 11, 'wulan.fitriani@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(12, 12, 'andika.saputra@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(13, 13, 'siska.rahma@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(14, 14, 'fajar.hidayat@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL),
(15, 15, 'rino.hartono@gmail.com', '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW', 'Employee', '2025-07-26 09:37:57', '2025-07-26 09:37:57', NULL);

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `after_user_created` AFTER INSERT ON `users` FOR EACH ROW BEGIN
        UPDATE employees
        SET id_user = NEW.id_user
        WHERE email = NEW.email;
      END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allowances`
--
ALTER TABLE `allowances`
  ADD PRIMARY KEY (`allowance_id`),
  ADD UNIQUE KEY `allowance_name` (`allowance_name`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `calculated_overtimes`
--
ALTER TABLE `calculated_overtimes`
  ADD PRIMARY KEY (`calculated_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `deductions`
--
ALTER TABLE `deductions`
  ADD PRIMARY KEY (`deduction_id`),
  ADD UNIQUE KEY `deduction_name` (`deduction_name`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `department_name` (`department_name`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_nik` (`employee_nik`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id_user` (`id_user`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `employee_allowances`
--
ALTER TABLE `employee_allowances`
  ADD PRIMARY KEY (`emp_allowance_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `allowance_id` (`allowance_id`);

--
-- Indexes for table `employee_deductions`
--
ALTER TABLE `employee_deductions`
  ADD PRIMARY KEY (`emp_deduction_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `deduction_id` (`deduction_id`);

--
-- Indexes for table `overtime_rates`
--
ALTER TABLE `overtime_rates`
  ADD PRIMARY KEY (`rate_id`),
  ADD UNIQUE KEY `rate_type` (`rate_type`);

--
-- Indexes for table `overtime_requests`
--
ALTER TABLE `overtime_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `submitted_by` (`submitted_by`),
  ADD KEY `approved_by_hrd` (`approved_by_hrd`);

--
-- Indexes for table `payroll_details`
--
ALTER TABLE `payroll_details`
  ADD PRIMARY KEY (`payroll_detail_id`),
  ADD KEY `period_id` (`period_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `payroll_periods`
--
ALTER TABLE `payroll_periods`
  ADD PRIMARY KEY (`period_id`),
  ADD UNIQUE KEY `period_name` (`period_name`);

--
-- Indexes for table `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD UNIQUE KEY `position_name` (`position_name`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tax_bpjs_config`
--
ALTER TABLE `tax_bpjs_config`
  ADD PRIMARY KEY (`config_id`),
  ADD UNIQUE KEY `config_name` (`config_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allowances`
--
ALTER TABLE `allowances`
  MODIFY `allowance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=331;

--
-- AUTO_INCREMENT for table `calculated_overtimes`
--
ALTER TABLE `calculated_overtimes`
  MODIFY `calculated_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `deductions`
--
ALTER TABLE `deductions`
  MODIFY `deduction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `employee_allowances`
--
ALTER TABLE `employee_allowances`
  MODIFY `emp_allowance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `employee_deductions`
--
ALTER TABLE `employee_deductions`
  MODIFY `emp_deduction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `overtime_rates`
--
ALTER TABLE `overtime_rates`
  MODIFY `rate_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `overtime_requests`
--
ALTER TABLE `overtime_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `payroll_details`
--
ALTER TABLE `payroll_details`
  MODIFY `payroll_detail_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_periods`
--
ALTER TABLE `payroll_periods`
  MODIFY `period_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `positions`
--
ALTER TABLE `positions`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tax_bpjs_config`
--
ALTER TABLE `tax_bpjs_config`
  MODIFY `config_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `calculated_overtimes`
--
ALTER TABLE `calculated_overtimes`
  ADD CONSTRAINT `calculated_overtimes_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `overtime_requests` (`request_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calculated_overtimes_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON UPDATE CASCADE;

--
-- Constraints for table `employee_allowances`
--
ALTER TABLE `employee_allowances`
  ADD CONSTRAINT `employee_allowances_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `employee_allowances_ibfk_2` FOREIGN KEY (`allowance_id`) REFERENCES `allowances` (`allowance_id`);

--
-- Constraints for table `employee_deductions`
--
ALTER TABLE `employee_deductions`
  ADD CONSTRAINT `employee_deductions_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `employee_deductions_ibfk_2` FOREIGN KEY (`deduction_id`) REFERENCES `deductions` (`deduction_id`);

--
-- Constraints for table `overtime_requests`
--
ALTER TABLE `overtime_requests`
  ADD CONSTRAINT `overtime_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `overtime_requests_ibfk_2` FOREIGN KEY (`submitted_by`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `overtime_requests_ibfk_3` FOREIGN KEY (`approved_by_hrd`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `payroll_details`
--
ALTER TABLE `payroll_details`
  ADD CONSTRAINT `payroll_details_ibfk_1` FOREIGN KEY (`period_id`) REFERENCES `payroll_periods` (`period_id`),
  ADD CONSTRAINT `payroll_details_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
