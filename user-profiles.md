GET
/user-profiles/
Read Profiles

Retrieve user profiles with pagination and advanced filtering.

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
start_date
string | (string | null)
(query)
start_date
end_date
string | (string | null)
(query)
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
      "name": "string",
      "description": "string",
      "role_id": 0,
      "id": 0,
      "created_at": "2026-05-29T08:18:46.105Z",
      "updated_at": "2026-05-29T08:18:46.105Z",
      "role": {
        "name": "string",
        "description": "string",
        "permissions": {
          "additionalProp1": {}
        },
        "id": 0,
        "created_at": "2026-05-29T08:18:46.105Z",
        "updated_at": "2026-05-29T08:18:46.105Z",
        "user_count": 0,
        "users": []
      },
      "groups": [],
      "users": [],
      "user_count": 0
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
/user-profiles/
Create Profile

Create a new user profile.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "string",
  "description": "string",
  "role_id": 0,
  "group_ids": [],
  "user_id": 0
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
  "name": "string",
  "description": "string",
  "role_id": 0,
  "id": 0,
  "created_at": "2026-05-29T08:18:46.111Z",
  "updated_at": "2026-05-29T08:18:46.111Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:18:46.111Z",
    "updated_at": "2026-05-29T08:18:46.111Z",
    "user_count": 0,
    "users": []
  },
  "groups": [],
  "users": [],
  "user_count": 0
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
/user-profiles/
Update Profile

Update a user profile using ID in JSON body.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "string",
  "description": "string",
  "role_id": 0,
  "id": 0,
  "group_ids": [
    0
  ],
  "user_id": 0
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
  "name": "string",
  "description": "string",
  "role_id": 0,
  "id": 0,
  "created_at": "2026-05-29T08:18:46.118Z",
  "updated_at": "2026-05-29T08:18:46.118Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:18:46.118Z",
    "updated_at": "2026-05-29T08:18:46.118Z",
    "user_count": 0,
    "users": []
  },
  "groups": [],
  "users": [],
  "user_count": 0
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
/user-profiles/{id}
Read Profile By Id

Get a specific user profile by ID.

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
  "name": "string",
  "description": "string",
  "role_id": 0,
  "id": 0,
  "created_at": "2026-05-29T08:18:46.123Z",
  "updated_at": "2026-05-29T08:18:46.123Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:18:46.123Z",
    "updated_at": "2026-05-29T08:18:46.123Z",
    "user_count": 0,
    "users": []
  },
  "groups": [],
  "users": [],
  "user_count": 0
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
/user-profiles/{id}
Delete Profile

Delete a user profile.

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
  "name": "string",
  "description": "string",
  "role_id": 0,
  "id": 0,
  "created_at": "2026-05-29T08:18:46.079Z",
  "updated_at": "2026-05-29T08:18:46.079Z",
  "role": {
    "name": "string",
    "description": "string",
    "permissions": {
      "additionalProp1": {}
    },
    "id": 0,
    "created_at": "2026-05-29T08:18:46.079Z",
    "updated_at": "2026-05-29T08:18:46.079Z",
    "user_count": 0,
    "users": []
  },
  "groups": [],
  "users": [],
  "user_count": 0
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
