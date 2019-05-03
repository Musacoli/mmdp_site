import _ from 'lodash';
import Faker from 'faker';

export const getOptions = (n) =>
  // mock test data
  _.times(n, () => {
    const name = Faker.name.findName();
    return { key: name, text: name, value: _.snakeCase(name) };
  });

export const generateDropDownData = (fields) => {
  const data = {};
  fields.forEach((key) => {
    data[key] = {
      data: getOptions(5),
      loading: Faker.random.boolean(),
    };
  });
  return data;
};
