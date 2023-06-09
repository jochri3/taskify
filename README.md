# How to start the program

### You should have Docker installed

1. Add `.env` file at the root of `api` folder with the following
 ```
DATABASE_URL=<YOUR_DATABASE_URL>
POSTGRES_USER=<YOUR_DATABASE_USER>
POSTGRES_PASSWORD=<YOUR_DATABASE_PASSWORD>
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db_name>?schema=<schema>"



# JWT
JWT_SECRET=<YOUR_SECRET_KEY_HERE>
JWT_TOKEN_AUDIENCE=<YOUR_TOKEN_AUDIENCE eg : localhost:3000>
JWT_TOKEN_ISSUER=<YOUR_TOKEN_ISSUER eg: localhost:3000>
JWT_ACCESS_TOKEN_TTL=<YOUR_ACCESS_TOKEN_TTL eg: 3600>
JWT_REFRESH_TOKEN_TTL=<YOUR_REFRESH_TOKEN_TTL eg: 86400>

# Google
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_SECRET>
 ```
2. Start `postgres` and `redis` inside a docker container using the development `docker-compose-dev.yml` file
```
docker compose --env-file ./api/.env -f docker-compose-dev.yml up
```

## Installations

```bash
# Install pnpm package manager(But you can still use npm)
$ npm i -g pnpm
```

```bash
# Reinstall dependencies
$ pnpm install
```


```bash
# Run database migrations for existing migration files
$  pnpx prisma migrate dev
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```


## Migrations

```bash
# Run migrations
$ pnpm migrate <migration_name>

# Update types
$ pnpm generate_types
```

## Prisma Studio(Visual Database editor)
```
$ pnpm studio
```

## API DOC(Swagger)
```
http://localhost:3000/api
```


## License

This project is [MIT licensed](LICENSE).
