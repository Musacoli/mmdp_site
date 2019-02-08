import React from 'react';
import { shallow } from 'enzyme';

import AddUserView, { EditUserView } from '../index';

describe('<AddUserView /> ', () => {
  it('renders AddUserView component without crashing', () => {
    shallow(<AddUserView />);
    shallow(<EditUserView />);
  });
});
