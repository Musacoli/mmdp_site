import React from 'react';
import { mount } from 'enzyme';
import {
  UpdateProfile,
  mapStateToProps,
} from '../../../containers/Users/UpdateProfile';

const state = {
  updateUserProfile: {
    success: false,
  },
  fetchOneUser: {
    singleUser: {
      email: 'chinedu@mail.com',
      username: 'chinnnd',
      firstName: 'Chin',
    },
  },
};

const props = {
  success: true,
  fetchUserByToken: jest.fn(),
  updateUserProfile: jest.fn(),
  history: { push: jest.fn() },
};

const wrapper = mount(<UpdateProfile {...props} />);

describe('<UpdateProfile />', () => {
  it('should map state to props', () => {
    expect(mapStateToProps(state)).toEqual({
      ...state.updateUserProfile,
      user: { ...state.fetchOneUser.singleUser },
    });
  });

  it('calls the onSubmitHandler function', () => {
    const onSubmitHandlerSpy = jest.spyOn(
      wrapper.instance(),
      'onSubmitHandler',
    );
    const e = { preventDefault: jest.fn() };
    wrapper.instance().onSubmitHandler(e);
    expect(onSubmitHandlerSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onChangeHandler function', () => {
    const onChangeHandlerSpy = jest.spyOn(
      wrapper.instance(),
      'onChangeHandler',
    );
    const e = {
      preventDefault: jest.fn(),
      target: {
        name: 'firstName',
        value: 'Shemm',
      },
    };
    wrapper.instance().onChangeHandler(e);
    expect(onChangeHandlerSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onCancel function', () => {
    const onCancelSpy = jest.spyOn(wrapper.instance(), 'onCancel');
    wrapper.instance().onCancel();
    expect(onCancelSpy.mock.calls.length - 1).toEqual(0);
  });
});
