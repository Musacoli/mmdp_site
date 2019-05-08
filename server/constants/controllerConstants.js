export const fields = {
  email: '*',
  id: '*',
  username: '*',
  confirmed: '*',
};

export const exclude = {
  password: 0,
  _id: 0,
  __v: 0,
};

export const passwordError = {
  password:
    'password must have at least 8 characters,' +
    'password must be alphanumeric,' +
    'password must have  uppercase characters,' +
    'password must have lowercase characters,' +
    'password should not contain uppercase',
};

export default {
  accountCreated: 'User successfully created.',
  verified: 'Congratulations! Your account has been successfully verified.',
  emailUpdated: 'Email successfully changed',
  notFound: 'user was not found',
  tryAgain: 'something went wrong, try again',
  userDeleted: 'User was deleted successfully',
  detailsUpdated: 'Your details have been successfully updated.',
  profileUpdated: 'Your profile has been successfully updated.',
  userNotFound: 'Sorry no user with that token was found',
  missingEmail: 'Sorry you are missing an email',
};

export const status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};
