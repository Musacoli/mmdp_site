import React from 'react';
import { mount } from 'enzyme';
import Faker from 'faker';
import _ from 'lodash';
import { Provider } from 'react-redux';
import Store from '../../../../store';
import SearchFiltersRow from '../../../../components/Resources/Stakeholders/SearchFilters';

export const getOptions = () =>
  // mock test data
  _.times(3, () => {
    const name = Faker.name.findName();
    return { key: name, text: name, value: _.snakeCase(name) };
  });

describe('SearchFiltersRow', () => {
  let wrapper;
  const props = {
    states: getOptions(),
    LGAs: getOptions(),
    filterByState: jest.fn(),
    filterByLGA: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(
      <Provider store={Store}>
        <SearchFiltersRow {...props} />
      </Provider>,
    );
  });

  it('should load without breaking', () => {
    expect(wrapper.find('GridRow').length).toEqual(1);
    expect(wrapper.find('GridColumn').length).toEqual(3);
  });
});
