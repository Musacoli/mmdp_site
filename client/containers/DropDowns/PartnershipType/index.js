import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/dropdowns/partnershipType';
import PartnershipTypeForm from '../../../components/DropDowns/PartnershipType';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class PartnershipType extends Component {
  static propTypes = {
    addDropdowns: PropTypes.func,
    fetchDropdowns: PropTypes.func,
    types: PropTypes.arrayOf(PropTypes.shape({})),
  };

  static defaultProps = {
    types: [],
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchDropdowns } = this.props;
    fetchDropdowns();
  }

  componentDidUpdate() {
    const { loading, types } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      types.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== types.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: types, refresh: false });
    } else if (types.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: types, refresh: false });
    }
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const types = dropdowns.slice();
    types.push({
      partnershipTypeName: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: types });
  };

  editAState = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const types = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const stateIndex = types.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    types[stateIndex] = data;
    this.setState({ dropdowns: types });
  };

  deleteAState = (item) => {
    const { deleteDropdowns } = this.props;
    const { dropdowns } = this.state;
    const types = dropdowns.slice();
    if (item._id) {
      deleteDropdowns({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = types.indexOf(item);
    if (index > -1) {
      types.splice(index, 1);
    }
    this.setState({ dropdowns: types });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addDropdowns } = this.props;
    const types = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (
        data.partnershipTypeName === '' ||
        data.partnershipTypeName === undefined
      ) {
        data.errors = data.errors ? data.errors : {};
        data.errors.partnershipTypeName = 'Please enter a name';
        errors.push(data.errors.partnershipTypeName);
      }
      return types.push(data);
    });
    // validate partnershipTypeName duplicates
    const editData = filterDropdowns(types, hasId);
    const addData = filterDropdowns(types, hasNoId);

    editData.map((item) => {
      function condition(stateData) {
        return (
          stateData.partnershipTypeName === item.partnershipTypeName &&
          stateData.countryId === item.countryId
        );
      }
      const duplicates = addData.filter(condition);
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors :{};
        // eslint-disable-next-line
        value.errors.partnershipTypeName = value.partnershipTypeName +' parnership type name exists';
        errors.push(value);
        return this.editAState(value, false);
      });
    });
    this.setState({ dropdowns: types });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addDropdowns({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addDropdowns({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <PartnershipTypeForm
        dropdowns={dropdowns}
        {...this.props}
        addTempState={this.addTempState}
        editAState={this.editAState}
        handleSubmit={this.handleSubmit}
        deleteAState={this.deleteAState}
      />
    );
  }
}

export const mapStateToProps = (state) => ({
  types: state.partnershipType.data,
  loading: state.partnershipType.loading,
});

export const mapDispatchToProps = {
  addDropdowns: actions.addPartnershipType,
  fetchDropdowns: actions.fetchPartnershipType,
  deleteDropdowns: actions.deletePartnershipType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnershipType);
