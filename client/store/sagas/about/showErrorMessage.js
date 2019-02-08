const showErrorMessage = (error) => {
  if (!error.response) {
    return ['Unable to connect to the server! Please check your connection.'];
  }
  if (error.response.data.message) {
    return [error.response.data.message];
  }
  if (Array.isArray(error.response.data.errors)) {
    return error.response.data.errors;
  }
};

export default showErrorMessage;
