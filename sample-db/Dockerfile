FROM mysql:8.0

COPY init.sql /docker-entrypoint-initdb.d/
COPY my.cnf /etc/mysql/conf.d/

CMD ["mysqld"]
