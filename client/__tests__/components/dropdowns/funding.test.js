import React from 'react';
import { mount } from 'enzyme';
import Funding from '../../../components/DropDowns/SourceOfFunding';

describe('<Funding />', () => {
  const props = {
    getFunding: jest.fn(),
    dropdowns: [
      {
        description: 'asdfasdf',
        sourceOfFundingName: 'Worldvision',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        description: 'asdfasdf',
        sourceOfFundingName: 'Worldvision',
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
  const wrapper = mount(<Funding {...props} />);
  it('should render Funding component without crashing', () => {
    expect(wrapper.find('Funding').length).toEqual(1);
  });
});
