import React from 'react';
import { mount } from 'enzyme';
import Focus from '../../../components/DropDowns/FocusArea';

describe('<Focus />', () => {
  const props = {
    getFocusArea: jest.fn(),
    dropdowns: [
      {
        description: 'asdfasdf',
        focusAreaName: 'Worldvision',
        subThemeId: '5c9b290f20bed68318c5396e',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        description: 'asdfasdf',
        focusAreaName: 'Worldvision',
        subThemeId: '5c9b290f20bed68318c5396e',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
    ],
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    addNewDropDown: jest.fn(),
    handleDelete: jest.fn(),
    loading: false,
    focusAreas: [],
  };
  const wrapper = mount(<Focus {...props} />);
  it('should render Focus component without crashing', () => {
    expect(wrapper.find('Focus').length).toEqual(1);
  });
});
