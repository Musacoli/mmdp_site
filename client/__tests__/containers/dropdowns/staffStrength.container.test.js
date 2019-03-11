import React from 'react';
import { mount } from 'enzyme';
import { StaffStrengthDropdown } from '../../../containers/DropDowns/StaffStrength';

describe('< StaffStrengthDropdown/>', () => {
  let wrapper;
  let props;
  const staffStrength = '40 - 55';
  beforeEach(() => {
    props = {
      addStaffStrengths: jest.fn(),
      fetchStaffStrengths: jest.fn(),
      deleteStaffStrength: jest.fn(),
      updateStaffStrengths: jest.fn(),
      loading: false,
      staffStrengths: {
        staffStrength: [
          {
            _id: '5c989d6840be251ad7a602cf',
            __v: 0,
            staffStrength: '30 - 40',
            description: 'testing',
          },
          {
            _id: '5c989d6840be251ad7a602d0',
            __v: 0,
            staffStrength: '40 - 55',
            description: 'testing2',
          },
        ],
      },
    };
    wrapper = mount(<StaffStrengthDropdown {...props} />);
  });
  it('should render Staff Strength component without crashing', () => {
    expect(wrapper.find('StaffStrengthDropdown').length).toEqual(1);
  });
  it('should add temp state', () => {
    wrapper.instance().addNewDropdown();
    wrapper.instance().handleChange(props.staffStrengths.staffStrength[0]);
    wrapper
      .instance()
      .deleteAStaffStrength(props.staffStrengths.staffStrength[0]);
    wrapper
      .instance()
      .deleteAStaffStrength(props.staffStrengths.staffStrength[1]);
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].staffStrength).toEqual(staffStrength);
  });
});
