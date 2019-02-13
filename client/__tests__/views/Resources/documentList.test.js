/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import DocumentList from '../../../views/Resources/Document/DocumentList';

describe('<DocumentList /> ', () => {
  it('renders DocumentList component without crashing', () => {
    shallow(<DocumentList />);
  });
});
