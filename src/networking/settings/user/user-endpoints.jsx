export const USER_ENDPOINTS = {
  GET_ALL_USERS: 'users/',
  CREATE_USER: 'users/',
  EDIT_USER: 'users/', // Using PUT, ID in body
  UPDATE_USER_STATUS: 'users/{user_id}/deactivate',
  // Based on old one, or maybe just PUT /users/ for status? Wait, the API says PUT /users/ for updating. I will keep what was there if needed, but PUT /users/ is standard.
  DELETE_USER: 'users/{user_id}',
  GET_USER_ME: 'users/me',
  UPDATE_USER_ME: 'users/me',
};
