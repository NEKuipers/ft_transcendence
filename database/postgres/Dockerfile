FROM postgres:14.3

COPY sql/provisioning/default_avatar.png    /docker-entrypoint-initdb.d/default_avatar.png

# These scripts will automatically run: https://hub.docker.com/_/postgres/ -> Initialization scripts
COPY sql/*.sql                              /docker-entrypoint-initdb.d/
COPY sql/provisioning/*.sql                 /docker-entrypoint-initdb.d/
COPY sql/functions/*.sql                    /docker-entrypoint-initdb.d/
COPY sql/functions/tests/*.sql              /docker-entrypoint-initdb.d/
COPY sql/functions/achievements/*.sql       /docker-entrypoint-initdb.d/
