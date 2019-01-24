import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '..';

describe('<Login /> ', () => {
  it('renders Login conatiner without crashing', () => {
    shallow(<Login />);
  });
});
