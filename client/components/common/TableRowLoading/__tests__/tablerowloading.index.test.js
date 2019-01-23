/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import TableRowLoading from '..';

describe('<TableRowLoading /> ', () => {
  it('renders TableRowLoading component without crashing', () => {
    shallow(<TableRowLoading />);
  });
});
