import React from 'react';
import { mount } from 'enzyme';
import StaffStrengthForm from '../../../components/DropDowns/StaffStrength';

describe('<StaffStrengthForm />', () => {
  let wrapper;
  let props;
  const staffStrength = '30 - 40';
  beforeEach(() => {
    props = {
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      addNewDropDown: jest.fn(),
      deleteAStaffStrength: jest.fn(),
      item: {
        description: 'asdfasdf',
        staffStrength,
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      loading: false,
      dropdowns: [
        {
          description: 'asdfasdf',
          staffStrength,
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          description: 'asdfasdf',
          staffStrength: 'Not registered',
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<StaffStrengthForm {...props} />);
  });
  it('should render StaffStrength form component without crashing', () => {
    expect(wrapper.find('StaffStrength').length).toEqual(1);
  });
});
