const validateString = (name) => typeof name !== 'string';

const validateLength = (name) => !!(name && name.length < 5);

const validateNullorUndefined = (name) => !name || typeof name === 'undefined';

const middlelware = {
  eventsMiddlewares(req, res, next) {
    let errors = [];

    const { body, files = {} } = req;
    const { details, title } = body;
    const { headerImage } = files;

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
