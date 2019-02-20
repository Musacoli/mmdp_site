/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import {
  ViewUsers,
  mapStateToProps,
} from '../../../containers/Users/ViewUsers';
import user from '../../../__mocks__/fetchUserData';
import fetchedGroups from '../../../__mocks__/fetchGroups';

const state = {
  Users: [],
  search: '',
  selectedOption: '',
};

const props = {
  fetchUsersList: jest.fn(),
  allGroups: jest.fn(),
  success: false,
  users: user.fetchedUsersData,
  groups: {
    groups: fetchedGroups,
  },
  pagination: user.pagination,
  handleSearch: jest.fn(),
  handleSearchChange: jest.fn(),
};
describe('<ViewUsers />', () => {
  let wrapper;
  let viewUsers;
  beforeEach(() => {
    wrapper = shallow(<ViewUsers {...props} />);
    viewUsers = wrapper.instance();
  });

  it('Maps state to props', () => {
    expect(mapStateToProps(state).deleteUser).toEqual(state.deleteUser);
  });

  it('renders the ViewUsers component as expected', () => {
    expect(wrapper.find('div').length).toBe(1);
  });

  it('Executes the handleSearch Event as expected', () => {
    jest.spyOn(viewUsers, 'fetchUsersList');
    viewUsers.handleSearch({ preventDefault: jest.fn() });
    expect(viewUsers.fetchUsersList).toHaveBeenCalled();
  });

  it('Executes the handleChange Event as expected', () => {
    jest.spyOn(viewUsers, 'fetchUsersList');
    viewUsers.handleChange('word');
    expect(viewUsers.fetchUsersList).toHaveBeenCalled();
  });

  it('Executes the handleSearch Event as expected', () => {
    jest.spyOn(viewUsers, 'fetchUsersList');
    viewUsers.handleSearchChange({ target: { value: 'word' } });
    expect(viewUsers.state.search).toEqual('word');
  });
});
