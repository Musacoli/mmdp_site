import React from 'react';
import { mount } from 'enzyme';
import ManageBeneficiaryTypes from '../../../containers/Resources/StakeHolders/addStakeholder/manageBeneficiaryTypes';
import { generateDropDownData } from '../../common/stakeholders/dataGenerationFixtures';

describe('beneficiary type component', () => {
  const options = generateDropDownData(['beneficiaryTypeId']);
  const fn = jest.fn();
  const props = {
    beneficiaryTypeOptions: options.beneficiaryTypeId,
    handleChange: fn,
    data: {
      beneficiaryServiceType: [
        {
          noOfFemaleBeneficiaries: 0,
          noOfMaleBeneficiaries: 0,
          totalNumberOfBeneficiaries: 0,
        },
      ],
    },
  };

  const wrapper = mount(<ManageBeneficiaryTypes {...props} />);

  it('should load correctly', () => {
    expect(wrapper.find('TextInput').length).toEqual(2);
    expect(wrapper.find('ActionModal').length).toEqual(1);
    expect(wrapper.find('InputDropDown').length).toEqual(1);
  });

  it('should delete a row', () => {
    wrapper.find('ActionModal').simulate('click');
    wrapper.update();
    expect(wrapper.find('Modal').length).toBe(1);
    wrapper.find('#actionModal-yes-button .ui').simulate('click');
    expect(fn).toHaveBeenCalled();
  });

  it('should change value on change', () => {
    // console.log(wrapper.debug());
    wrapper
      .find('input[name="noOfMaleBeneficiaries"]')
      .simulate('change', { target: { value: 9 } });
    wrapper
      .find('Icon')
      .at(0)
      .simulate('click');

    wrapper
      .find('DropdownItem')
      .at(0)
      .simulate('change', { target: { value: 9 } });
  });
});
