import React from 'react';
import { mount } from 'enzyme';
import ImpactType from '../../../components/DropDowns/ImpactType';

describe('<ImpactType />', () => {
  const props = {
    getStates: jest.fn(),
    dropdowns: [
      {
        description: 'asdfasdf',
        impactTypeName: 'direct',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        description: 'asdfasdf',
        impactTypeName: 'indirect',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
    ],
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    addNewDropDown: jest.fn(),
    handleDelete: jest.fn(),
    impactTypeInput: [],
    loading: false,
    states: [],
  };
  const wrapper = mount(<ImpactType {...props} />);
  it('should render ImpactType component without crashing', () => {
    expect(wrapper.find('ImpactType').length).toEqual(1);
  });
});
