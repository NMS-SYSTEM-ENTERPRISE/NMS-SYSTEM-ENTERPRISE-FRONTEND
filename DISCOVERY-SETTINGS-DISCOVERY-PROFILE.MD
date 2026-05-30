// TAGS APIS

GET
/discovery-settings/discovery_profile/tags/
Read Tags

Retrieve discovery tags with pagination and filters.

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
      "description": "string",
      "id": 0,
      "created_at": "2026-05-30T06:28:53.411Z",
      "updated_at": "2026-05-30T06:28:53.411Z"
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
/discovery-settings/discovery_profile/tags/
Create Tag

Create a new discovery tag.

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
  "created_at": "2026-05-30T06:28:53.417Z",
  "updated_at": "2026-05-30T06:28:53.417Z"
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
/discovery-settings/discovery_profile/tags/
Update Tag

Update a discovery tag.

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
  "created_at": "2026-05-30T06:28:53.422Z",
  "updated_at": "2026-05-30T06:28:53.422Z"
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
/discovery-settings/discovery_profile/tags/{id}
Delete Tag

Delete a discovery tag.

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
  "created_at": "2026-05-30T06:28:53.384Z",
  "updated_at": "2026-05-30T06:28:53.384Z"
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

// GROUPS APIS

GET
/discovery-settings/discovery_profile/groups/
Read Groups

Retrieve discovery groups with pagination and filters.

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
      "description": "string",
      "id": 0,
      "created_at": "2026-05-30T06:29:30.022Z",
      "updated_at": "2026-05-30T06:29:30.022Z"
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
/discovery-settings/discovery_profile/groups/
Create Group

Create a new discovery group.

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
  "created_at": "2026-05-30T06:29:30.028Z",
  "updated_at": "2026-05-30T06:29:30.028Z"
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
/discovery-settings/discovery_profile/groups/
Update Group

Update a discovery group.

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
  "created_at": "2026-05-30T06:29:30.033Z",
  "updated_at": "2026-05-30T06:29:30.033Z"
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
/discovery-settings/discovery_profile/groups/{id}
Delete Group

Delete a discovery group.

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
  "created_at": "2026-05-30T06:29:29.997Z",
  "updated_at": "2026-05-30T06:29:29.997Z"
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

// PROFILE APIS
GET
/discovery-settings/discovery_profile/profile/
Read Discovery Profiles

Retrieve discovery profiles with pagination, global filter, and date filters.

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
credential_id
integer | (integer | null)
(query)
credential_id
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
      "description": "string",
      "discovery_type": "string",
      "target_input_method": "string",
      "ip_address_or_hostname": "string",
      "start_ip": "string",
      "end_ip": "string",
      "cidr_notation": "string",
      "csv_file_path": "string",
      "port": 0,
      "timeout": 30,
      "schedule_type": "Once",
      "schedule_interval": 0,
      "status": "Idle",
      "id": 0,
      "created_at": "2026-05-30T06:30:01.777Z",
      "updated_at": "2026-05-30T06:30:01.777Z",
      "credential_profiles": [],
      "tags": [],
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
/discovery-settings/discovery_profile/profile/
Create Discovery Profile

Create a new discovery profile.

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
  "discovery_type": "string",
  "target_input_method": "string",
  "ip_address_or_hostname": "string",
  "start_ip": "string",
  "end_ip": "string",
  "cidr_notation": "string",
  "csv_file_path": "string",
  "port": 0,
  "timeout": 30,
  "schedule_type": "Once",
  "schedule_interval": 0,
  "status": "Idle",
  "credential_ids": [],
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
  "description": "string",
  "discovery_type": "string",
  "target_input_method": "string",
  "ip_address_or_hostname": "string",
  "start_ip": "string",
  "end_ip": "string",
  "cidr_notation": "string",
  "csv_file_path": "string",
  "port": 0,
  "timeout": 30,
  "schedule_type": "Once",
  "schedule_interval": 0,
  "status": "Idle",
  "id": 0,
  "created_at": "2026-05-30T06:30:01.784Z",
  "updated_at": "2026-05-30T06:30:01.784Z",
  "credential_profiles": [],
  "tags": [],
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
/discovery-settings/discovery_profile/profile/
Update Discovery Profile

Update a discovery profile.

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
  "discovery_type": "string",
  "target_input_method": "string",
  "ip_address_or_hostname": "string",
  "start_ip": "string",
  "end_ip": "string",
  "cidr_notation": "string",
  "csv_file_path": "string",
  "port": 0,
  "timeout": 0,
  "credential_ids": [
    0
  ],
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
  "description": "string",
  "discovery_type": "string",
  "target_input_method": "string",
  "ip_address_or_hostname": "string",
  "start_ip": "string",
  "end_ip": "string",
  "cidr_notation": "string",
  "csv_file_path": "string",
  "port": 0,
  "timeout": 30,
  "schedule_type": "Once",
  "schedule_interval": 0,
  "status": "Idle",
  "id": 0,
  "created_at": "2026-05-30T06:30:01.790Z",
  "updated_at": "2026-05-30T06:30:01.790Z",
  "credential_profiles": [],
  "tags": [],
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
/discovery-settings/discovery_profile/profile/{id}
Delete Discovery Profile

Delete a discovery profile.

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
  "discovery_type": "string",
  "target_input_method": "string",
  "ip_address_or_hostname": "string",
  "start_ip": "string",
  "end_ip": "string",
  "cidr_notation": "string",
  "csv_file_path": "string",
  "port": 0,
  "timeout": 30,
  "schedule_type": "Once",
  "schedule_interval": 0,
  "status": "Idle",
  "id": 0,
  "created_at": "2026-05-30T06:30:01.751Z",
  "updated_at": "2026-05-30T06:30:01.751Z",
  "credential_profiles": [],
  "tags": [],
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
