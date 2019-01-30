/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from '../../../components/Group/ActionButtons';

describe('<ActionButton /> ', () => {
  it('renders ActionButton component without crashing', () => {
    shallow(<ActionButton bulkDeleteGroups={() => {}} />);
  });
});
