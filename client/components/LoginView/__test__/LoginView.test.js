import React from 'react';
import { shallow } from 'enzyme';
import LoginView from '../LoginView';

describe('<LoginView /> ', () => {
  it('renders LoginView component without crashing', () => {
    shallow(<LoginView />);
  });
});
