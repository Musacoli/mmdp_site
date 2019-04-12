/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import StateBoundaryView from '../../../views/Matrix/StatesBoundary';

describe('<StateBoundaryView /> ', () => {
  it('renders StatesBoundary View component without crashing', () => {
    shallow(<StateBoundaryView />);
  });
});
