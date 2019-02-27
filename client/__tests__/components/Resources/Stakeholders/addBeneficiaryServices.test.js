import React from 'react';
import { mount } from 'enzyme';
import BeneficiaryServicesForm from '../../../../components/Resources/Stakeholders/addBeneficiaryServices';
import { generateDropDownData } from '../../../common/stakeholders/dataGenerationFixtures';
import reduxStateData from '../../../common/stakeholders/reduxState';

describe('add beneficiary information', () => {
  const fields = [
    'LGAs',
    'states',
    'country',
    'AmountInvestedRange',
    'fundingSources',
    'focusAreas',
    'subThemes',
    'thematicPillars',
    'frequencies',
    'beneficiaryTypes',
    'targetAudiences',
  ];
  const props = {
    reduxData: reduxStateData,
    commonValues: {},
    formData: { beneficiaryServiceType: [] },
    dropDownData: generateDropDownData(fields),
    communityOptions: [],
    wardOptions: [],
    handlePrev: () => {},
    handleNext: () => {},
    handleChange: () => {},
    handleSubmit: () => {},
    handleAddNewBeneficiary: () => {},
    handleNewBeneficiaryType: () => {},
    getOptions: () => {},
    pages: 2,
    step: 2,
  };
  const wrapper = mount(<BeneficiaryServicesForm {...props} />);
  it('should render correctly', () => {
    expect(wrapper.find('ManageBeneficiaryTypes').length).toEqual(1);
    expect(wrapper.find('PageNavigation').length).toEqual(1);
    expect(wrapper.find('InputDropDown').length).toBeGreaterThan(1);
    expect(wrapper.find('TextInput').length).toBeGreaterThan(1);
  });
});
