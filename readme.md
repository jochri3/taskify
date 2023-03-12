# How to start the program

### You should have Docker installed

1. Add `.env` file at the root of `api` folder with the following
 ```
DATABASE_URL=<your database url>
POSTGRES_USER=<your database user>
POSTGRES_PASSWORD=<your database password>
 ```
2. Open the terminal and type 
```
docker compose --env-file ./api/.env -f docker-compose-dev.yml up
```