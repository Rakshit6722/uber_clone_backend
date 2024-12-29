# API Documentation

## User Registration
Endpoint for registering new users in the system.

### Endpoint
```
POST /users/register
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

## User Login
Endpoint for authenticating existing users.

### Endpoint
```
POST /users/login
```

### Request Body
```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "message": "Login successful",
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    "socketId": "string"
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

**Code:** 401 UNAUTHORIZED
```json
{
  "message": "Invalid email or password"
}
```

### Validation Rules
- **email**: Required, must be valid email format
- **password**: Required, minimum 6 characters

### Authentication
- This endpoint does not require authentication
- Returns JWT token upon successful login

### Notes
- The JWT token expires in 24 hours
- Password is never returned in the response
- Use the returned token in subsequent requests by adding it to the Authorization header: `Bearer <token>`

## Get User Profile
Endpoint for retrieving the current user's profile information.

### Endpoint
```
GET /users/getProfile
```

### Request
No request body required.

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    "socketId": "string"
    // password field is excluded from response
  }
}
```

#### Error Response
**Code:** 401 UNAUTHORIZED
```json
{
  "message": "Unauthorized access"
}
```

### Authentication
- Requires valid JWT token in Authorization header
- Format: `Bearer <token>`

### Notes
- Returns the current authenticated user's profile data
- Password is never included in the response

## User Logout
Endpoint for logging out the current user.

### Endpoint
```
POST /users/logout
```

### Request
No request body required.

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "message": "Logged out successfully"
}
```

#### Error Response
**Code:** 401 UNAUTHORIZED
```json
{
  "message": "Unauthorized access"
}
```

### Authentication
- Requires valid JWT token in Authorization header
- Format: `Bearer <token>`

### Notes
- Invalidates the current session
- Clears the user's socket ID from the database
- Any subsequent requests with the same token will be rejected


