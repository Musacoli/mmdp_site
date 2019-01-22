/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { ViewUsers, mapStateToProps } from '../ViewUsers';
import { user } from '../../../__mocks__/fetchUserData'
const state = {
  Users: [],
};

const props = {
  fetchUsersList: jest.fn(),
  success: false,
  users: user.fetchedUsersData
};


const wrapper = mount(<ViewUsers {...props} />);
describe('<ViewUsers />', () => {
  it('Maps state to props', () => {
    expect(mapStateToProps(state)).toEqual(state.Users);
  });

  it('renders the ViewUsers component as expected', () => {
    expect(wrapper.find('GridRow').length).toBe(2);
    wrapper.unmount();
  });
});
