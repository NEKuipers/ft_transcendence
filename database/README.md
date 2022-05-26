# Postgres services
The `docker-compose.yaml` file sets up the following services:
| Service    | Description                                                  | Location / Host | Documentation                        |
|------------|--------------------------------------------------------------|-----------------|--------------------------------------|
| postgres   | PostgreSQL database server                                   | localhost:5432  | https://www.postgresql.org/          |
| pgadmin    | PGAdmin database administration tool                         | localhost:5050  | https://www.pgadmin.org/             |
| postgrest  | PostgREST API web server for communication with the database | localhost:3000  | https://postgrest.org/en/stable/     |
| swagger-ui | Swagger web server that auto-generates API documentation     | localhost:8080  | https://swagger.io/tools/swagger-ui/ |

## Setup
Make sure you have **docker** installed and your **docker-compose** supports `.yaml` files with
version 3.8 (docker-compose comes pre-installed with docker).

### environment
The `docker-compose.yaml` file will require some environment variables. Make sure to create
a file located next to the docker compose file with the name `.env`. Then add the below variables
with corresponding values to it. For the port's I've already added the defaults.
```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=5432

PGADMIN_DEFAULT_EMAIL=
PGADMIN_PORT=5050

PGREST_PORT=3000
```

### pre-commit
A special repo is added to the `.pre-commit-config.yaml` file to make sure the docker-compose file is
valid and any shell scripts that support it are also. See rule:
```yaml
- repo: https://github.com/IamTheFij/docker-pre-commit
```

