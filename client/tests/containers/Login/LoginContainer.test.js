import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from '../../../containers/Login';

describe('<Login /> ', () => {
  it('renders Login conatiner without crashing', () => {
    shallow(<LoginContainer />);
  });
});
