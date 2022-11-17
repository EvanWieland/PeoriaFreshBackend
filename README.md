# Peoria Fresh API

This is the API for the Peoria Fresh project.

* Node.js
* Express
* bcryptjs
* jsonwebtoken
* Sequelize
* PostgreSQL

Credit to [BezKoder](https://github.com/bezkoder/node-js-jwt-authentication-postgresql)'s tutorial on JWT Auth with
Node.js.

## Getting Started

### Install Dependencies

```
$ npm install
```

### Set Environment Variables for Node.js

* DATABASE_HOST
* DATABASE_PASSWORD
* DATABASE_USERNAME
* DATABASE_NAME
* TOKEN_SECRET

> Ask Evan Wieland for the values of these variables.

### Run the Server

```
$ npm start
```

## Overview

### API Endpoints

| Methods | Urls                  | Actions                     |
|---------|-----------------------|-----------------------------|
| POST    | /api/auth/signup      | Signup new account          |
| POST    | /api/auth/signin      | Login an account            |
| GET     | /api/test/all         | Retrieve public content     |
| GET     | /api/test/consumer    | Access Consumer’s content   |
| GET     | /api/test/distributor | Access Distributor’s content |
| GET     | /api/test/producer    | Access Producer’s content   |
| GET     | /api/test/admin       | Access Admin’s content      |

### Token Based Authentication

<img src="./assets/in-depth-introduction-jwt-token-based-authentication.png" alt="Token Based Authentication"/>

### Signup & Login with JWT Authentication

<img src="./assets/node-js-jwt-authentication-postgresql-flow.png" alt="Flow for Signup & Login with JWT Authentication"/>

#### Refresh Token (Needs Implemented)

<img src="./assets/jwt-refresh-token-node-js-example-flow.png" alt="Refresh Token"/>

### Node.js Express Architecture

<img src="./assets/node-js-jwt-authentication-postgresql-architecture.png" alt="Node.js Express Architecture"/>