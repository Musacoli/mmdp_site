import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setActiveSidebarIndex } from '../../store/actions';
import Sidebar from '../../components/Sidebar';

export class SidebarContainer extends Component {
  static propTypes = {
    activateSidebarMenu: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired,
    history: PropTypes.shape({}).isRequired,
  }

  state = {}

  handleClick = (menuIndex) => {
    const { activateSidebarMenu, activeIndex } = this.props;
    const newIndex = activeIndex === menuIndex ? -1 : menuIndex;

    activateSidebarMenu({ activeIndex: newIndex });
  }

  componentDidMount() {
    console.warn('This is not good')
  }

  goTo = (path, menuIndex) => {
    const { history } = this.props;
    history.push(path);
    this.handleClick(menuIndex);
  }

  render() {
    const { activeIndex } = this.props;
    return (
      <Sidebar
        activeIndex={activeIndex}
        goTo={this.goTo}
        handleClick={this.handleClick}
      />
    );
  }
}

export const mapStateToProps = state => ({
  activeIndex: state.sidebar.activeIndex,
});

export const mapDispatchToProps = {
  activateSidebarMenu: setActiveSidebarIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
