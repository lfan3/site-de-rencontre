-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:5555
-- Généré le : sam. 16 mai 2020 à 15:09
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
-- Structure de la table `mutuallike`
--

CREATE TABLE `mutuallike` (
  `id` int(11) NOT NULL,
  `user_a` int(11) NOT NULL,
  `user_b` int(11) NOT NULL,
  `room` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mutuallike`
--

INSERT INTO `mutuallike` (`id`, `user_a`, `user_b`, `room`) VALUES
(1, 518, 288, 518288);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `mutuallike`
--
ALTER TABLE `mutuallike`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_a` (`user_a`),
  ADD KEY `user_b` (`user_b`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `mutuallike`
--
ALTER TABLE `mutuallike`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `mutuallike`
--
ALTER TABLE `mutuallike`
  ADD CONSTRAINT `mutuallike_ibfk_1` FOREIGN KEY (`user_a`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mutuallike_ibfk_2` FOREIGN KEY (`user_b`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
