import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from '..';

describe('<Login /> ', () => {
  it('renders Login conatiner without crashing', () => {
    shallow(<LoginContainer />);
  });
});
