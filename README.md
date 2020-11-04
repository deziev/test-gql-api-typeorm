# Test GQL backend

## Prerequisites
* Postgres SQL 12
* NodeJS 10|12

### Installation
Create DB
```sh
createdb -O user_user theproject_test_db
```
OR
Create configuration file for your local db connection. You could create `config/local.json` file or change `config/base.json`:
```json
{
  "db": {
    "host": "host",
    "username": "user",
    "password": "password"
  }
}
```

Insall dependencies and compile ts:
```sh
yarn install --pure-lockfile
yarn compile
yarn migration:run
```

### Usage
Starts server on `http://localhost:3000` by default
```sh
yarn start
```

### Scripts
Upload test data to db
```sh
yarn fixture:author
```

Run integration tests. Starts app with stub db connection
```sh
yarn test
```

Run in DEV mode
```sh
yarn start-dev
```

### Env vars
* PROJECT_ENV - Optional env variable, set to `DEV` to run app with your local configuration (`config/local.json`)