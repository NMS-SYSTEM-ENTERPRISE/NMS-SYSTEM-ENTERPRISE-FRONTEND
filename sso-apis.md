GET
/sso/config
Get Sso Config

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
  "sp_entity_id": "snr-edatas-AIOps",
  "sp_acs_url": "string",
  "sp_login_url": "string",
  "sp_logout_url": "string",
  "idp_type": "OneLogin",
  "idp_name": "OneLogin",
  "idp_entity_id": "string",
  "idp_login_url": "string",
  "idp_logout_url": "string",
  "nameid_format": "Unspecified",
  "x509_certificate": "string",
  "idp_fingerprint": "string",
  "is_active": false,
  "id": 0,
  "updated_at": "2026-05-29T08:20:46.334Z"
}
No links

PUT
/sso/
Update Sso Settings

Update global SSO configuration settings.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "sp_entity_id": "string",
  "sp_acs_url": "string",
  "sp_login_url": "string",
  "sp_logout_url": "string",
  "idp_type": "string",
  "idp_name": "string",
  "idp_entity_id": "string",
  "idp_login_url": "string",
  "idp_logout_url": "string",
  "nameid_format": "string",
  "x509_certificate": "string",
  "idp_fingerprint": "string",
  "is_active": true
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
  "sp_entity_id": "snr-edatas-AIOps",
  "sp_acs_url": "string",
  "sp_login_url": "string",
  "sp_logout_url": "string",
  "idp_type": "OneLogin",
  "idp_name": "OneLogin",
  "idp_entity_id": "string",
  "idp_login_url": "string",
  "idp_logout_url": "string",
  "nameid_format": "Unspecified",
  "x509_certificate": "string",
  "idp_fingerprint": "string",
  "is_active": false,
  "id": 0,
  "updated_at": "2026-05-29T08:20:46.339Z"
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
/sso/login
Initiate Sso Login

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
"string"
No links

GET
/sso/acs
Assertion Consumer Service

Process SAML Assertion Consumer Service (ACS) payload.

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
"string"
No links

POST
/sso/acs
Assertion Consumer Service

Process SAML Assertion Consumer Service (ACS) payload.

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
"string"
No links

GET
/sso/logout
Initiate Sso Logout

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
"string"
No links

POST
/sso/reset
Reset Sso Settings

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
  "sp_entity_id": "snr-edatas-AIOps",
  "sp_acs_url": "string",
  "sp_login_url": "string",
  "sp_logout_url": "string",
  "idp_type": "OneLogin",
  "idp_name": "OneLogin",
  "idp_entity_id": "string",
  "idp_login_url": "string",
  "idp_logout_url": "string",
  "nameid_format": "Unspecified",
  "x509_certificate": "string",
  "idp_fingerprint": "string",
  "is_active": false,
  "id": 0,
  "updated_at": "2026-05-29T08:20:46.317Z"
}
