/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import DashboardView from '../../../views/Dashboard';

describe('<DashboardView /> ', () => {
  it('renders DashboardView component without crashing', () => {
    shallow(<DashboardView />);
  });
});
