# Test GQL backend

## Prerequisites
* Postgres SQL 12
* NodeJS 10|12

### Installation
Create DB
```sh
createdb -O user_user bellintegrator_test_db
```

```sh
yarn install --pure-lockfile
yarn compile
yarn migration:run
```

### Usage
```sh
yarn start
```

Run in DEV mode
```sh
yarn start-dev
```

### Env vars
* PROJECT_ENV - Optional env variable, set to `DEV` to run app with your local configuration (`config/local.json`)