// Returns an array of dicts containing a value and a label
// See https://github.com/JedWatson/react-select#installation-and-usage
/* eslint-disable no-underscore-dangle */
const groupOptions = (groups, options) => {
  groups.map((anOption) => {
    const arrayOfOptions = { value: anOption._id, label: anOption.name };
    options.push(arrayOfOptions);
    return options;
  });
};

export default groupOptions;
