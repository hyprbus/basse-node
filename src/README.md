# Backend playground

## Tasks

- Authentication handling
  OK!- create user in db with hashed password
  - OK! Login:
    - OK! verify username and hashed password
    - OK! throw error if not OK
    - generate web token and send it
  - Authenticate routes with https://www.npmjs.com/package/@fastify/jwt
  - Test login + getting web token + setting bearer token with Postman
- Frontend

  - Create frontend with vite + ts
  - Login mechanism
    - If token does not exist then route to login form
    - Otherwise go to main route which gets tasks

- Error handling

## Completed Tasks

- pg-monitor
- Separate SQL
- Change back to pg-promise, use db.task
- Validate get data
