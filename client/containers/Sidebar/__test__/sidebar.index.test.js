/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { ReactRouterOptions } from '../../../constants';
import { SidebarContainer, mapStateToProps } from '..';

const func = jest.fn();
const state = {
  sidebar: {
    activeIndex: 1,
  },
};
const props = {
  activateSidebarMenu: func,
  activeIndex: state.sidebar.activeIndex,
  history: {
    push: func,
  },
};
const wrapper = mount(<SidebarContainer {...props} />, ReactRouterOptions);

describe('<Sidebar /> Container', () => {
  it('should map sidebar view state to props', () => {
    const componentState = mapStateToProps(state);
    expect(componentState.activeIndex).toEqual(props.activeIndex);
  });

  it('should render sidebar container without crashing', () => {
    wrapper.instance().handleClick(1);
    wrapper.instance().goTo(1);
  });
});
