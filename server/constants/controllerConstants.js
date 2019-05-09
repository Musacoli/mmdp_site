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
  passwordsDontMatch: `Confirm password and new password don't match`,
  samePasswords: 'New password is the same as the old password',
  oldPasswordMatchFail: 'Old password doesnot match the store password',
};

export default {
  accountCreated: 'User successfully created.',
  verified: 'Congratulations! Your account has been successfully verified.',
  emailUpdated: 'Email successfully changed',
  notFound: 'User was not found',
  tryAgain: 'something went wrong, try again',
  userDeleted: 'User was deleted successfully',
  detailsUpdated: 'Your details have been successfully updated.',
  passwordUpdated: 'Your password has been updated successfully.',
};

export const status = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};
