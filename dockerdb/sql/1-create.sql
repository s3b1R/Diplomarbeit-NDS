DROP USER IF EXISTS 'nestBackend'@'%';
# DROP USER IF EXISTS 'nestBackend'@'172.17.0.1';
DROP DATABASE IF EXISTS resourceplanner;

# CREATE USER 'nestBackend'@'localhost' IDENTIFIED BY 'resourceplanner';
# CREATE DATABASE resourceplanner DEFAULT CHARACTER SET utf8;
# GRANT ALL PRIVILEGES ON resourceplanner.* TO 'nestBackend'@'localhost';
# FLUSH PRIVILEGES;

CREATE USER 'nestBackend'@'%' IDENTIFIED BY 'resourceplanner';
GRANT ALL PRIVILEGES ON resourceplanner.* TO 'nestBackend'@'%';
FLUSH PRIVILEGES;

# CREATE USER 'nestBackend'@'172.0.0.0/255.0.0.0' IDENTIFIED BY 'resourceplanner';
# GRANT ALL PRIVILEGES ON resourceplanner.* TO 'nestBackend'@'172.0.0.0/255.0.0.0';
# FLUSH PRIVILEGES;
