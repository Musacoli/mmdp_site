import Joi from 'joi';

export const groupValidationSchema = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
});
/**
 *
 * @param object
 * @returns {any}
 */
export const validateFields = (object) => {
  /** function iterates through the state object values
   * returns a true if any field is empty
   * otherwise returns false
   */
  return Object.values(object).reduce((previous, value) => {
    return previous || value === '';
  }, false);
};
/**
 *
 * @param object
 * @returns {*}
 */

export const disable = (object) => {
  // get all required fields from the state object
  const {
    title,
    keyActivities,
    introduction,
    whatWeAreDoing,
    imageOneFileName,
    imageTwoFileName,
  } = object;
  // validate the required fields
  return validateFields({
    title,
    keyActivities,
    introduction,
    whatWeAreDoing,
    imageOneFileName,
    imageTwoFileName,
  });
};
// checks if value is empty
export const valueIsEmpty = (value) => {
  return !value.trim();
};

export default groupValidationSchema;
