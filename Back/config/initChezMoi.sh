#!/bin/bash
~/bitnami/mysql/bin/mysql -u root -p < matcha.sql || echo 'error occurred'
echo 'done';