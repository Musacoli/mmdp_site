/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import {
  EditEmail,
  mapStateToProps,
} from '../../../containers/Users/editEmail';

const state = {
  userEdit: jest.fn(),
};

const props = {
  data: {
    newEmail: '',
  },
  status: false,
  success: false,
  editEmail: jest.fn(),
  match: {
    params: { email: 'name@domain.com' },
  },
};

const wrapper = mount(<EditEmail {...props} />);

describe('<EditEmail />', () => {
  it('Maps state to props', () => {
    expect(mapStateToProps(state)).toEqual(state.userEdit);
  });

  it('renders form component as expected', () => {
    expect(wrapper.find('Form').length).toBe(1);
  });

  it('test componentWillReceiveProps', () => {
    const spy = jest.spyOn(EditEmail.prototype, 'componentWillReceiveProps');
    wrapper.instance().componentWillReceiveProps(props);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('calls the onSubmit function', () => {
    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    const e = { preventDefault: () => {} };
    const data = {};
    wrapper.instance().onSubmit(e, data);
    expect(onSubmitSpy.mock.calls.length).toEqual(1);
  });
});
