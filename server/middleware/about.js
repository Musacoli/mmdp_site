import helpers from '../utils/helpers';

const validators = {
  governorMessage(req, res, next) {
    const { governorName, governorMessage } = req.body;
    let errors = [];

    if (helpers.isNullOrUndefined(governorName)) {
      errors = [...errors, 'Governor name is required'];
    }
    if (helpers.isString(governorName) && governorName.length < 2) {
      errors = [...errors, 'Governor name must be two(2)  characters minimum'];
    }
    if (helpers.isNullOrUndefined(governorMessage)) {
      errors = [...errors, 'Governor message is required'];
    }
    if (helpers.isString(governorMessage) && governorMessage.length < 20) {
      errors = [
        ...errors,
        'Governor message must be twenty(20)  characters minimum',
      ];
    }
    // TODO FILE UPLOAD F
    // if(helpers.isEmptyObject(req.files) && req.method === 'POST'){
    //   errors = [...errors, 'Governor photo is required'];
    // }

    if (errors.length) return res.status(400).json({ errors });

    next();
  },

  edoStateApproach(req, res, next) {
    const { theEdoStateApproach } = req.body;
    let errors = [];

    if (helpers.isNullOrUndefined(theEdoStateApproach)) {
      errors = [...errors, 'The Edo State Approach is required'];
    }
    if (
      helpers.isString(theEdoStateApproach) &&
      theEdoStateApproach.length < 20
    ) {
      errors = [
        ...errors,
        'The Edo State Approach must be twenty(20)  characters minimum',
      ];
    }

    if (errors.length) return res.status(400).json({ errors });

    next();
  },

  Objectives(req, res, next) {
    const { Objectives } = req.body;
    let errors = [];

    if (helpers.isNullOrUndefined(Objectives)) {
      errors = [...errors, 'Objectives is required'];
    }
    if (helpers.isString(Objectives) && Objectives.length < 20) {
      errors = [...errors, 'Objectives must be twenty(20)  characters minimum'];
    }

    if (errors.length) return res.status(400).json({ errors });

    next();
  },

  coordination(req, res, next) {
    const { coordination, whatAreWeDoing, introToHighlights } = req.body;
    let errors = [];

    if (helpers.isNullOrUndefined(coordination)) {
      errors = [...errors, 'Coordination information is required'];
    }
    if (helpers.isString(coordination) && coordination.length < 20) {
      errors = [
        ...errors,
        'Coordination information must be twenty(20)  characters minimum',
      ];
    }
    if (helpers.isNullOrUndefined(whatAreWeDoing)) {
      errors = [...errors, 'What are we doing information is required'];
    }
    if (helpers.isString(whatAreWeDoing) && whatAreWeDoing.length < 20) {
      errors = [
        ...errors,
        'What are we doing must be twenty(20)  characters minimum',
      ];
    }
    if (helpers.isNullOrUndefined(introToHighlights)) {
      errors = [...errors, 'Introduction to Highlights is required'];
    }
    if (helpers.isString(introToHighlights) && introToHighlights.length < 20) {
      errors = [
        ...errors,
        'Introduction to Highlights must be twenty(20)  characters minimum',
      ];
    }

    if (errors.length) return res.status(400).json({ errors });

    next();
  },

  about(req, res, next) {
    const { about, background } = req.body;
    let errors = [];

    if (helpers.isNullOrUndefined(about)) {
      errors = [...errors, 'About is required'];
    }
    if (helpers.isString(about) && about.length < 20) {
      errors = [...errors, 'About must be twenty(20)  characters minimum'];
    }
    if (helpers.isNullOrUndefined(background)) {
      errors = [...errors, 'Background information is required'];
    }
    if (helpers.isString(background) && background.length < 20) {
      errors = [
        ...errors,
        'Background text must be twenty(20)  characters minimum',
      ];
    }

    if (errors.length) return res.status(400).json({ errors });

    next();
  },
};

export default validators;
