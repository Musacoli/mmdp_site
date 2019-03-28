import React from 'react';
import { mount } from 'enzyme';
import { BeneficiaryTypeDropdown } from '../../../containers/DropDowns/BeneficiaryType';

describe('<BeneficiaryTypeDropdown />', () => {
  const props = {
    types: [
      {
        description: 'asdfasdf',
        beneficiaryTypeName: 'Refugee',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        description: 'asdfasdf',
        beneficiaryTypeName: 'Returnee',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
    ],

    addTypes: jest.fn(),
    fetchTypes: jest.fn(),
    deleteTypes: jest.fn(),
    updateTypes: jest.fn(),
    loading: false,
    states: [],
  };
  const wrapper = mount(<BeneficiaryTypeDropdown {...props} />);
  it('should render Beneficiary type dropdown component without crashing', () => {
    expect(wrapper.find('BeneficiaryTypeDropdown').length).toEqual(1);
  });
  it('should check for the Following LGA Functions', () => {
    wrapper.instance().handleSubmit();
    wrapper.instance().handleChange(props.types[0]);
    wrapper.instance().handleDelete(props.types[0]);
    wrapper.instance().addNewDropDown();
  });
});
