import React from 'react';
import { mount } from 'enzyme';
import {
  CompleteRegistration,
  mapStateToProps
} from '../../../containers/Users/CompleteRegistration';
import Groups from '../../../__mocks__/fetchGroups';

const state = {
  completeUserRegistration : {
    success: false,
    groups: [],
  }
};

const props = {
  success: false,
  groups: [],
  completeRegistration: jest.fn(),
  groups: Groups,
  history: { push: jest.fn(), },
  match: {
    params : {
      token: 'mmdp-mmdp'
    }
  },
};

const wrapper = mount(<CompleteRegistration {...props} />);

describe('<CompleteRegistration />', () => {
  it('should map state to props', () => {
    expect(mapStateToProps(state)).toEqual(state.completeUserRegistration);
  });

  it('should render account registration form component without crashing', () => {
    expect(wrapper.find('AccountConfirmationView').length).toBe(1);
  });

  it('calls the onSubmitHandler function', () => {
    const onSubmitHandlerSpy = jest.spyOn(wrapper.instance(), 'onSubmitHandler');
    const e = { preventDefault: jest.fn(), };
    wrapper.instance().onSubmitHandler(e);
    expect(onSubmitHandlerSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onChangeHandler function', () => {
    const onChangeHandlerSpy = jest.spyOn(wrapper.instance(), 'onChangeHandler');
    const e = {
      preventDefault: jest.fn(),
      target : {
        name: 'firstName',
        value: 'Shem'
      }
    };
    wrapper.instance().onChangeHandler(e);
    expect(onChangeHandlerSpy.mock.calls.length).toEqual(1);
  });

  it('calls the onCancelHandler function', () => {
    const onCancelHandlerSpy = jest.spyOn(wrapper.instance(), 'onCancelHandler');
    wrapper.instance().onCancelHandler();
    expect(onCancelHandlerSpy.mock.calls.length).toEqual(1);
  });
});
