import React from 'react';
import { shallow } from 'enzyme';

import Login from '../../../components/LoginView/LoginView';

describe('<LoginView /> ', () => {
  it('renders LoginView component without crashing', () => {
    shallow(<Login />);
  });
});
