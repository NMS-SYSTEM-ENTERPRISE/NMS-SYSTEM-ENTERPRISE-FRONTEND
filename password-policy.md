GET
/password-policy/
Read Password Policy

Retrieve the global password security policy.

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
  "password_expiry": false,
  "expiry_days": 90,
  "require_uppercase": true,
  "require_lowercase": true,
  "require_numbers": true,
  "require_special_chars": true,
  "min_length": 8,
  "id": 0,
  "updated_at": "2026-05-29T08:20:14.102Z"
}
No links

PUT
/password-policy/
Update Password Policy

Update global password security settings.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "password_expiry": false,
  "expiry_days": 90,
  "require_uppercase": true,
  "require_lowercase": true,
  "require_numbers": true,
  "require_special_chars": true,
  "min_length": 8
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
  "password_expiry": false,
  "expiry_days": 90,
  "require_uppercase": true,
  "require_lowercase": true,
  "require_numbers": true,
  "require_special_chars": true,
  "min_length": 8,
  "id": 0,
  "updated_at": "2026-05-29T08:20:14.106Z"
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
/password-policy/reset
Reset Password Policy

Reset password security policy to default enterprise standards.

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
  "password_expiry": false,
  "expiry_days": 90,
  "require_uppercase": true,
  "require_lowercase": true,
  "require_numbers": true,
  "require_special_chars": true,
  "min_length": 8,
  "id": 0,
  "updated_at": "2026-05-29T08:20:14.087Z"
}
