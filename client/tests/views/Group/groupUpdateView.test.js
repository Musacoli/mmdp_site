/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Groupview from '../../../views/Group/GroupUpdateView';

describe('<Groupview /> ', () => {
  it('renders Groupview component without crashing', () => {
    shallow(<Groupview />);
  });
});
