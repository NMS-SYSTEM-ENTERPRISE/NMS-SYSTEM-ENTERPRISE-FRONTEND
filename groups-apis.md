groups

GET
/groups/
Read Groups

Retrieve groups with pagination, search, and advanced date filters.

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
      "id": 0,
      "created_at": "2026-05-29T08:17:49.106Z",
      "updated_at": "2026-05-29T08:17:49.106Z",
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
/groups/
Create Group

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "string",
  "description": "string"
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
  "id": 0,
  "created_at": "2026-05-29T08:17:49.111Z",
  "updated_at": "2026-05-29T08:17:49.111Z",
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
/groups/
Update Group

Update group using ID in JSON body.

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
  "id": 0,
  "created_at": "2026-05-29T08:17:49.116Z",
  "updated_at": "2026-05-29T08:17:49.116Z",
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
/groups/{id}
Read Group

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
  "id": 0,
  "created_at": "2026-05-29T08:17:49.120Z",
  "updated_at": "2026-05-29T08:17:49.120Z",
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
/groups/{id}
Delete Group

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
  "id": 0,
  "created_at": "2026-05-29T08:17:49.080Z",
  "updated_at": "2026-05-29T08:17:49.080Z",
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
