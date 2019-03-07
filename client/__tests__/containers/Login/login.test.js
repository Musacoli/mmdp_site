import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../containers/Login/index';

describe.only('Login Container', () => {
  const props = {
    loginUser: jest.fn(),
    history: { push: jest.fn() },
    LoginStatus: {
      payload: {
        status: 'success',
      },
    },
  };
  const wrapper = shallow(<Login {...props} />);
  it('renders the container without crashing', () => {
    const instance = wrapper.instance();
    const e = {
      preventDefault: () => {},
      target: {
        name: 'form data',
      },
    };
    instance.onFormSubmit(e);
    instance.onChange(e);
    instance.setState({
      username: 'admin@gmail.com',
      password: 'password',
    });
    instance.onFormSubmit(e);
  });
});
