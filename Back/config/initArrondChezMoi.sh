#!/bin/bash
~/bitnami/mysql/bin/mysql -u root -p < arrondissements.sql|| echo 'error occurred'
echo 'done';