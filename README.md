# Getting Started

## Available endpoints

### /api/user
---
user route
- GET `/` : get all users
  - headers
    - `auth-token` : jwt token. (required)
- GET `/me` : get user own profile
  - headers
    - `auth-token` : jwt token. (required)
- PUT `/` : modified user return previous user
  - headers
    - `auth-token` : jwt token. (required)
  - body
    - `email` : valid email. (required)
    - `city` : String. (required)
    - `fav_food` : String. (required)

auth route
- POST `/register` : register a new user 
  - body
    - `name`
    : String first name. (required)
    - `lastname`
    : String last name. (required)
    - `email`
    : valid email. (required)
    - `password`
    : String min. 6 char. (required)
    - `city`
    : String city. (required)
  
- POST `/login` : log user in and return auth-token on header
  - body
    - `email`
    : valid email. (required)
    - `password`
    : String min. 6 char. (required)

### /api/liked
---
- GET `/` : definition
  - headers
    - `auth-token` : jwt token. (required)
- POST `/` : definition
  - headers
    - `auth-token` : jwt token. (required)
  - body
    - `rest_id`: restaurant id. (required)
    - `name`: restaurant name. (required)
    - `img_url`: restaurant image url. (required)
    - `rating`: restaurant rating. (required)
    - `address`: restaurant address. (required)
- DELETE `/:id` : put restaurant id on the path param. return {success: 1}