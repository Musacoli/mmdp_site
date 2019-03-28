import React from 'react';
import { mount } from 'enzyme';
import OrganizationType from '../../../components/DropDowns/OrganizationType';

describe('<LGAComponent />', () => {
  const props = {
    getStates: jest.fn(),
    dropdowns: [
      {
        description: 'asdfasdf',
        typeName: 'Abia',
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      {
        description: 'asdfasdf',
        typeName: 'sfasdfasdfsdf',
        __v: 0,
        id: '5c90de765a04a53d87040c5e',
      },
    ],
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    addNewDropdown: jest.fn(),
    deleteOrganizationType: jest.fn(),
    loading: false,
  };
  const wrapper = mount(<OrganizationType {...props} />);
  it('should render OrganizationType component without crashing', () => {
    expect(wrapper.find('OrganizationType').length).toEqual(1);
  });
});
