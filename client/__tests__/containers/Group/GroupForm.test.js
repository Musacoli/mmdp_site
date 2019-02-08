/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import {
  GroupFormContainer,
  mapStateToProps,
} from '../../../containers/Group/GroupForm';

const func = jest.fn();
const testText = 'name';
let groups = {
  groups: [
    {
      errors: {},
      name: testText,
      users: [],
      permissions: [{ cms: 'cmss' }],
    },
  ],
  isFetching: false,
  success: false,
  errors: 'adf',
  group: { name: testText, permissions: [] },
};
const state = {
  groups,
  permissions: { options: [] },
  errors: {},
};
const props = {
  permissions: { options: [] },
  options: [],
  history: {
    push: func,
  },
  groups,
  match: { params: { id: '2' } },
  getPermissions: func,
  addGroup: func,
  clearErrors: func,
  getGroup: func,
  removeGroup: func,
  editGroup: func,
};
const wrapper = mount(
  <GroupFormContainer {...props} />,
  new ReactRouterEnzymeContext(),
);

const event = {
  preventDefault: func,
  target: testText,
  value: testText,
};
describe('<GroupFormContainer /> Container', () => {
  it('should map GroupFormContainer view state to props', () => {
    const componentState = mapStateToProps(state);
    expect(componentState.groups.success).toEqual(groups.success);
  });

  it('should render GroupFormContainer container without crashing', () => {
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value: 'q' },
    });
    wrapper.instance().handleSubmit(event);
    wrapper.find('#name').simulate('change', {
      target: { name: 'name', value: testText },
    });
    wrapper.instance().handleInputChange(event);
    wrapper.instance().handleSelectChange([{ value: testText }]);
    wrapper.instance().handleSubmit(event);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().componentDidMount();
  });
  it('should render add a group', () => {
    const match = { params: {} };
    groups = { ...groups };
    groups.success = true;
    const wrapper2 = mount(
      <GroupFormContainer {...props} groups={groups} match={match} />,
      new ReactRouterEnzymeContext(),
    );
    wrapper2.find('#name').simulate('change', {
      target: { name: 'name', value: testText },
    });
    wrapper2.instance().handleInputChange(event);
    wrapper2.instance().handleSelectChange([{ value: testText }]);
    wrapper2.instance().handleSubmit(event);
  });
});
