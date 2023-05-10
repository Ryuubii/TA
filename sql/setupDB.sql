CREATE DATABASE ta_project;
CREATE USER 'tester'@'%' IDENTIFIED WITH mysql_native_password BY '123';
GRANT ALL PRIVILEGES ON ta_project.* TO 'tester'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;