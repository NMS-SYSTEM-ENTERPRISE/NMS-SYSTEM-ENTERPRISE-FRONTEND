GET
/users/
Read Users

Retrieve users with pagination, global search, and advanced date filtering.

Parameters
Try it out
Name Description
page
integer
(query)
Default value : 1

1
minimum: 1
search
string | (string | null)
(query)
search
quick_select
string | (string | null)
(query)
Available values : today, yesterday, last_7_days, last_30_days, this_month, last_month

--
multiple_dates
array<string> | (array<string> | null)
(query)
Select specific dates

start_date
string | (string | null)
(query)
Format: YYYY-MM-DD

start_date
end_date
string | (string | null)
(query)
Format: YYYY-MM-DD

end_date
start_time
string
(query)
Default value : 00:00

00:00
end_time
string
(query)
Default value : 23:59

23:59
Responses
Code Description Links
200 
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "items": [
    {
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "username": "string",
      "mobile_number": "string",
      "status": true,
      "role_id": 0,
      "user_profile_id": 0,
      "timezone": "Asia/Kolkata",
      "date_format": "MM/DD/YYYY",
      "time_format": "24-hour",
      "id": 0,
      "created_at": "2026-05-29T08:14:14.073Z",
      "updated_at": "2026-05-29T08:14:14.073Z",
      "role": {
        "name": "string",
        "description": "string",
        "permissions": {
          "additionalProp1": {}
        },
        "id": 0,
        "created_at": "2026-05-29T08:14:14.073Z",
        "updated_at": "2026-05-29T08:14:14.073Z",
        "user_count": 0,
        "users": []
      },
      "groups": []
    }
  ],
  "total_records": 0,
  "page": 0,
  "total_pages": 0,
  "records_per_page": 0
}
No links
422 
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
}
No links

POST
/users/
Create User

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "password": "string",
  "group_ids": []
}
Responses
Code Description Links
200 
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "id": 0,
  "created_at": "2026-05-29T08:14:14.085Z",
  "updated_at": "2026-05-29T08:14:14.085Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:14:14.085Z",
    "updated_at": "2026-05-29T08:14:14.085Z",
    "user_count": 0,
    "users": []
  },
  "groups": []
}
No links
422 
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
}
No links

PUT
/users/
Update User

Update user using ID in JSON body.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "id": 0,
  "password": "string",
  "group_ids": [
    0
  ]
}
Responses
Code Description Links
200 
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "id": 0,
  "created_at": "2026-05-29T08:14:14.094Z",
  "updated_at": "2026-05-29T08:14:14.094Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:14:14.094Z",
    "updated_at": "2026-05-29T08:14:14.094Z",
    "user_count": 0,
    "users": []
  },
  "groups": []
}
No links
422 
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
}
No links

GET
/users/me
Read User Me

Get current user details.

Parameters
Try it out
No parameters

Responses
Code Description Links
200 
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "id": 0,
  "created_at": "2026-05-29T08:14:14.100Z",
  "updated_at": "2026-05-29T08:14:14.100Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:14:14.100Z",
    "updated_at": "2026-05-29T08:14:14.100Z",
    "user_count": 0,
    "users": []
  },
  "groups": []
}
No links

PUT
/users/me
Update User Me

Update current user profile and/or password.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "mobile_number": "string",
  "timezone": "string",
  "date_format": "string",
  "time_format": "string",
  "current_password": "string",
  "new_password": "string",
  "confirm_new_password": "string"
}
Responses
Code Description Links
200 
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "id": 0,
  "created_at": "2026-05-29T08:14:14.106Z",
  "updated_at": "2026-05-29T08:14:14.106Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:14:14.106Z",
    "updated_at": "2026-05-29T08:14:14.106Z",
    "user_count": 0,
    "users": []
  },
  "groups": []
}
No links
422 
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
}
No links

GET
/users/{id}
Read User By Id

Parameters
Try it out
Name Description
id *
integer
(path)
id
Responses
Code Description Links
200 
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "id": 0,
  "created_at": "2026-05-29T08:14:14.113Z",
  "updated_at": "2026-05-29T08:14:14.113Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:14:14.113Z",
    "updated_at": "2026-05-29T08:14:14.113Z",
    "user_count": 0,
    "users": []
  },
  "groups": []
}
No links
422 
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
}
No links

DELETE
/users/{id}
Delete User

Parameters
Try it out
Name Description
id *
integer
(path)
id
Responses
Code Description Links
200 
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "username": "string",
  "mobile_number": "string",
  "status": true,
  "role_id": 0,
  "user_profile_id": 0,
  "timezone": "Asia/Kolkata",
  "date_format": "MM/DD/YYYY",
  "time_format": "24-hour",
  "id": 0,
  "created_at": "2026-05-29T08:14:14.040Z",
  "updated_at": "2026-05-29T08:14:14.040Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:14:14.040Z",
    "updated_at": "2026-05-29T08:14:14.040Z",
    "user_count": 0,
    "users": []
  },
  "groups": []
}
No links
422 
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string",
      "input": "string",
      "ctx": {}
    }
  ]
