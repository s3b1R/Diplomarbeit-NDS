From mysql:5.7
COPY ./backend/db-data/sql/1-create.sql /docker-entrypoint-initdb.d
EXPOSE 3306
