import stakeHolderValidator from '../validation/stakeholdersDirectory/StakeholderValidation';
import ReturneeServiceValidator from '../validation/stakeholdersDirectory/ReturneeServiceValidation';

const validateInput = (validator, req, res, next) => {
  validator.body
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((validationError) => {
      const errorMessage = validationError.details.map((d) => d.message);
      res.status(400).send(errorMessage);
    });
};

export const stakeHolderMiddleware = (req, res, next) => {
  validateInput(stakeHolderValidator, req, res, next);
};

export const ReturneeServiceMiddleware = (req, res, next) => {
  validateInput(ReturneeServiceValidator, req, res, next);
};
