/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import DisplayUsers from '../../../components/Users/USersDetails';
import user from '../../../__mocks__/fetchUserData';

const props = {
  showDeleteModal: jest.fn(),
  deleteUser: jest.fn(),
  history: jest.fn(),
  users: user.fetchedUsersData,
};

const wrapper = mount(
  <DisplayUsers
    users={user.fetchedUsersData}
    {...props}
    onclick={props.showDeleteModal}
  />,
);

describe('<DisplayUsers /> ', () => {
  it('DisplayUsers with necessary data', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('test showDeleteModal', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal(user[0]);
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });

  it('test hideDeleteModal', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'hideDeleteModal');
    wrapper.instance().hideDeleteModal();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });

  it('test handleDelete', () => {
    /* eslint-disable prefer-destructuring */
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleDelete');
    wrapper.state().selectedUser = user.fetchedUsersData[0];
    wrapper.instance().handleDelete();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });
});
