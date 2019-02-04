/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Group from '../../components/Group';
import {
  fetchingGroups,
  toggleSelectGroups,
  editGroup,
  toggleDeleteGroup,
} from '../../store/actions/groups';
import {
  addGroupItem,
  addAllGroupsToCart,
  removeAllGroupsToCart,
} from '../../store/actions/groups/cart';

export class GroupContainer extends Component {
  static propTypes = {
    groups: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
    getGroups: PropTypes.func.isRequired,
    editAGroup: PropTypes.func.isRequired,
    addGroupToCart: PropTypes.func.isRequired,
    addGroupAllToCart: PropTypes.func.isRequired,
    clearGroupCart: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
    confirmDelete: PropTypes.func.isRequired,
    groupCart: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getGroups } = this.props;
    getGroups({});
  }

  redirectTo = (_id) => {
    const { history } = this.props;
    history.push(`/group/edit/${_id}`);
  };

  handeMainCheckBoxChange = (e, data) => {
    const { checked } = data;
    const {
      toggleSelected,
      addGroupAllToCart,
      groups,
      clearGroupCart,
    } = this.props;
    if (checked) {
      toggleSelected({ selected: true });
      groups.groups.map((item) => addGroupAllToCart(item._id));
    } else {
      toggleSelected({ selected: false });
      clearGroupCart({});
    }
  };

  handleCheckBoxChange = (group) => {
    const { addGroupToCart, editAGroup } = this.props;
    addGroupToCart(group._id);
    const payload = { ...group, selected: !group.selected };
    editAGroup(payload);
  };

  confirmDeleteGroup = (group) => {
    const { confirmDelete } = this.props;
    confirmDelete({ ...group, delete: true });
  };

  bulkDeleteGroups = () => {
    const { groupCart } = this.props;
    groupCart.map((item) => this.confirmDeleteGroup({ _id: item }));
  };

  render() {
    const { groups } = this.props;
    return (
      <Group
        groups={groups}
        handleCheckBoxChange={this.handleCheckBoxChange}
        handeMainCheckBoxChange={this.handeMainCheckBoxChange}
        confirmDeleteGroup={this.confirmDeleteGroup}
        bulkDeleteGroups={this.bulkDeleteGroups}
        redirectTo={this.redirectTo}
      />
    );
  }
}

export const mapStateToProps = (state) => ({
  groups: state.groups,
  groupCart: state.groupCart,
});

export const mapDispatchToProps = {
  getGroups: fetchingGroups,
  addGroupToCart: addGroupItem,
  addGroupAllToCart: addAllGroupsToCart,
  editAGroup: editGroup,
  clearGroupCart: removeAllGroupsToCart,
  toggleSelected: toggleSelectGroups,
  confirmDelete: toggleDeleteGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);
