# auth-jwt-access-refresh-token

created token based authentication system using jwt and access and refresh token mechaninsm

everytime the login or register flow is success, it will produce `req.user` object
this object is used to protecting some routes, and it containing `userId` and `sessionId`
and encoded with jwt

## Endpoint
- `POST http://localhost:3000/login` to login
  - request body
    ```json
      {
        "email": "your email",
        "password": "your password",
      }
    ```
  - response
    - success
      - status code: 200
      - body:
        ```json
          {
            "message": "login success"
          }
        ```
    - failed
      - status code: 404
      - body:
        ```json
          {
            "message": "login failed",
            "errors": {/*error object*/}
          }
        ```

- `POST http://localhost:3000/register` to register new user
  - request body
    ```json
      {
        "username": "your username",
        "email": "your email",
        "password": "your password",
        "passwordConfirmation": "your password confirmation",
      }
    ```
  - response
    - success
      - status code: 201
      - body:
        ```json
          {
            "message": "registered"
          }
        ```
    - failed
      - status code: 401
      - body:
        ```json
          {
            "message": "registration failed",
            "errors": {/*error object*/}
          }
        ```

- `GET http://localhost:3000/users` to get all users PROTECTED ROUTE
  - response
    - success
      - status code: 201
      - body:
        ```json
          {
            "users": {/*users object*/}
          }
        ```
    - failed
      - status code: 404
      - body:
        ```json
          {
            "message": "user not found"
          }
        ```

- `POST http://localhost:3000/logout` to logout user
  - response
    - status code: 200
    - text: 'logout'

