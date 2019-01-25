/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import GroupIndex from '..';

const testText = 'name';
const testFunc = jest.fn();
const props = {
  groups: {
    isFetching: true,
    groups: [{
      name: testText,
      users: [],
      permissions: [{ cms: 'cmss' }],
    }],
  },
  redirectTo: testFunc,
  handleCheckBoxChange: testFunc,
  handeMainCheckBoxChange: testFunc,
  confirmDeleteGroup: testFunc,
  bulkDeleteGroups: testFunc,
};
const wrapper = mount(<GroupIndex {...props} />);

describe('<GroupIndex /> ', () => {
  it('renders GroupIndex component without crashing', () => {
    wrapper.debug();
  });
});