import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as statusActions from '../../../store/actions/dropdowns/statuses';
import StatusForm from '../../../components/DropDowns/RegistrationStatus/index';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class RegistrationStatusDropdown extends Component {
  static propTypes = {
    addStatuses: PropTypes.func,
    fetchStatuses: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchStatuses } = this.props;
    fetchStatuses();
  }

  componentDidUpdate() {
    const { loading, statuses } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      statuses.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== statuses.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: statuses, refresh: false });
    } else if (statuses.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: statuses, refresh: false });
    }
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const statuses = dropdowns.slice();
    statuses.push({
      registrationStatus: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: statuses });
  };

  editAStatus = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const statuses = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const stateIndex = statuses.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    statuses[stateIndex] = data;
    this.setState({ dropdowns: statuses });
  };

  deleteAStatus = (item) => {
    const { deleteStatus } = this.props;
    const { dropdowns } = this.state;
    const statuses = dropdowns.slice();
    if (item._id) {
      deleteStatus({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = statuses.indexOf(item);
    if (index > -1) {
      statuses.splice(index, 1);
    }
    this.setState({ dropdowns: statuses });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addStatuses } = this.props;
    const statuses = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (
        data.registrationStatus === '' ||
        data.registrationStatus === undefined
      ) {
        data.errors = data.errors ? data.errors : {};
        data.errors.stateName = 'Please enter a registration status';
        errors.push(data.errors.registrationStatus);
      }

      return statuses.push(data);
    });
    // validate stateName duplicates
    const editData = filterDropdowns(statuses, hasId);
    const addData = filterDropdowns(statuses, hasNoId);

    editData.map((item) => {
      function condition(statusData) {
        return statusData.registrationStatus === item.registrationStatus;
      }
      const duplicates = addData.filter(condition);
      // console.warn(duplicates)
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.registrationStatus = `${value.registrationStatus} registration status exists`;
        errors.push(value);
        return this.editAStatus(value, false);
      });
    });
    this.setState({ dropdowns: statuses });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addStatuses({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addStatuses({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <StatusForm
        dropdowns={dropdowns}
        {...this.props}
        addTempState={this.addTempState}
        editAStatus={this.editAStatus}
        handleSubmit={this.handleSubmit}
        deleteAStatus={this.deleteAStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  statuses: state.statuses.data,
  loading: state.statuses.loading,
});

const mapDispatchToProps = {
  addStatuses: statusActions.addStatuses,
  fetchStatuses: statusActions.fetchStatuses,
  deleteStatus: statusActions.deleteStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationStatusDropdown);
