# Discount Service Project

## Introduction

This is a personal microservice created for study goals of gRPC protocol, it receives a user id and returns a discount based on the user's birthday and Black Friday, it will return a 5% discount if it's user's birthday or it will return a 10% discount if it's Black Friday, but the discount will never be more than 10%.

## Technology
Stuff we use:
- **[Docker](https://docs.docker.com)** and **[Docker Compose](https://docs.docker.com/compose/)** to create our development and test environments.
- **[Express](https://expressjs.com/pt-br/)** a web framework for Node.js
- **[CircleCI](https://circleci.com)** for deployment and as general CI.
- **[Postgres](https://www.postgresql.org)** to store our data and 
- **[Sequelize](http://docs.sequelizejs.com)** as a Node.js ORM.
- **[Jest](https://github.com/facebook/jest)** as a framework for tests.
- **[grpc](https://grpc.io/)** a open source universal RPC framework.

### Run project configured

To run the project you just need to run the following command:

```
make
```

### Run only migrations

To run the migrations you just need to run the following command:

```
make setup
```

### Run just the Application

If you want to run only the application, just run the following command:

``` 
docker-compose up app
```
or
```
make app
```

### Run tests

To run the application tests just run the following command:

```
docker-compose up app-test
```
or
```
make test
```

## Services, requests and responses examples.

As this microservice uses the gRPC protocol you can't use it as a http endpoint, you can use a Postman like aplication to test this microservices, the aplication is **[BloomRPC](https://github.com/uw-labs/bloomrpc)**.

### List

#### Request

`discount.UserService/List`

**Body**
```json
{}
```

#### Response

```JSON
{
  "users": [
    {
      "id": "0715f1c6-e299-4bfc-a9e7-5f442b3b7b25",
      "first_name": "John",
      "last_name": "Doe",
      "date_of_birth": "1995-04-01"
    },
    {
      "id": "1e3dcec1-4281-4396-bc07-d5b1afc9ef20",
      "first_name": "Luiz",
      "last_name": "Felipe",
      "date_of_birth": "1995-10-24"
    },
    {
      "id": "8109a5ee-2710-4308-ba54-c28e2ec1f2e7",
      "first_name": "Luiz",
      "last_name": "Gustavo",
      "date_of_birth": "1995-10-28"
    }
  ]
}
```

### Get

#### Request

`discount.UserService/Get`

**Body**
```json
{
  "id": "0715f1c6-e299-4bfc-a9e7-5f442b3b7b25"
}
```

#### Response

```JSON
{
  "id": "0715f1c6-e299-4bfc-a9e7-5f442b3b7b25",
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1995-04-01"
}
```

### GetDiscount

#### Request

`discount.UserService/GetDiscount`

**Body**
```json
{
  "id": "0715f1c6-e299-4bfc-a9e7-5f442b3b7b25"
}
```

#### Response

```JSON
{
  "percent": 0
}
```


## Credits

- [Luiz Felipe de Oliva Limeira](https://github.com/lflimeira)
