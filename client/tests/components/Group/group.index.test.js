/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import GroupIndex from '../../../components/Group';

const testText = 'name';
const testFunc = jest.fn();
const props = {
  groups: {
    isFetching: true,
    groups: [
      {
        name: testText,
        users: [],
        permissions: [{ cms: 'cmss' }],
      },
    ],
    pagination: {
      total: 1,
      currentPage: 1,
      totalPages: 1,
      previous: false,
      next: false,
    },
  },
  redirectTo: testFunc,
  handleCheckBoxChange: testFunc,
  handeMainCheckBoxChange: testFunc,
  confirmDeleteGroup: testFunc,
  bulkDeleteGroups: testFunc,
  handleSearchChange: testFunc,
  handleChangePage: testFunc,
  handleSearch: testFunc,
};
const wrapper = mount(<GroupIndex {...props} />);

describe('<GroupIndex /> ', () => {
  it('renders GroupIndex component without crashing', () => {
    wrapper.debug();
  });
});
