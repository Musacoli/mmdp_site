import React from 'react';
import { mount } from 'enzyme';
import { OrganizationTypeDropdown } from '../../../containers/DropDowns/OrganizationType';

describe('<LGA />', () => {
  const props = {
    getItems: jest.fn(),
    organizationTypes: [
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
    updateItems: jest.fn(),
    addItems: jest.fn(),
    deleteItems: jest.fn(),
    deleteLGAs: jest.fn(),
    loading: false,
  };
  const wrapper = mount(<OrganizationTypeDropdown {...props} />);
  it('should render OrganizationTypeDropdown component without crashing', () => {
    expect(wrapper.find('OrganizationTypeDropdown').length).toEqual(1);
  });
  it('should check for the Following LGA Functions', () => {
    wrapper.instance().handleSubmit();
    wrapper.instance().handleChange(props.organizationTypes[0]);
    wrapper.instance().deleteOrganizationType(props.organizationTypes[0]);
    wrapper.instance().addNewDropdown();
  });
});
