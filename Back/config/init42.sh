#!/bin/bash

# dropDB='DROP DATABASE if exists Matcha';
# sudo mariadb -e "$dropDB";
# #no space after =
# initDB='CREATE DATABASE IF NOT EXISTS Matcha';
# userDroit='GRANT ALL PRIVILEGES ON Matcha.* TO matcha WITH GRANT OPTION';
# #not working if without ""
# sudo mariadb -e "$initDB";
# sudo mariadb -e "$userDroit";
# sudo mariadb -e 'exit';

#change user, not print the command with > redirection
mysql -u matcha -pmatcha <  './matcha.sql';
echo 'done';
#-e 'show databases'

