GET
/roles/
Read Roles

Retrieve roles with pagination, search, and advanced date filters.

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
      "name": "string",
      "description": "string",
      "permissions": {
        "additionalProp1": {}
      },
      "id": 0,
      "created_at": "2026-05-29T08:17:14.531Z",
      "updated_at": "2026-05-29T08:17:14.531Z",
      "user_count": 0,
      "users": []
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
/roles/
Create Role

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
  "permissions": {
    "additionalProp1": {}
  }
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
  "permissions": {
    "additionalProp1": {}
  },
  "id": 0,
  "created_at": "2026-05-29T08:17:14.537Z",
  "updated_at": "2026-05-29T08:17:14.537Z",
  "user_count": 0,
  "users": []
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
/roles/
Update Role

Update role using ID in JSON body.

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
  "permissions": {
    "additionalProp1": {}
  },
  "id": 0
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
  "permissions": {
    "additionalProp1": {}
  },
  "id": 0,
  "created_at": "2026-05-29T08:17:14.542Z",
  "updated_at": "2026-05-29T08:17:14.542Z",
  "user_count": 0,
  "users": []
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
/roles/{id}
Read Role

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
  "permissions": {
    "additionalProp1": {}
  },
  "id": 0,
  "created_at": "2026-05-29T08:17:14.546Z",
  "updated_at": "2026-05-29T08:17:14.546Z",
  "user_count": 0,
  "users": []
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
/roles/{id}
Delete Role

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
  "permissions": {
    "additionalProp1": {}
  },
  "id": 0,
  "created_at": "2026-05-29T08:17:14.505Z",
  "updated_at": "2026-05-29T08:17:14.505Z",
  "user_count": 0,
  "users": []
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
