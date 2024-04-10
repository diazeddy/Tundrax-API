<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
## Objective

Develop a RESTful API for a cat adoption agency. The API will manage cat profiles, and user interactions.

## Features

• Cat Profiles: Create, read, update, and delete profiles for cats available for adoption.

• User Authentication: Secure user registration and login functionality.

• Favorites: Allow authenticated users to mark cats as favorites.

Technical Specifications:

• Implement TypeORM with a PostgreSQL database for data persistence.

• Utilize Passport.js for user authentication with JWT tokens.

• Apply class-validator and class-transformer for input validation and serialization.

## Challenges

- Had difficulties with implementing unit & e2e testing due to nested dependency between TypeORM entities. Didn't complete it but tried my best to cover the rest of them.


## APIs
• POST /auth/register: Register a new user.

• POST /auth/login: Authenticate a user and return a JWT.

• GET /cats: Retrieve a list of all cats.

• POST /cats: Create a new cat profile (admin only).

• GET /cats/{id}: Retrieve a cat profile by ID.

• PUT /cats/{id}: Update a cat profile by ID (admin only).

• DELETE /cats/{id}: Delete a cat profile by ID (admin only).
  
## Prerequisites

- Node.js (version 20 or higher)
- npm (version 10 or higher)

## Tech Stacks

- NestJS
- TypeScript
- TypeORM


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```
"# Tundrax-API" 
