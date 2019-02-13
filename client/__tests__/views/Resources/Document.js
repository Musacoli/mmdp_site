/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import AddDocument from '../../../views/Resources/Document/AddDocument';

describe('<AddDocument /> ', () => {
  it('renders AddDocument component without crashing', () => {
    shallow(<AddDocument />);
  });
});
