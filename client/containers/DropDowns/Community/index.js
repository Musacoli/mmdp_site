import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as communityActions from '../../../store/actions/dropdowns/communities';
import * as wardActions from '../../../store/actions/dropdowns/ward';
import CommunityList from '../../../components/DropDowns/CommunityList';
import { valueIsEmpty } from '../../../utils/validations';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class Community extends Component {
  state = {
    dropdowns: [],
    refresh: false,
    errors: false,
  };

  componentDidMount() {
    const { fetchCommunities, fetchWards } = this.props;
    fetchWards();
    fetchCommunities();
  }

  componentDidUpdate(prevState, prevProps) {
    const { communities } = this.props;
    const { refresh } = this.state;
    const data = communities || [];
    if (data !== prevProps.dropdowns && !refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: data, refresh: false });
    }
  }

  addTempCommunity = () => {
    this.setState({ refresh: true });
    const { dropdowns: communities } = this.state;
    const dropdowns = communities.slice();
    const community = {
      communityName: '',
      description: '',
      wardId: '',
      id: dropdowns.length + 1,
    };
    dropdowns.push(community);
    this.setState({ dropdowns });
  };

  editCommunity = (dropdown) => {
    const { dropdowns } = this.state;
    const communities = dropdowns.slice();
    communities[dropdown.index] = {
      ...dropdown,
      errors: {},
    };
    this.setState({ dropdowns: communities, refresh: true, errors: false });
  };

  deleteCommunity = (item) => {
    const { dropdowns } = this.state;
    const { isDeleted } = this.props;
    const { removeCommunity } = this.props;
    const communities = dropdowns.slice();
    delete communities[item.index];
    if (item._id) {
      removeCommunity({ id: item._id });
      if (!isDeleted) {
        return;
      }
    }
    delete communities[item.index];

    this.setState({ dropdowns: communities, refresh: true, errors: false });
  };

  getDuplicate = (item) => {
    const { dropdowns } = this.state;
    const duplicates = dropdowns.filter(
      (dropdown) =>
        dropdown.communityName === item.communityName &&
        dropdown.wardId === item.wardId,
    );
    return duplicates.length > 1;
  };

  dataIsValid = (form) => {
    let valid = true;
    const validated = form.map((item) => {
      const data = { ...item, errors: {} };
      if (valueIsEmpty(data.communityName)) {
        data.errors.communityName = 'Please enter community name';
        valid = false;
      }
      if (valueIsEmpty(data.wardId)) {
        data.errors.wardId = 'Please select a  ward';
        valid = false;
      }
      const duplicate = this.getDuplicate(item);
      if (duplicate && item._id === undefined) {
        data.errors.communityName = `${
          data.communityName
        } community name exists`;
        valid = false;
      }
      return data;
    });
    this.setState({ dropdowns: validated, refresh: true });
    return valid;
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    if (this.dataIsValid(dropdowns)) {
      const { addCommunity } = this.props;
      const editData = filterDropdowns(dropdowns, hasId);
      const addData = filterDropdowns(dropdowns, hasNoId);
      if (editData.length > 0) {
        addCommunity({ data: editData, new: false });
      }
      if (addData.length > 0) {
        addCommunity({ data: addData, new: true });
        this.setState({ refresh: false });
      }
    }
  };

  getWards = () => {
    const { fetchedWards } = this.props;
    const wards = fetchedWards || [];
    return wards.map((value) => {
      return { value: value._id, text: value.wardName };
    });
  };

  render() {
    const { dropdowns, errors } = this.state;
    return (
      <CommunityList
        dropdowns={dropdowns}
        editAState={this.editCommunity}
        deleteAState={this.deleteCommunity}
        wards={this.getWards()}
        errors={errors}
        {...this.props}
        addTempCommunity={this.addTempCommunity}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export const mapStateToProps = (state) => ({
  communities: state.communities.data,
  fetchedWards: state.wards.data,
  loading: state.communities.loading,
  isDeleted: state.communities.isDeleted,
});

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchWards: wardActions.fetchWards,
      fetchCommunities: communityActions.fetchCommunities,
      addCommunity: communityActions.addCommunity,
      removeCommunity: communityActions.deleteCommunity,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Community);
