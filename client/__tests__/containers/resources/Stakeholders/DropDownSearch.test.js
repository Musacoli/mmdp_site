import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '../../../../store';

import { getOptions } from '../../../components/resources/Stakeholders/SearchFilters.test';
import DropdownSearchQuery from '../../../../containers/Resources/StakeHolders/DropDownSearch';

describe('DropDownSearch', () => {
  const props = {
    options: getOptions(),
    placeHolder: 'Placeholder',
    getLGAs: jest.fn(),
    isSecondary: false,
    filterByState: jest.fn(),
    filterByLGA: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={Store}>
        <DropdownSearchQuery {...props} />
      </Provider>,
    );
  });

  it('should render without crashing', () => {
    expect(wrapper.find('Dropdown').length).toEqual(1);
  });
});
