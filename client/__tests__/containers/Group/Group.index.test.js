/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { ReactRouterOptions } from '../../../constants';
import { GroupContainer, mapStateToProps } from '../../../containers/Group';

const func = jest.fn();
const testText = 'name';
const groups = {
  groups: [{
    errors: {}, name: testText, users: [], permissions: [{ cms: 'cmss' }],
  }],
  isFetching: false,
  success: false,
  errors: 'adf',
  group: {},
};
const state = {
  groups,
  permissions: { options: [] },
  groupCart: [],
};
const props = {
  permissions: { options: [] },
  options: [],
  history: {
    push: func,
  },
  groups,
  match: { params: {} },
  groupCart: [],
  getPermissions: func,
  addGroup: func,
  clearErrors: func,
  getGroups: func,
  clearGroups: func,
  clearGroupCart: func,
  addGroupToCart: func,
  addGroupAllToCart: func,
  confirmDelete: func,
  removeGroup: func,
  editAGroup: func,
  toggleSelected: func,
};
const wrapper = mount(<GroupContainer {...props} />, ReactRouterOptions);

const event = {
  preventDefault: func,
  target: testText,
  value: testText,
};
describe('<GroupContainer /> Container', () => {
  it('should map GroupContainer view state to props', () => {
    const componentState = mapStateToProps(state);
    expect(componentState.groups.success).toEqual(groups.success);
  });

  it('should render GroupFormContainer container without crashing', () => {
    wrapper.instance().handeMainCheckBoxChange(event, {});
    wrapper.instance().handeMainCheckBoxChange(event, { checked: true });
    wrapper.instance().redirectTo(testText);
    wrapper.instance().handleCheckBoxChange({});
    wrapper.instance().bulkDeleteGroups();
    wrapper.instance().componentDidMount();
  });
});
