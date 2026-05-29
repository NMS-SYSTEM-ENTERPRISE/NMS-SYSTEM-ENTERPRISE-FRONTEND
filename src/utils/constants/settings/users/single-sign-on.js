/**
 * Constants — Settings > User Management > Single Sign-On
 *
 * Immutable config: select options and default SSO configuration values.
 */

// ─── Select options ───────────────────────────────────────────

/** Available identity provider platforms. */
export const IDENTITY_PROVIDER_OPTIONS = [
  { value: 'OneLogin', label: 'OneLogin' },
  { value: 'Okta',     label: 'Okta' },
  { value: 'Azure AD', label: 'Azure AD' },
];

/** Standard SAML NameID formats. */
export const NAME_ID_FORMAT_OPTIONS = [
  { value: 'Unspecified', label: 'Unspecified' },
  { value: 'Email',       label: 'Email' },
  { value: 'Persistent',  label: 'Persistent' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default configuration for Single Sign-On. */
export const DEFAULT_SSO_SETTINGS = {
  serviceProviderEntityId:    'snr-edatas-AIOps',
  redirectURL:                'https://172.16.14.71/api/v1/sso/callback',
  serviceProviderLoginURL:    'https://172.16.14.71/api/v1/sso',
  serviceProviderLogoutURL:   'https://172.16.14.71/api/v1/sso/logout',
  identityProvider:           'OneLogin',
  identityProviderEntityId:   'https://app.onelogin.com/saml/metadata/444d8ba1-4ebe-4752-8ecd-90b9864b18c6',
  identityProviderLoginURL:   'https://rahit-test-dev.onelogin.com/trust/saml2/http-post/sso/8743535',
  identityProviderLogoutURL:  'https://rahit-test-dev.onelogin.com/trust/saml2/http-redirect/slo/3643535',
  nameIdFormat:               'Unspecified',
};
