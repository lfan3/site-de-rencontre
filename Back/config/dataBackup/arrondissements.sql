-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:5555
-- Généré le : lun. 05 avr. 2021 à 18:30
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
-- Base de données : `matcha`
--

-- --------------------------------------------------------

--
-- Structure de la table `arrondissements`
--
USE matcha;

CREATE TABLE `arrondissements` (
  `id` int(5) DEFAULT NULL,
  `PostCode` varchar(100) DEFAULT NULL,
  `SimpleName` varchar(100) DEFAULT NULL,
  `FullName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `arrondissements`
--

INSERT INTO `arrondissements` (`id`, `PostCode`, `SimpleName`, `FullName`) VALUES
(1, '75112', '12ème Ardt', 'Reuilly'),
(2, '75111', '11ème Ardt', 'Popincourt'),
(3, '75106', '6ème Ardt', 'Luxembourg'),
(4, '75101', '1er Ardt', 'Louvre'),
(5, '75102', '2ème Ardt', 'Bourse'),
(6, '75119', '19ème Ardt', 'Buttes-Chaumont'),
(7, '75117', '17ème Ardt', 'Batignolles-Monceau'),
(8, '75120', '20ème Ardt', 'Ménilmontant'),
(9, '75105', '5ème Ardt', 'Panthéon'),
(10, '75108', '8ème Ardt', 'Élysée'),
(11, '75113', '13ème Ardt', 'Gobelins'),
(12, '75115', '15ème Ardt', 'Vaugirard'),
(13, '75110', '10ème Ardt', 'Entrepôt'),
(14, '75116', '16ème Ardt', 'Passy'),
(15, '75109', '9ème Ardt', 'Opéra'),
(16, '75118', '18ème Ardt', 'Buttes-Montmartre'),
(17, '75104', '4ème Ardt', 'Hôtel-de-Ville'),
(18, '75114', '14ème Ardt', 'Observatoire'),
(19, '75103', '3ème Ardt', 'Temple'),
(20, '75107', '7ème Ardt', 'Palais-Bourbo');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
