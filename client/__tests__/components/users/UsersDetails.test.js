/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import UsersDetails from '../../../components/Users/UsersDetails';
import user from '../../../__mocks__/fetchUserData';

const state = {
  deleteModalOpen: false,
  selectedUser: null,
};

const props = {
  deleteUser: jest.fn(),
};

const wrapper = mount(
  <UsersDetails users={user.fetchedUsersData} {...props} {...state} />,
);

describe('<UsersDetails /> ', () => {
  it('DisplayUsers with necessary data', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });

  it('test hideDeleteModal', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'hideDeleteModal');
    wrapper.instance().hideDeleteModal();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });

  it('test showDeleteModal', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });

  it('test handleDelete', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleDelete');
    wrapper.instance().state = { selectedUser: user.fetchedUsersData };
    wrapper.instance().handleDelete();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });
});
