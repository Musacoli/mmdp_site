import React from 'react';
import { shallow } from 'enzyme';
import { LogOut } from '../../../containers/Login/logout';

describe('Logout Container', () => {
  const props = {
    history: { push: jest.fn() },
    logOutUser: () => {},
    loginStatus: {},
  };
  const wrapper = shallow(<LogOut {...props} />);
  it('renders the container without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
