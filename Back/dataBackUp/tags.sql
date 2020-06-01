-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:5555
-- Généré le : sam. 16 mai 2020 à 15:10
-- Version du serveur :  8.0.18
-- Version de PHP : 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mat1`
--

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tag` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `tag`) VALUES
(1, 'love'),
(2, 'instagood'),
(3, 'fashion'),
(4, 'photooftheday'),
(5, 'beautiful'),
(6, 'art'),
(7, 'happy'),
(8, 'picoftheday'),
(9, 'cute'),
(10, 'photography'),
(11, 'follow'),
(12, 'tbt'),
(13, 'followme'),
(14, 'like4like'),
(15, 'nature'),
(16, 'travel'),
(17, 'repost'),
(18, 'style'),
(19, 'instagram'),
(20, 'summer'),
(21, 'instadaily'),
(22, 'selfie'),
(23, 'me'),
(24, 'friends'),
(25, 'girl'),
(26, 'fitness'),
(27, 'fun'),
(28, 'food'),
(29, 'beauty'),
(30, 'instalike'),
(31, 'smile'),
(32, 'family'),
(33, 'likeforlike'),
(34, 'life'),
(35, 'photo'),
(36, 'music'),
(37, 'ootd'),
(38, 'follow4follow'),
(39, 'makeup'),
(40, 'igers'),
(41, 'amazing'),
(42, 'nofilter'),
(43, 'dog'),
(44, 'model'),
(45, 'sunset'),
(46, 'beach'),
(47, 'instamood'),
(48, 'followforfollow'),
(49, 'foodporn'),
(50, 'motivation'),
(51, 'design'),
(52, 'sky'),
(53, 'l4l'),
(54, 'f4f'),
(55, 'lifestyle'),
(56, 'cat'),
(57, '일상'),
(58, 'vscocam'),
(59, 'hair'),
(60, 'bestoftheday'),
(61, 'vsco'),
(62, 'handmade'),
(63, 'funny'),
(64, 'gym'),
(65, 'dogsofinstagram'),
(66, 'drawing'),
(67, 'wedding'),
(68, 'instapic'),
(69, 'flowers'),
(70, 'girls'),
(71, 'artist'),
(72, 'baby'),
(73, 'pretty'),
(74, 'instafood'),
(75, 'party'),
(76, 'photographer'),
(77, 'inspiration'),
(78, 'lol'),
(79, 'cool'),
(80, 'likeforlikes'),
(81, 'workout'),
(82, 'swag'),
(83, 'likeforfollow'),
(84, 'fit'),
(85, 'healthy'),
(86, 'yummy'),
(87, 'blackandwhite'),
(88, 'christmas'),
(89, 'foodie'),
(90, 'moda'),
(91, 'home'),
(92, 'holiday'),
(93, 'black'),
(94, 'sea'),
(95, 'pink'),
(96, 'london'),
(97, 'landscape'),
(98, 'blue'),
(99, 'winter'),
(100, 'night'),
(101, 'happiness'),
(102, 'work'),
(103, 'tattoo'),
(104, 'memes'),
(105, 'nails'),
(106, 'puppy'),
(107, 'instafashion'),
(108, 'weekend'),
(109, 'catsofinstagram'),
(110, 'architecture'),
(111, 'japan'),
(112, 'nyc'),
(113, 'coffee'),
(114, 'look'),
(115, 'illustration'),
(116, '데일리'),
(117, 'daily'),
(118, 'blessed'),
(119, 'italy'),
(120, 'travelgram'),
(121, 'trip'),
(122, 'spring'),
(123, 'shopping'),
(124, 'explore'),
(125, 'portrait'),
(126, '맞팔'),
(127, 'tflers'),
(128, '소통'),
(129, 'paris'),
(130, 'dress'),
(131, 'vacation'),
(132, 'goodmorning'),
(133, 'red'),
(134, 'fashionblogger'),
(135, 'health'),
(136, 'wanderlust'),
(137, 'sweet'),
(138, 'birthday'),
(139, 'green'),
(140, 'instalove'),
(141, 'anime'),
(142, 'vintage'),
(143, 'instafollow'),
(144, 'luxury'),
(145, 'fitfam'),
(146, 'followback'),
(147, 'travelphotography'),
(148, 'instacool'),
(149, 'insta'),
(150, 'clouds'),
(151, 'throwback'),
(152, 'relax'),
(153, 'new'),
(154, 'outfit'),
(155, 'delicious'),
(156, 'sketch'),
(157, 'dogs'),
(158, 'meme'),
(159, 'amor'),
(160, 'photoshoot'),
(161, 'bts'),
(162, 'shoes'),
(163, 'likes'),
(164, 'sunday'),
(165, 'bodybuilding'),
(166, 'instatravel'),
(167, 'indonesia'),
(168, 'cats'),
(169, 'adventure'),
(170, 'dinner'),
(171, 'dance'),
(172, 'naturephotography'),
(173, 'newyork'),
(174, 'training'),
(175, 'nike'),
(176, 'fashionista'),
(177, 'artwork'),
(178, 'picture'),
(179, 'quotes'),
(180, 'canon'),
(181, 'morning'),
(182, 'usa'),
(183, 'iphoneonly'),
(184, 'awesome'),
(185, 'boy'),
(186, 'blogger'),
(187, 'dubai'),
(188, 'istanbul'),
(189, 'москва'),
(190, 'painting'),
(191, 'nice'),
(192, 'breakfast'),
(193, 'snow'),
(194, 'vegan'),
(195, 'white'),
(196, 'instaphoto'),
(197, 'color'),
(198, 'pet'),
(199, 'tweegram'),
(200, 'eyes');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
