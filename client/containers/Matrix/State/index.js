import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as communityActions from '../../../store/actions/dropdowns/communities';
import * as wardActions from '../../../store/actions/dropdowns/ward';
import MapListing from '../../../components/common/MapListing';

export class State extends Component {
  state = {};

  render() {
    return <MapListing />;
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
)(State);
