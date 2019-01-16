/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '..';

describe('<Sidebar /> ', () => {
  it('renders Sidebar component without crashing', () => {
    shallow(<Sidebar />);
  });
});
