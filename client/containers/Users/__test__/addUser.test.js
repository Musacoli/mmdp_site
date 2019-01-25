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
};


const wrapper = mount(<AddUser {...props} />);

describe('<AddUser />', () => {
  it('Maps state to props', () => {
    expect(mapStateToProps(state)).toEqual(state.register);
  });
})
