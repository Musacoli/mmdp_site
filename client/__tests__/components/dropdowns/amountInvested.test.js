import React from 'react';
import { mount } from 'enzyme';
import AmountInvested from '../../../components/DropDowns/AmountInvested';

describe('<AmountInvested />', () => {
  const props = {
    getAmount: jest.fn(),
    dropdowns: [
      {
        description: 'asdfasdf',
        amountInvestedRange: '500-1000',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        description: 'asdfasdf',
        amountInvestedRange: '800-5000',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
    ],
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    addNewDropDown: jest.fn(),
    handleDelete: jest.fn(),
    loading: false,
    fundings: [],
  };
  const wrapper = mount(<AmountInvested {...props} />);
  it('should render Amount Invested component without crashing', () => {
    expect(wrapper.find('AmountInvested').length).toEqual(1);
  });
});
