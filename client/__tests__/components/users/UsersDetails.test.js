/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import UsersDetails from '../../../components/Users/UserDetails';
import user from '../../../__mocks__/fetchUserData';

const state = {
  deleteModalOpen: false,
  selectedUser: null,
  selectedUsers: { admin: true },
};

const props = {
  deleteUser: jest.fn(),
};

let wrapper;

describe('<UsersDetails /> ', () => {
  beforeEach(() => {
    wrapper = mount(
      <UsersDetails users={user.fetchedUsersData} {...props} {...state} />,
    );
  });

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
    const showDeleteAllModal = jest.spyOn(
      wrapper.instance(),
      'showDeleteAllModal',
    );
    wrapper.instance().showDeleteModal();
    wrapper.instance().showDeleteAllModal();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
    expect(showDeleteAllModal.mock.calls.length).toEqual(1);
  });

  it('test handleDelete', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleDelete');
    const handleDeleteAll = jest.spyOn(
      wrapper.instance(),
      'handleDeleteAllUsers',
    );
    wrapper.instance().state = { selectedUser: user.fetchedUsersData };
    wrapper.instance().handleDelete();
    wrapper.instance().handleDeleteAllUsers();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
    expect(handleDeleteAll.mock.calls.length).toEqual(1);
  });

  it('test enableButton', () => {
    const spy = jest.spyOn(wrapper.instance(), 'enableButton');
    const { selectedUsers } = state;
    wrapper.instance().enableButton(selectedUsers);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('test selectRow', () => {
    const selectRowSpy = jest.spyOn(wrapper.instance(), 'selectRow');
    const selectAllRowsSpy = jest.spyOn(wrapper.instance(), 'selectAllRows');
    wrapper.instance().selectRow([{ c: true }, { v: false }], {});
    wrapper.instance().selectAllRows([]);
    expect(selectRowSpy.mock.calls.length).toEqual(1);
    expect(selectAllRowsSpy.mock.calls.length).toEqual(1);
  });
});
