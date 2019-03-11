import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StaffStrengthForm from '../../../components/DropDowns/StaffStrength/index';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';
import {
  createStaffStrengths,
  fetchingStaffStrengths,
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
  };

  componentDidMount() {
    const { fetchStaffStrengths } = this.props;
    fetchStaffStrengths();
  }

  static getDerivedStateFromProps(props) {
    if (props.staffStrengths) {
      return { dropdowns: props.staffStrengths.staffStrength || [] };
    }
    return '';
  }

  addNewDropdown = () => {
    const { dropdowns } = this.state;
    const staffStrengthsArray = dropdowns;
    staffStrengthsArray.push({
      staffStrength: '',
      description: '',
      id: dropdowns.length,
    });
    this.setState({ dropdowns: staffStrengthsArray });
  };

  handleChange = (option, removingErrors = true) => {
    const data = { ...option };
    const key = data._id ? '_id' : 'id';

    const { dropdowns } = this.state;

    const staffStrengthsArray = dropdowns;

    const index = staffStrengthsArray.findIndex((x) => x[key] === option[key]);

    if (removingErrors) {
      delete data.errors;
    }

    staffStrengthsArray[index] = data;
    this.setState({
      dropdowns: staffStrengthsArray,
    });
  };

  deleteAStaffStrength = (item) => {
    const { dropdowns } = this.state;
    const staffStrengths = dropdowns;

    const { deleteStaffStrength } = this.props;

    if (item._id) {
      deleteStaffStrength({ id: item._id });
    }

    const index = staffStrengths.indexOf(item);
    if (index > -1) {
      staffStrengths.splice(index, 1);
    }
    this.setState({ dropdowns: staffStrengths });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { updateStaffStrengths, addStaffStrengths } = this.props;

    const staffStrengths = [];
    const errors = [];

    const updatedStaffStrengths = filterDropdowns(dropdowns, hasId);
    const addedStaffStrengths = filterDropdowns(dropdowns, hasNoId);

    const Replicas = (copies) => {
      copies.map((result) => {
        result.errors = result.errors ? result.errors : {};
        result.errors.staffStrength = `${result.staffStrength} already exists`;
        errors.push(result);
        return this.handleChange(result, false);
      });
    };

    updatedStaffStrengths.map((item) => {
      function condition(data) {
        return (
          data.staffStrength === item.staffStrength && data._id === item._id
        );
      }
      const copies = addedStaffStrengths.filter(condition);
      return Replicas(copies);
    });

    if (addedStaffStrengths.length > 0 && updatedStaffStrengths.length === 0) {
      addedStaffStrengths.map((option) => {
        function condition(data) {
          if (data.id !== option.id) {
            return (
              data.staffStrength === option.staffStrength &&
              data._id === option._id
            );
          }
        }
        const copies = addedStaffStrengths.filter(condition);
        return Replicas(copies);
      });
    }

    // validate field required
    dropdowns.map((item) => {
      const collection = item;
      if (
        collection.staffStrength.trim() === '' ||
        collection.staffStrength === undefined
      ) {
        collection.errors = collection.errors ? collection.errors : {};
        collection.errors.staffStrength = 'Please enter a Staff Strength';
        errors.push(collection.errors.staffStrength);
      } else if (
        collection.description.trim() === '' ||
        collection.description === undefined
      ) {
        collection.errors = collection.errors ? collection.errors : {};
        collection.errors.description = 'Please enter a description';
        errors.push(collection.errors.description);
      }
      return staffStrengths.push(collection);
    });

    this.setState({ dropdowns: staffStrengths });

    if (errors.length < 1) {
      if (updatedStaffStrengths.length > 0) {
        updateStaffStrengths({ staffStrength: updatedStaffStrengths });
      }
      if (addedStaffStrengths.length > 0) {
        addStaffStrengths({ staffStrength: addedStaffStrengths });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <StaffStrengthForm
        dropdowns={dropdowns}
        addNewDropdown={this.addNewDropdown}
        handleChange={this.handleChange}
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
