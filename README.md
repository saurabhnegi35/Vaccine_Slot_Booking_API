# Vaccine Registration App API Documentation

This API documentation provides details on how to use the Vaccine Registration App APIs for user and admin functionalities.

## Base URL

The base URL for all API endpoints is: `http://localhost:6000`

## Authentication

To access the protected routes, you need to include an authentication token in the request headers. The token should be provided in the `Authorization` header as follows:


The token can be obtained by logging in as an admin user.

## User Routes

### Register User

Endpoint: `/api/users/register`
Method: `POST`
Description: Registers a new user with the vaccine registration app.

#### Request Body

```json
{
  "name": "Your Name",
  "phoneNumber": "1234567890",
  "age": 30,
  "pincode": "123456",
  "aadharNo": "123456789012",
  "password": "password"
} ```
Response
{
  "success": true,
  "message": "User registered successfully"
}
User Login

Endpoint: /api/users/login
Method: POST
Description: Authenticates a user and returns an access token.
Request Body
{
  "phoneNumber": "1234567890",
  "password": "password"
}
Response
{
  "success": true,
  "token": "<access-token>"
}
Get Available Slots

Endpoint: /api/users/slots
Method: GET
Description: Retrieves the available time slots for vaccine registration.
Response
{
  "success": true,
  "slots": [
    {
      "date": "2023-06-01",
      "startTime": "10:00 AM",
      "endTime": "10:30 AM",
      "dose": "first",
      "capacity": 10,
      "available": true
    },
    {
      "date": "2023-06-01",
      "startTime": "10:30 AM",
      "endTime": "11:00 AM",
      "dose": "first",
      "capacity": 10,
      "available": true
    },
    ...
  ]
}
Register Slot

Endpoint: /api/users/register-slot
Method: POST
Description: Registers a user for a specific time slot.
Request Body

{
  "userId": "<user-id>",
  "slotId": "<slot-id>"
}

Response

{
  "success": true,
  "message": "Slot registered successfully"
}

Admin Routes
Admin Login

Endpoint: /api/admin/login
Method: POST
Description: Authenticates an admin user and returns an access token.
Request Body

{
  "username": "admin",
  "password": "password"
}

Response

{
  "success": true,
  "token": "<access-token>"
}

Get Total Registered Users

Endpoint: /api/admin/total-users
Method: GET
Description: Retrieves the total number of registered users.
Response

{
  "success": true,
  "totalUsers": 100,
  "users": [
    {
      "name": "Your Name",
      "phoneNumber": "1234567890",
      "age": 30,
      "pincode": "123456",
      "aadharNo": "123456789012",
      "slot": "<slot-id>"
    },
    ...
  ]
}

Filter Registered Users

Endpoint: /api/admin/filter-users
Method: GET
Description: Filters registered users based on age, pincode, and vaccine status.
Query Parameters

    age: Filter users by age (optional)
    pincode: Filter users by pincode (optional)
    vaccineStatus: Filter users by vaccine status (optional)

Response

{
  "success": true,
  "filteredUsers": [
    {
      "name": "Your Name",
      "phoneNumber": "1234567890",
      "age": 30,
      "pincode": "123456",
      "aadharNo": "123456789012",
      "slot": "<slot-id>"
    },
    ...
  ]
}

Get Slot Details for a Day

Endpoint: /api/admin/slot-details
Method: GET
Description: Retrieves the slot details for a specific day.
Query Parameters

    date: The date for which to retrieve slot details (required)

Response

{
  "success": true,
  "slotDetails": [
    {
      "date": "2023-06-01",
      "startTime": "10:00 AM",
      "endTime": "10:30 AM",
      "dose": "first",
      "capacity": 10,
      "available": true
    },
    {
      "date": "2023-06-01",
      "startTime": "10:30 AM",
      "endTime": "11:00 AM",
      "dose": "first",
      "capacity": 10,
      "available": true
    },
    ...
  ]
}

