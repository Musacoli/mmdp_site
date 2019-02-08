/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import editEmailView from '../editEmailView';

describe('<editEmailView /> ', () => {
  it('renders editEmailView component without crashing', () => {
    shallow(<editEmailView />);
  });
});
