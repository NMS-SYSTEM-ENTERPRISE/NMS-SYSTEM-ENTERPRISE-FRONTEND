GET
/ldap/
Read Ldap Settings

Retrieve list of LDAP configurations with pagination, advanced date filtering, and search.

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
      "primary_host": "string",
      "secondary_host": "string",
      "domain_name": "string",
      "server_type": "Microsoft AD",
      "secure_ldap": false,
      "port": 389,
      "user_name": "string",
      "password": "string",
      "ldap_auth": false,
      "auto_sync": false,
      "ldap_groups": "string",
      "id": 0,
      "updated_at": "2026-05-29T08:21:26.271Z"
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
/ldap/
Create Ldap Settings

Add/Create a new LDAP configuration.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "primary_host": "string",
  "secondary_host": "string",
  "domain_name": "string",
  "server_type": "Microsoft AD",
  "secure_ldap": false,
  "port": 389,
  "user_name": "string",
  "password": "string",
  "ldap_auth": false,
  "auto_sync": false,
  "ldap_groups": "string"
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
  "primary_host": "string",
  "secondary_host": "string",
  "domain_name": "string",
  "server_type": "Microsoft AD",
  "secure_ldap": false,
  "port": 389,
  "user_name": "string",
  "password": "string",
  "ldap_auth": false,
  "auto_sync": false,
  "ldap_groups": "string",
  "id": 0,
  "updated_at": "2026-05-29T08:21:26.278Z"
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
/ldap/{id}
Read Ldap Setting By Id

Get specific LDAP server details by ID.

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
  "primary_host": "string",
  "secondary_host": "string",
  "domain_name": "string",
  "server_type": "Microsoft AD",
  "secure_ldap": false,
  "port": 389,
  "user_name": "string",
  "password": "string",
  "ldap_auth": false,
  "auto_sync": false,
  "ldap_groups": "string",
  "id": 0,
  "updated_at": "2026-05-29T08:21:26.282Z"
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
/ldap/{id}
Update Ldap Settings

Update an existing LDAP configuration.

Parameters
Try it out
Name Description
id *
integer
(path)
id
Request body

application/json
Example Value
Schema
{
  "primary_host": "string",
  "secondary_host": "string",
  "domain_name": "string",
  "server_type": "string",
  "secure_ldap": true,
  "port": 0,
  "user_name": "string",
  "password": "string",
  "ldap_auth": true,
  "auto_sync": true,
  "ldap_groups": "string"
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
  "primary_host": "string",
  "secondary_host": "string",
  "domain_name": "string",
  "server_type": "Microsoft AD",
  "secure_ldap": false,
  "port": 389,
  "user_name": "string",
  "password": "string",
  "ldap_auth": false,
  "auto_sync": false,
  "ldap_groups": "string",
  "id": 0,
  "updated_at": "2026-05-29T08:21:26.289Z"
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
/ldap/{id}
Delete Ldap Settings

Remove an LDAP configuration.

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
  "primary_host": "string",
  "secondary_host": "string",
  "domain_name": "string",
  "server_type": "Microsoft AD",
  "secure_ldap": false,
  "port": 389,
  "user_name": "string",
  "password": "string",
  "ldap_auth": false,
  "auto_sync": false,
  "ldap_groups": "string",
  "id": 0,
  "updated_at": "2026-05-29T08:21:26.293Z"
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
/ldap/test
Test Ldap Connection

Test LDAP connection and Bind credentials using the utility.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "host": "string",
  "port": 389,
  "domain": "string",
  "username": "string",
  "password": "string",
  "use_ssl": false
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
"string"
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
