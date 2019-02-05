/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import DividerTitle from '../../../components/Sidebar/DividerTitle';

describe('<DividerTitle /> ', () => {
  it('renders Divider component without crashing', () => {
    shallow(<DividerTitle title="title" />);
  });
});
