/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Community from '../../../views/DropDowns/Community';

describe('<Community /> ', () => {
  it('renders Community view component without crashing', () => {
    shallow(<Community />);
  });
});
