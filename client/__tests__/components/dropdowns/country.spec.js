import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Country from '../../../components/DropDowns/country';

describe('<countryComponent />', () => {
  const props = {
    dropdowns: [
      {
        countryId: '5c878ecd6d5a6b1184b93519',
        countryName: 'Ug',
        description: 'yoooooo',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        countryId: '5c878ecd6d5a6b1184b93519',
        countryName: 'Ke',
        description: 'East africa',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
    ],
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    addNewDropDown: jest.fn(),
    handleDelete: jest.fn(),
    loading: false,
  };
  const wrapper = mount(<Country {...props} />);
  it('should render country component without crashing', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
