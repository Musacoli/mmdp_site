import React from 'react';
import { mount } from 'enzyme';
import ManageVolunteers from '../../../containers/Resources/StakeHolders/addStakeholder/manageVolunteers';

describe('Page navigation', () => {
  const fn = jest.fn();
  const props = {
    onChange: fn,
    updateRequiredFields: () => {},
    data: {
      volunteersCount: 0,
    },
  };

  it('should load correctly', () => {
    const wrapper = mount(<ManageVolunteers {...props} />);
    expect(wrapper.find('InputDropDown').length).toBe(1);
    expect(wrapper.find('TextInput').length).toBe(1);
  });

  it('should handle change', () => {
    props.data.volunteersCount = 10;
    const wrapper = mount(<ManageVolunteers {...props} />);
    wrapper.find('Dropdown').simulate('click');
    wrapper
      .find('DropdownItem')
      .at(1)
      .simulate('click');
    wrapper
      .find('input[name="volunteersCount"]')
      .simulate('change', { target: { input: 9 } });
    wrapper.find('input[name="volunteersCount"]').simulate('click');
    wrapper
      .find('input[name="volunteersCount"]')
      .simulate('change', { target: { input: 9 } });
    expect(fn).toHaveBeenCalled();
  });
});
