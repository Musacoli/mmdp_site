import React from 'react';

import { getOptions } from '../../../components/resources/Stakeholders/SearchFilters.test';
import DropdownSearchQuery from '../../../../containers/Resources/StakeHolders/DropDownSearch';
import { mountWithProvider } from '../../../common/utils';

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
    wrapper = mountWithProvider(<DropdownSearchQuery {...props} />);
  });

  it('should render without crashing', () => {
    expect(wrapper.find('Dropdown').length).toEqual(1);
  });
});
