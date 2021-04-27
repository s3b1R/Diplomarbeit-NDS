DROP USER IF EXISTS 'nestBackend'@'%';
DROP DATABASE IF EXISTS resourceplanner;

CREATE DATABASE resourceplanner DEFAULT CHARACTER SET utf8;
CREATE USER 'nestBackend'@'%' IDENTIFIED BY 'resourceplanner';
GRANT ALL PRIVILEGES ON resourceplanner.* TO 'nestBackend'@'%';
FLUSH PRIVILEGES;
