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
const groups = {
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
  group: {},
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
  match: { params: {} },
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
    wrapper.instance().handleSubmit(event);
    wrapper.instance().handleInputChange(event);
    wrapper.instance().handleSelectChange([]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().componentWillUnmount();
    wrapper.instance().componentDidMount();
  });
});
