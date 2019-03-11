import helpers from '../helpers/pillarHelper';

const validators = {
  Pillar(req, res, next) {
    const { title, introduction, whatWeAreDoing, keyActivities } = req.body;

    let errors = [];

    // Null or undefined field errors

    if (helpers.isNullOrUndefined(title)) {
      errors = [...errors, 'Title is required'];
    }

    if (helpers.isNullOrUndefined(introduction)) {
      errors = [...errors, 'Introduction is required'];
    }

    if (helpers.isNullOrUndefined(whatWeAreDoing)) {
      errors = [...errors, 'whatWeAreDoing is required'];
    }
    if (helpers.isNullOrUndefined(keyActivities)) {
      errors = [...errors, 'Key activities is required'];
    }

    if (errors.length) return res.status(400).json({ errors });

    next();
  },
};

export default validators;
