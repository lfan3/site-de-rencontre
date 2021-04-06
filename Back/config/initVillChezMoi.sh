#!/bin/bash
~/bitnami/mysql/bin/mysql -u root -p < villes_france.sql|| echo 'error occurred'
echo 'done';