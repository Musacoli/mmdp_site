export const fields = {
  email: '*',
  id: '*',
  username: '*',
  isAdmin: '*',
  confirmed: '*',
};

export const exclude = {
  password: 0,
  _id: 0,
  __v: 0,
};

export const passwordError = {
  password:
    'password must have at least 8 characters,'
    + 'password must be alphanumeric,'
    + 'password must have  uppercase characters,'
    + 'password must have lowercase characters,'
    + 'password should not contain uppercase',
};

export default {
  accountCreated: 'user successfully created',
  verified: 'Congratulations! Your account has been successfully verified.',
  emailUpdated: 'email succesfully changed',
  notFound: 'user was not found',
  tryAgain: 'something went wrong, try again',
  userDeleted: 'user was deleted successfully',
  detailsUpdated: 'You details have been successfully updated.',
};

export const status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};
