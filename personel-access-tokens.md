
GET
/personal-access-tokens/
Read Pats

Retrieve personal access tokens with pagination, search, and date filters.

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
user_id
integer | (integer | null)
(query)
user_id
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
      "token": "string",
      "user_id": 0,
      "validity_days": 0,
      "status": true,
      "id": 0,
      "expires_at": "2026-05-29T08:19:25.203Z",
      "created_at": "2026-05-29T08:19:25.203Z",
      "updated_at": "2026-05-29T08:19:25.203Z"
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
/personal-access-tokens/
Create Pat

Create a new personal access token.

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
  "token": "string",
  "user_id": 0,
  "validity_days": 0,
  "status": true
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
  "token": "string",
  "user_id": 0,
  "validity_days": 0,
  "status": true,
  "id": 0,
  "expires_at": "2026-05-29T08:19:25.209Z",
  "created_at": "2026-05-29T08:19:25.209Z",
  "updated_at": "2026-05-29T08:19:25.209Z"
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
/personal-access-tokens/
Update Pat

Update a personal access token (e.g., status or validity).

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "name": "string",
  "description": "string",
  "validity_days": 0,
  "status": true
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
  "token": "string",
  "user_id": 0,
  "validity_days": 0,
  "status": true,
  "id": 0,
  "expires_at": "2026-05-29T08:19:25.214Z",
  "created_at": "2026-05-29T08:19:25.214Z",
  "updated_at": "2026-05-29T08:19:25.214Z"
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
/personal-access-tokens/generate
Get Generated Token

Generate a new secure PAT token string for the creation field.

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
  "token": "string"
}
No links

GET
/personal-access-tokens/{id}
Read Pat By Id

Get details of a specific personal access token.

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
  "token": "string",
  "user_id": 0,
  "validity_days": 0,
  "status": true,
  "id": 0,
  "expires_at": "2026-05-29T08:19:25.220Z",
  "created_at": "2026-05-29T08:19:25.220Z",
  "updated_at": "2026-05-29T08:19:25.220Z"
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
/personal-access-tokens/{id}
Delete Pat

Revoke/Delete a personal access token.

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
  "token": "string",
  "user_id": 0,
  "validity_days": 0,
  "status": true,
  "id": 0,
  "expires_at": "2026-05-29T08:19:25.174Z",
  "created_at": "2026-05-29T08:19:25.174Z",
  "updated_at": "2026-05-29T08:19:25.174Z"
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
