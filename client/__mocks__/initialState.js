export default {
  users: [],
  isFetching: false,
  success: false,
  errors: {
    error: true,
    errors: { error: undefined },
    message: 'something went wrong',
    success: false,
  },
};

export const initialStateEdit = {
  status: false,
  success: false,
  isEditing: false,
};

export const deleteInitialState = {
  message: '',
  error: '',
  isDeleting: false,
  success: false,
};
