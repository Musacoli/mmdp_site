import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditDropdownForm from '../../components/Stakeholders/EditDropdownForm';
import {
  // createStaffStrengths,
  fetchingStaffStrengths,
  // fetchStaffStrengths,
  // updateStaffStrengths,
  // deleteStaffStrength,
} from '../../store/actions/dropdowns/staffStrength';

export class ManageStaffStrength extends Component {
  state = {
    optionsData: [],
  };

  componentWillMount() {
    const { allStaffStrengths } = this.props;
    allStaffStrengths();
  }

  addInputData = (data) => {
    const { optionsData } = this.state;
    this.setState({
      optionsData: [...optionsData, data],
    });
  };

  // loading = () => {
  //   return true;
  // };

  onFormSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { staffStrengths } = this.props;

    let data;
    if (staffStrengths.data) {
      data = staffStrengths.data.staffStrength;
    }

    return (
      <>
        <EditDropdownForm onSubmit={this.onFormSubmit} optionsData={data} addInputData={this.addInputData}/>
      </>
    );
  }
}

ManageStaffStrength.propTypes = {
  staffStrengths: PropTypes.shape({}),
  allStaffStrengths: PropTypes.func,
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired(),
};

export const mapStateToProps = ({ staffStrengths, allStaffStrengths }) => ({
  staffStrengths,
  allStaffStrengths,
});

export const mapDispatchToProps = {
  allStaffStrengths: fetchingStaffStrengths,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageStaffStrength);
