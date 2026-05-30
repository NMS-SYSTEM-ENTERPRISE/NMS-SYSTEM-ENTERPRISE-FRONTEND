// TAGS APIS
GET
/discovery-settings/credential_tags/
Read Tags

Retrieve credential tags.

Parameters
Try it out
Name Description
page
integer
(query)
Default value : 1

1
search
string | (string | null)
(query)
search
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
      "created_at": "2026-05-30T05:38:03.562Z",
      "updated_at": "2026-05-30T05:38:03.562Z"
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
/discovery-settings/credential_tags/
Create Tag

Create a new credential tag.

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
  "created_at": "2026-05-30T05:38:03.568Z",
  "updated_at": "2026-05-30T05:38:03.568Z"
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
/discovery-settings/credential_tags/
Update Tag

Update a credential tag.

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
  "created_at": "2026-05-30T05:38:03.574Z",
  "updated_at": "2026-05-30T05:38:03.574Z"
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
/discovery-settings/credential_tags/{id}
Delete Tag

Delete a credential tag.

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
  "created_at": "2026-05-30T05:38:03.540Z",
  "updated_at": "2026-05-30T05:38:03.540Z"
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
====================

// GROUPS APIS

GET
/discovery-settings/credential_groups/
Read Groups

Retrieve credential groups.

Parameters
Try it out
Name Description
page
integer
(query)
Default value : 1

1
search
string | (string | null)
(query)
search
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
      "created_at": "2026-05-30T05:38:46.993Z",
      "updated_at": "2026-05-30T05:38:46.993Z"
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
/discovery-settings/credential_groups/
Create Group

Create a new credential group.

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
  "created_at": "2026-05-30T05:38:46.999Z",
  "updated_at": "2026-05-30T05:38:46.999Z"
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
/discovery-settings/credential_groups/
Update Group

Update a credential group.

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
  "created_at": "2026-05-30T05:38:47.004Z",
  "updated_at": "2026-05-30T05:38:47.004Z"
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
/discovery-settings/credential_groups/{id}
Delete Group

Delete a credential group.

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
  "created_at": "2026-05-30T05:38:46.973Z",
  "updated_at": "2026-05-30T05:38:46.973Z"
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


// CREDENTIAL PROFILE APIS
GET
/discovery-settings/credential_profile/
Read Credentials

Retrieve credential profiles with pagination and filters.

Parameters
Try it out
Name Description
page
integer
(query)
Default value : 1

1
search
string | (string | null)
(query)
search
start_date
string | (string | null)
(query)
start_date
end_date
string | (string | null)
(query)
end_date
multiple_dates
array<string> | (array<string> | null)
(query)
quick_select
string | (string | null)
(query)
quick_select
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
      "type": "string",
      "port": 161,
      "community_string": "string",
      "username": "string",
      "password": "string",
      "auth_protocol": "string",
      "priv_protocol": "string",
      "privacy_password": "string",
      "id": 0,
      "tags": [],
      "groups": [],
      "devices_using": 0,
      "created_at": "2026-05-30T05:39:34.075Z",
      "updated_at": "2026-05-30T05:39:34.075Z"
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
/discovery-settings/credential_profile/
Create Credential

Create a new credential profile.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "string",
  "type": "string",
  "port": 161,
  "community_string": "string",
  "username": "string",
  "password": "string",
  "auth_protocol": "string",
  "priv_protocol": "string",
  "privacy_password": "string",
  "tag_ids": [],
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
  "name": "string",
  "type": "string",
  "port": 161,
  "community_string": "string",
  "username": "string",
  "password": "string",
  "auth_protocol": "string",
  "priv_protocol": "string",
  "privacy_password": "string",
  "id": 0,
  "tags": [],
  "groups": [],
  "devices_using": 0,
  "created_at": "2026-05-30T05:39:34.082Z",
  "updated_at": "2026-05-30T05:39:34.082Z"
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
/discovery-settings/credential_profile/
Update Credential

Update a credential profile.

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
  "type": "string",
  "port": 0,
  "community_string": "string",
  "username": "string",
  "password": "string",
  "auth_protocol": "string",
  "priv_protocol": "string",
  "privacy_password": "string",
  "tag_ids": [
    0
  ],
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
  "name": "string",
  "type": "string",
  "port": 161,
  "community_string": "string",
  "username": "string",
  "password": "string",
  "auth_protocol": "string",
  "priv_protocol": "string",
  "privacy_password": "string",
  "id": 0,
  "tags": [],
  "groups": [],
  "devices_using": 0,
  "created_at": "2026-05-30T05:39:34.088Z",
  "updated_at": "2026-05-30T05:39:34.088Z"
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
/discovery-settings/credential_profile/{id}
Delete Credential

Delete a credential profile.

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
  "type": "string",
  "port": 161,
  "community_string": "string",
  "username": "string",
  "password": "string",
  "auth_protocol": "string",
  "priv_protocol": "string",
  "privacy_password": "string",
  "id": 0,
  "tags": [],
  "groups": [],
  "devices_using": 0,
  "created_at": "2026-05-30T05:39:34.050Z",
  "updated_at": "2026-05-30T05:39:34.050Z"
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
