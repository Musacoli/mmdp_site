/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { AddUser, mapStateToProps } from '../../../containers/Users/AddUser';
import fetchedGroups from '../../../__mocks__/fetchGroups';

const state = {
  register: jest.fn(),
  groups: jest.fn(),
};

const props = {
  registerUser: jest.fn(),
  allGroups: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  groups: {
    groups: fetchedGroups,
  },
  register: {
    isRegistering: false,
    status: false,
    success: false,
  },
  history: {
    push: {
      name: 'push',
    },
  },
};

const wrapper = mount(<AddUser {...props} />);

describe('<AddUser />', () => {
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
