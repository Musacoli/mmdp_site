import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveSidebarIndex } from '../../store/actions';
import Sidebar from '../../components/Sidebar';
import sideBarItems from './sidebarItems';

export class SidebarContainer extends Component {
  static propTypes = {
    activateSidebarMenu: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired,
    history: PropTypes.shape({}),
    children: PropTypes.node,
    title: PropTypes.string,
  };

  state = {};

  handleClick = (menuIndex) => {
    const { activateSidebarMenu, activeIndex } = this.props;
    const newIndex = activeIndex === menuIndex ? -1 : menuIndex;

    activateSidebarMenu({ activeIndex: newIndex });
  };

  goTo = (path, menuIndex) => {
    const { history } = this.props;
    if (path) history.push(path);
    this.handleClick(menuIndex);
  };

  render() {
    const { activeIndex, children, title } = this.props;

    return (
      <Sidebar
        activeIndex={activeIndex}
        goTo={this.goTo}
        handleClick={this.handleClick}
        sidebarItems={sideBarItems()}
        title={title}
        {...this.props}
      >
        {children}
      </Sidebar>
    );
  }
}

export const mapStateToProps = (state) => ({
  activeIndex: state.sidebar.activeIndex,
});

export const mapDispatchToProps = {
  activateSidebarMenu: setActiveSidebarIndex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarContainer);
