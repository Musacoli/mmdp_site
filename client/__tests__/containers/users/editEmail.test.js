/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import {
  EditEmail,
  mapStateToProps,
} from '../../../containers/Users/editEmail';
import fetchedGroups from '../../../__mocks__/fetchGroups';
import user from '../../../__mocks__/fetchUserData';

const state = {
  userEdit: jest.fn(),
  groups: jest.fn(),
};

const props = {
  data: {
    newEmail: '',
  },
  userEdit: {
    isEditing: false,
  },
  status: false,
  success: false,
  editEmail: jest.fn(),
  allGroups: jest.fn(),
  fetchedUser: jest.fn(),
  match: {
    params: { email: 'name@domain.com' },
  },
  groups: {
    groups: fetchedGroups,
  },
  fetchOneUser: {
    singleUser: user.fetchedUsersData[0],
  },
};

const wrapper = mount(<EditEmail {...props} />);

describe('<EditEmail />', () => {
  it('Maps state to props', () => {
    expect(mapStateToProps(state)).toEqual(state);
  });

  it('renders form component as expected', () => {
    expect(wrapper.find('Form').length).toBe(1);
  });

  it('calls the onSubmit function', () => {
    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const e = { preventDefault: () => {} };
    const data = {};
    wrapper.instance().onSubmit(e, data);
    expect(onSubmitSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onChange function', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    const e = { target: { name: '', value: '' } };
    const data = {};
    wrapper.instance().onChange(e, data);
    expect(onChangeSpy.mock.calls.length).toEqual(1);
  });

  it('calls the handleChange function', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
    const data = [{ value: '5c52bf9dfed75d1ec044c7fb', label: 'Cordinator' }];
    wrapper.instance().handleChange(data);
    expect(onChangeSpy.mock.calls.length).toEqual(1);
  });
});
