/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import AddDocument from '../../../views/Resources/Document/AddDocument';
import EditDocument from '../../../views/Resources/Document/EditDocument';

describe('<AddDocument /> ', () => {
  it('renders AddDocument component without crashing', () => {
    shallow(<AddDocument />);
  });
  it('renders EditDocument component without crashing', () => {
    shallow(<EditDocument />);
  });
});
