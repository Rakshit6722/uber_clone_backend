# API Documentation

## User Registration
Endpoint for registering new users in the system.

### Endpoint
```
POST /user/register
```

### Request Body

```json

{
  "fullname": {
    "firstname": "string", // minimum 3 characters
    "lastname": "string"   // optional, minimum 3 characters if provided
  },
  "email": "string",      // valid email format
  "password": "string"    // minimum 6 characters
}
```

### Response

#### Success Response
**Code:** 201 CREATED
```json
{
  "message": "User created successfully",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    // password field is excluded from response
  },
  "token": "JWT_TOKEN"
}
```

#### Error Responses

**Code:** 400 BAD REQUEST
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Code:** 400 BAD REQUEST
```json
{
  "error": "User already exists"
}
```

### Validation Rules
- **firstname**: Required, minimum 3 characters
- **lastname**: Optional, minimum 3 characters if provided
- **email**: Required, must be valid email format, must be unique
- **password**: Required, minimum 6 characters

### Authentication
- This endpoint does not require authentication
- Returns JWT token upon successful registration

### Notes
- Password is automatically hashed before storage
- The response includes a JWT token that can be used for subsequent authenticated requests
- The password field is excluded from the user object in the response
