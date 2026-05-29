GET
/system-settings/tfa/
Read Tfa Settings

Retrieve global Two Factor Authentication settings.

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
  "is_enabled": false,
  "mode": "Authenticator App",
  "id": 0,
  "updated_at": "2026-05-29T08:22:08.062Z"
}
No links

PUT
/system-settings/tfa/
Update Tfa Settings

Update global Two Factor Authentication settings (Save).

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "is_enabled": true,
  "mode": "Authenticator App"
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
  "is_enabled": false,
  "mode": "Authenticator App",
  "id": 0,
  "updated_at": "2026-05-29T08:22:08.065Z"
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
/system-settings/tfa/reset
Reset Tfa Settings

Reset Two Factor Authentication settings to defaults (OFF, App).

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
  "is_enabled": false,
  "mode": "Authenticator App",
  "id": 0,
  "updated_at": "2026-05-29T08:22:08.049Z"
}
