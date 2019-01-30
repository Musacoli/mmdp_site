/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import GroupItem from '../../../components/Group/GroupItem';

const testText = 'name';
const testFunc = jest.fn();
const props = {
  group: { name: testText, users: [], permissions: [{ cms: 'cmss' }] },
  redirectTo: testFunc,
  handleCheckBoxChange: testFunc,
  confirmDeleteGroup: testFunc,
};


const wrapper = mount(
  <table>
    <tbody>
      <GroupItem {...props} />
    </tbody>
  </table>,
);

describe('<GroupItem /> ', () => {
  it('renders GroupItem component without crashing', () => {
    wrapper.find('.groupItem-main-checkbox').at(1).simulate('change');
    wrapper.find('.group-item-edit-dropdown').at(1).simulate('click');
  });
});
