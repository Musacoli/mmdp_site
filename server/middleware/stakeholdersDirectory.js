import validator from '../validation';

export default (req, res, next) => {
  validator.stakeholdersDirectory.stakeholdersDirectory.body
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((validationError) => {
      const errorMessage = validationError.details.map((d) => d.message);
      res.status(400).send(errorMessage);
    });
};
