# API Documentation: `POST /users/register`

## Endpoint
- `POST /users/register`

## Purpose
Register a new user account.

## Request Headers
- `Content-Type`: `application/json`

## Request Body
```json
{
  "fullname": {
    "fristname": "string",  // required, min length 3
    "LastName": "string"   // required, min length 3
  },
  "email": "string",       // required, valid email
  "Password": "string"     // required, min length 6
}
```

### Body Field Details
- `fullname.fristname`: required, string, minimum 3 characters.
- `fullname.LastName`: required, string, minimum 3 characters.
- `email`: required, must be a valid email address.
- `Password`: required, at least 6 characters.

## Behavior
1. Runs validation via `express-validator`.
2. If invalid, responds with `400 Bad Request` and details.
3. Hashes password with `bcrypt` before persist.
4. Creates new user document and returns auth token.

## Responses
- `201 Created`:
  - body:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "643407d3b1cae11d2cd58fb1",
        "fullname": {
          "fristname": "John",
          "LastName": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```
- `400 Bad Request`:
  - body:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Frist name must be at least 3 characters long",
          "param": "fullname.fristname",
          "location": "body"
        }
      ]
    }
    ```
- `500 Internal Server Error`:
  - body: `{ "message": "..." }` (for unexpected server/db errors)

## Example cURL
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "fristname": "John",
      "LastName": "Doe"
    },
    "email": "john.doe@example.com",
    "Password": "secret123"
  }'
```


## user login 
```bash
'{
    "fullname": {
      "fristname": "John",
      "LastName": "Doe"
    },
    "email": "john.doe@example.com",
    "Password": "secret123"
  }'
```
