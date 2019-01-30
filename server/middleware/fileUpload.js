import helpers from '../utils/helpers';

const validators = {
  fileUpload(req, res, next) {
    let errors = [];
    if (helpers.isEmptyObject(req.files)) {
      errors = [...errors, 'File is required'];
    }

    if (errors.length) return res.status(400).json({ errors });

    next();
  },
};

export default validators;
