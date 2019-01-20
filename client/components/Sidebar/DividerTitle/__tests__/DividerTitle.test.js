/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import DividerTitle from '..';

describe('<DividerTitle /> ', () => {
  it('renders Divider component without crashing', () => {
    shallow(<DividerTitle title="title" />);
  });
});
