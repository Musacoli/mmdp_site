import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StaffStrengthForm from '../../../components/DropDowns/StaffStrength/index';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';
import {
  createStaffStrengths,
  fetchingStaffStrengths,
  // fetchStaffStrengths,
  updateStaffStrengths,
  deleteStaffStrength,
} from '../../../store/actions/dropdowns/staffStrength';

export class StaffStrengthDropdown extends Component {
  static propTypes = {
    addStaffStrengths: PropTypes.func,
    fetchStaffStrengths: PropTypes.func,
    updateStaffStrengths: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchStaffStrengths } = this.props;
    fetchStaffStrengths();
  }

  componentDidUpdate() {
    const { loading, staffStrengths } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      staffStrengths.staffStrength.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== staffStrengths.staffStrength.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: staffStrengths.staffStrength, refresh: false });
    } else if (
      staffStrengths.staffStrength.length === 0 &&
      !loading &&
      refresh
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: staffStrengths.staffStrength, refresh: false });
    }
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const staffStrengths = dropdowns.slice();
    staffStrengths.push({
      staffStrength: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: staffStrengths });
  };

  editAStaffStrength = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const staffStrengths = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const strengthIndex = staffStrengths.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    staffStrengths[strengthIndex] = data;
    this.setState({ dropdowns: staffStrengths });
  };

  deleteAStaffStrength = (item) => {
    const { deleteStaffStrength } = this.props;
    const { dropdowns } = this.state;
    const staffStrengths = dropdowns.slice();
    if (item._id) {
      deleteStaffStrength({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = staffStrengths.indexOf(item);
    if (index > -1) {
      staffStrengths.splice(index, 1);
    }
    this.setState({ dropdowns: staffStrengths });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addStaffStrengths, updateStaffStrengths } = this.props;
    const staffStrengths = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (data.staffStrength === '' || data.staffStrength === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.staffStrength = 'Please enter a staff strength';
        errors.push(data.errors.staffStrength);
      }

      return staffStrengths.push(data);
    });
    // validate staffStrength duplicates
    const editData = filterDropdowns(staffStrengths, hasId);
    const addData = filterDropdowns(staffStrengths, hasNoId);

    editData.map((item) => {
      function condition(staffStrengthData) {
        return staffStrengthData.staffStrength === item.staffStrength;
      }
      const duplicates = addData.filter(condition);
      // console.warn(duplicates)
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.staffStrength =
          value.staffStrength + ' staff strength exists';
        errors.push(value);
        return this.editAStaffStrength(value, false);
      });
    });
    this.setState({ dropdowns: staffStrengths });
    if (errors.length < 1) {
      if (editData.length > 0) {
        const staffStrength = editData.map((option) => option);
        updateStaffStrengths({ staffStrength, new: false });
      }
      if (addData.length > 0) {
        const staffStrength = addData.map((option) => option);
        addStaffStrengths({ staffStrength, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <StaffStrengthForm
        dropdowns={dropdowns}
        {...this.props}
        addTempState={this.addTempState}
        editAStaffStrength={this.editAStaffStrength}
        handleSubmit={this.handleSubmit}
        deleteAStaffStrength={this.deleteAStaffStrength}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  staffStrengths: state.staffStrengths.data,
  loading: state.staffStrengths.loading,
});

const mapDispatchToProps = {
  addStaffStrengths: createStaffStrengths,
  fetchStaffStrengths: fetchingStaffStrengths,
  updateStaffStrengths,
  deleteStaffStrength,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StaffStrengthDropdown);
