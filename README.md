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

## Captain Registration
Endpoint for registering new captains in the system.

### Endpoint
```
POST /captains/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string", // minimum 3 characters
    "lastname": "string"   // optional, minimum 3 characters if provided
  },
  "email": "string",      // valid email format, will be converted to lowercase
  "password": "string",   // will be hashed before storage
  "vehicle": {
    "color": "string",    // minimum 3 characters
    "plate": "string",    // minimum 3 characters
    "capacity": "number", // minimum value of 1
    "vehicleType": "string" // must be one of: "car", "motorcycle", "auto"
  },
  "location": {           // optional
    "lat": "number",
    "lng": "number"
  }
}
```

### Response

#### Success Response
**Code:** 201 CREATED
```json
{
  "message": "Captain registered successfully",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "inactive",  // default status
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "lat": "number",
      "lng": "number"
    },
    "_id": "string"
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
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

**Code:** 400 BAD REQUEST
```json
{
  "error": "Email already exists"
}
```

### Validation Rules
- **firstname**: Required, minimum 3 characters
- **lastname**: Optional, minimum 3 characters if provided
- **email**: Required, must be valid email format, must be unique
- **password**: Required
- **vehicle.color**: Required, minimum 3 characters
- **vehicle.plate**: Required, minimum 3 characters
- **vehicle.capacity**: Required, minimum value of 1
- **vehicle.vehicleType**: Required, must be one of: "car", "motorcycle", "auto"
- **location**: Optional
  - **lat**: Number
  - **lng**: Number

### Authentication
- This endpoint does not require authentication
- Returns JWT token upon successful registration

### Notes
- Password is automatically hashed before storage
- The response includes a JWT token that can be used for subsequent authenticated requests
- The password field is excluded from the captain object in the response
- Initial status is set to "inactive"
- Email addresses are stored in lowercase

## Captain Login
Endpoint for authenticating existing captains.

### Endpoint
```
POST /captains/login
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
  "message": "Captain logged in successfully",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "lat": "number",
      "lng": "number"
    },
    "_id": "string"
  },
  "token": "JWT_TOKEN"
}
```

#### Error Responses

**Code:** 400 BAD REQUEST
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
- The JWT token is set as an HTTP-only cookie
- Password is never returned in the response
- Use the returned token in subsequent requests by adding it to the Authorization header: `Bearer <token>`

## Get Captain Profile
Endpoint for retrieving the current captain's profile information.

### Endpoint
```
GET /captains/profile
```

### Request
No request body required.

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "message": "Captain profile fetched successfully",
  "captain": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "location": {
      "lat": "number",
      "lng": "number"
    },
    "_id": "string"
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
- Returns the current authenticated captain's profile data
- Password is never included in the response

## Captain Logout
Endpoint for logging out the current captain.

### Endpoint
```
POST /captains/logout
```

### Request
No request body required.

### Response

#### Success Response
**Code:** 200 OK
```json
{
  "message": "Captain logged out successfully"
}
```

#### Error Response
**Code:** 401 UNAUTHORIZED
```json
{
  "message": "Unauthorized"
}
```

### Authentication
- Requires valid JWT token in Authorization header
- Format: `Bearer <token>`

### Notes
- Invalidates the current session by blacklisting the token
- Clears the token cookie
- Any subsequent requests with the same token will be rejected


