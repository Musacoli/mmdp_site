/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import GroupForm from '../../../views/Group/GroupForm';

describe('<GroupForm /> ', () => {
  it('renders GroupForm component without crashing', () => {
    shallow(<GroupForm />);
  });
});
