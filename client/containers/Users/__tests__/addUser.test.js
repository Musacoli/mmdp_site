/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { AddUser, mapStateToProps } from '../AddUser';

const state = {
  register: jest.fn(),
};

const props = {
  isRegistering: false,
  registerUser: jest.fn(),
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  status: false,
  success: false
};


const wrapper = mount(<AddUser {...props} />);

describe('<AddUser />', () => {
  it('Maps state to props', () => {
    expect(mapStateToProps(state)).toEqual(state.register);
  });

  it('renders form component as expected', () => {
    expect(wrapper.find('Form').length).toBe(1);
  });

  it('test componentWillReceiveProps', () => {
    const spy = jest.spyOn(AddUser.prototype, 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(props);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('calls the onSubmit function', () => {
    const onSubmitSpy = jest.spyOn(
      wrapper.instance(), 'onSubmit',
    );
    const e = { preventDefault: () => {
      },
    };
    const data = {};
    wrapper.instance().onSubmit(e, data);
    expect(onSubmitSpy.mock.calls.length).toEqual(1);
  });

})
