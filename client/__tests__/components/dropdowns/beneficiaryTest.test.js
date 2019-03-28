import React from 'react';
import { mount } from 'enzyme';
import BeneficiaryType from '../../../components/DropDowns/BeneficiaryType';

describe('<BeneficiaryType  />', () => {
  const props = {
    getStates: jest.fn(),
    dropdowns: [
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
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    addNewDropDown: jest.fn(),
    handleDelete: jest.fn(),
    loading: false,
  };
  const wrapper = mount(<BeneficiaryType {...props} />);
  it('should render BeneficiaryType component without crashing', () => {
    expect(wrapper.find('BeneficiaryType').length).toEqual(1);
  });
});
