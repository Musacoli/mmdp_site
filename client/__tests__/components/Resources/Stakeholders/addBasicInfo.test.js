import React from 'react';
import { mount } from 'enzyme';
import BasicInformationForm from '../../../../components/Resources/Stakeholders/addBasicInfo';
import { generateDropDownData } from '../../../common/stakeholders/dataGenerationFixtures';

describe('test add basic info form', () => {
  const fields = [
    'staffStrengthRangeId',
    'impactTypeId',
    'states',
    'country',
    'partnershipData',
    'partnershipTypes',
    'registrationStatusId',
    'organisationTypeId',
  ];
  const props = {
    updateRequiredFields: () => {},
    handleRegistrationStatus: () => {},
    handleNext: () => {},
    handleChange: () => {},
    handleStatesOptionsUpdate: () => {},
    pages: 2,
    step: 1,
    commonValues: {},
    addressData: {},
    fieldOptions: {},
    data: { partnerships: [] },
    dropdownData: generateDropDownData(fields),
  };
  const wrapper = mount(<BasicInformationForm {...props} />);

  it('should render correctly', () => {
    expect(wrapper.find('ManagePartnerships').length).toEqual(1);
    expect(wrapper.find('Button').length).toEqual(1);
    expect(wrapper.find('InputDropDown').length).toBeGreaterThan(1);
    expect(wrapper.find('TextInput').length).toBeGreaterThan(1);
  });
});
