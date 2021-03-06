# ft_transcendence
The final Codam Common Core project. 

As of right now:

Both the frontend and backend folders contain scripts that should reliably start
them up at any imac at codam. However, i needed to use a --force flag at one point 
to get past dependency errors we need to solve soon.

Backend (NestJS API) currently contains a first controller for /users. 
You can request all users by sending a GET request to http://localhost:3030/users,
or a single user by sending a GET request to http://localhost:3030/users/[id].

## Postgres services
The `docker-compose.yaml` file sets up the following services:
| Service    | Description                                                  | Location / Host | Documentation                        |
|------------|--------------------------------------------------------------|-----------------|--------------------------------------|
| postgres   | PostgreSQL database server                                   | localhost:5432  | https://www.postgresql.org/          |
| pgadmin    | PGAdmin database administration tool                         | localhost:5050  | https://www.pgadmin.org/             |
| postgrest  | PostgREST API web server for communication with the database | localhost:3000  | https://postgrest.org/en/stable/     |
| swagger-ui | Swagger web server that auto-generates API documentation     | localhost:8080  | https://swagger.io/tools/swagger-ui/ |

### Setup
Make sure you have **docker** installed and your **docker-compose** supports `.yaml` files with
version 3.8 (docker-compose comes pre-installed with docker).

#### environment
The `docker-compose.yaml` file will require some environment variables. Make sure to create
a file located next to the docker compose file with the name `.env`. Then add the below variables
with corresponding values to it. For the ports I've already added the defaults.
```bash
POSTGRES_USER=pgadmin
POSTGRES_PASSWORD=password
POSTGRES_DB=transcendence
POSTGRES_PORT=5432

PGADMIN_DEFAULT_EMAIL=email@email.nl
PGADMIN_DEFAULT_PASSWORD=password
PGADMIN_PORT=5050

PGREST_PORT=3000

SWAGGER_UI_PORT=8081

NESTJS_PORT=3030

JSON_WEB_TOKEN_SECRET=my_secret_key
SESSION_SECRET=session_secret

CLIENT_ID=my_id
CLIENT_SECRET=client_secret
CALLBACK_URL=http://localhost:3030/login/callback
```

#### pre-commit
A special repo is added to the `.pre-commit-config.yaml` file to make sure the docker-compose file
and any shell scripts supporting it are valid. See rule:
```yaml
- repo: https://github.com/IamTheFij/docker-pre-commit
```
	