import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import ManagePartnerships from '../../../containers/Resources/StakeHolders/addStakeholder/managePartnerships';
import { generateDropDownData } from '../../common/stakeholders/dataGenerationFixtures';

describe('Managepartnerships component', () => {
  let props;
  const onChange = (evt, { name, value }) => {
    props.data[name] = value;
  };
  const nativeEvent = { nativeEvent: { stopImmediatePropagation: _.noop } };
  const options = generateDropDownData([
    'partnershipData',
    'partnershipTypesData',
  ]);
  props = {
    data: {
      partnerships: [
        {
          stakeholder2Id: '',
          partnershipTypeId: '',
        },
      ],
    },
    partnershipData: options.partnershipData,
    partnershipTypesData: options.partnershipTypesData,
    onChange,
  };
  const wrapper = mount(<ManagePartnerships {...props} />);

  it('should load correctly', () => {
    console.log(wrapper.debug());
    expect(wrapper.find('FormSelect').length).toBe(2);
    expect(wrapper.find('Message').length).toBe(1);
  });

  it('should select partnerships types', () => {
    console.log(wrapper.debug());
    wrapper.find('Dropdown[name="partnerships"]').simulate('click');
    wrapper
      .find('DropdownItem')
      .at(0)
      .simulate('click', nativeEvent);
  });

  it('should select partnershipTypes', function() {
    wrapper.find('Dropdown[name="partnershipTypes"]').simulate('click');
    wrapper
      .find('DropdownItem')
      .at(5)
      .simulate('click', nativeEvent);
    wrapper
      .find('DropdownItem')
      .at(6)
      .simulate('click', nativeEvent);
    wrapper
      .find('DropdownItem')
      .at(7)
      .simulate('click', nativeEvent);
    wrapper
      .find('DropdownItem')
      .at(8)
      .simulate('click', nativeEvent);
  });
});
