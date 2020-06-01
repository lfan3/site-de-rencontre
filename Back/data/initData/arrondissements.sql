-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:5555
-- Généré le : sam. 16 mai 2020 à 15:08
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
-- Structure de la table `arrondissements`
--

CREATE TABLE `arrondissements` (
  `n_sq_ar` int(11) NOT NULL,
  `c_ar` int(2) DEFAULT NULL,
  `c_arinsee` int(5) NOT NULL,
  `l_ar` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `l_aroff` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `n_sq_co` int(9) DEFAULT NULL,
  `surface` decimal(10,0) DEFAULT NULL,
  `perimeter` decimal(10,0) DEFAULT NULL,
  `geo_loc` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `arrondissements`
--

INSERT INTO `arrondissements` (`n_sq_ar`, `c_ar`, `c_arinsee`, `l_ar`, `l_aroff`, `n_sq_co`, `surface`, `perimeter`, `geo_loc`) VALUES
(750000001, 1, 75101, '1er Ardt', 'Louvre', 750001537, '1824613', '6055', '48.8625627018,2.33644336205'),
(750000002, 2, 75102, '2ème Ardt', 'Bourse', 750001537, '991154', '4554', '48.8682792225,2.34280254689'),
(750000003, 3, 75103, '3ème Ardt', 'Temple', 750001537, '1170883', '4519', '48.86287238,2.3600009859'),
(750000004, 4, 75104, '4ème Ardt', 'Hôtel-de-Ville', 750001537, '1600586', '5421', '48.8543414263,2.35762962032'),
(750000005, 5, 75105, '5ème Ardt', 'Panthéon', 750001537, '2539375', '6239', '48.8444431505,2.35071460958'),
(750000006, 6, 75106, '6ème Ardt', 'Luxembourg', 750001537, '2153096', '6484', '48.8491303586,2.33289799905'),
(750000007, 7, 75107, '7ème Ardt', 'Palais-Bourbon', 750001537, '4090057', '8099', '48.8561744288,2.31218769148'),
(750000008, 8, 75108, '8ème Ardt', 'Élysée', 750001537, '3880036', '7881', '48.8727208374,2.3125540224'),
(750000009, 9, 75109, '9ème Ardt', 'Opéra', 750001537, '2178303', '6472', '48.8771635173,2.33745754348'),
(750000010, 10, 75110, '10ème Ardt', 'Entrepôt', 750001537, '2891739', '6739', '48.8761300365,2.36072848785'),
(750000011, 11, 75111, '11ème Ardt', 'Popincourt', 750001537, '3665442', '8282', '48.8590592213,2.3800583082'),
(750000012, 12, 75112, '12ème Ardt', 'Reuilly', 750001537, '16314783', '24090', '48.8349743815,2.42132490078'),
(750000013, 13, 75113, '13ème Ardt', 'Gobelins', 750001537, '7149311', '11547', '48.8283880317,2.36227244042'),
(750000014, 14, 75114, '14ème Ardt', 'Observatoire', 750001537, '5614877', '10317', '48.8292445005,2.3265420442'),
(750000015, 15, 75115, '15ème Ardt', 'Vaugirard', 750001537, '8494994', '13679', '48.8400853759,2.29282582242'),
(750000016, 16, 75116, '16ème Ardt', 'Passy', 750001537, '16372542', '17416', '48.8603921054,2.26197078836'),
(750000017, 17, 75117, '17ème Ardt', 'Batignolles-Monceau', 750001537, '5668835', '10776', '48.887326522,2.30677699057'),
(750000018, 18, 75118, '18ème Ardt', 'Buttes-Montmartre', 750001537, '5996051', '9916', '48.892569268,2.34816051956'),
(750000019, 19, 75119, '19ème Ardt', 'Buttes-Chaumont', 750001537, '6792651', '11253', '48.8870759966,2.38482096015'),
(750000020, 20, 75120, '20ème Ardt', 'Ménilmontant', 750001537, '5983446', '10705', '48.8634605789,2.40118812928');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
