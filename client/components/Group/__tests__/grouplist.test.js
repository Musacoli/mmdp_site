/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import GroupList from '../GroupList';

const testText = 'name';
const testFunc = jest.fn();
let props = {
  groups: {
    isFetching: true,
    groups: [
      {
        name: testText,
        users: [],
        permissions: [{ cms: 'cmss' }],
      },
    ],
  },
  redirectTo: testFunc,
  handleCheckBoxChange: testFunc,
  handeMainCheckBoxChange: testFunc,
  confirmDeleteGroup: testFunc,
};

const wrapper = mount(<GroupList {...props} />);

describe('<GroupList /> ', () => {
  it('renders GroupList component without crashing', () => {
    wrapper
      .find('.group-list-check-box')
      .at(1)
      .simulate('change');
  });
  it('renders GroupList component without groups item', () => {
    props = {
      ...props,
      isFetching: true,
      groups: { groups: [], isFetching: false },
    };
    mount(<GroupList {...props} />);
  });
});
