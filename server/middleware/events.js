const validateString = (name) => {
  if (typeof name !== 'string') {
    return true;
  }
  return false;
};

const validateLength = (name) => {
  if (name && name.length < 5) {
    return true;
  }
  return false;
};

const validateNullorUndefined = (name) => {
  if (!name || typeof name === 'undefined') {
    return true;
  }
  return false;
};
const middlelware = {
  eventsMiddlewares(req, res, next) {
    let errors = [];

    const { details, title } = req.body;
    const { headerImage } = req.files;

    if (validateNullorUndefined(title)) {
      errors = [...errors, 'Event Title is Required'];
    }

    if (validateNullorUndefined(headerImage)) {
      errors = [...errors, 'Header Image is required'];
    }

    if (validateNullorUndefined(details)) {
      errors = [...errors, 'Event Details is required'];
    }

    if (validateString(title) || validateLength(title)) {
      errors = [...errors, 'Event Title must have five(5) characters minimum'];
    }

    if (validateString(details) || validateLength(details)) {
      errors = [
        ...errors,
        'Event Details must have five(5) characters minimum',
      ];
    }

    if (errors.length) {
      return res.status(400).send({
        status: 'error',
        data: errors,
      });
    }

    next();
  },
};

export default middlelware;
