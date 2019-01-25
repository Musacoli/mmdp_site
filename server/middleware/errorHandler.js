import { ValidationError } from 'express-validation';
import responseMessage from '../constants/responseMessage';

const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof ValidationError) {
      const error = err.errors.reduce((errors, errorItem) => {
        const errorMessages = errors;
        const { field, messages } = errorItem;
        // match field name to first error message and store in object
        errorMessages[field[0]] = messages[0].replace(/["]/g, '');
        return errorMessages;
      }, {});

      return res.sendError('Validation error', 400, error);
    }
    const error = err.message || undefined;
    return res.sendError(responseMessage.INTERNAL_SERVER_ERROR, 500, error);
  }
  return next();
};

export default errorHandler;
