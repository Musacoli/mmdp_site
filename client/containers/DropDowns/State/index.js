import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as countryActions from '../../../store/actions/dropdowns/country';
import * as stateActions from '../../../store/actions/dropdowns/state';
import StateForm from '../../../components/DropDowns/State';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class State extends Component {
  static propTypes = {
    countries: PropTypes.arrayOf(PropTypes.shape({})),
    addStates: PropTypes.func,
    fetchStates: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchCountries, fetchStates } = this.props;
    fetchCountries();
    fetchStates();
  }

  componentDidUpdate() {
    const { loading, states } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      states.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== states.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: states, refresh: false });
    } else if (states.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: states, refresh: false });
    }
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const states = dropdowns.slice();
    states.push({
      stateName: '',
      description: '',
      countryId: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: states });
  };

  editAState = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const states = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const stateIndex = states.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    states[stateIndex] = data;
    this.setState({ dropdowns: states });
  };

  deleteAState = (item) => {
    const { deleteState } = this.props;
    const { dropdowns } = this.state;
    const states = dropdowns.slice();
    if (item._id) {
      deleteState({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = states.indexOf(item);
    if (index > -1) {
      states.splice(index, 1);
    }
    this.setState({ dropdowns: states });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addStates } = this.props;
    const states = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (data.stateName === '' || data.stateName === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.stateName = 'Please enter a name';
        errors.push(data.errors.stateName);
      }
      if (data.countryId === '' || data.countryId === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.countryId = 'Please select a country';
        errors.push(data.errors.countryId);
      }
      return states.push(data);
    });
    // validate stateName duplicates
    const editData = filterDropdowns(states, hasId);
    const addData = filterDropdowns(states, hasNoId);

    editData.map((item) => {
      function condition(stateData) {
        return (
          stateData.stateName === item.stateName &&
          stateData.countryId === item.countryId
        );
      }
      const duplicates = addData.filter(condition);
      // console.warn(duplicates)
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors :{};
        // eslint-disable-next-line
        value.errors.stateName = value.stateName +' state name exists';
        errors.push(value);
        return this.editAState(value, false);
      });
    });
    this.setState({ dropdowns: states });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addStates({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addStates({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <StateForm
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
  countries: state.country.data,
  states: state.states.data,
  loading: state.states.loading,
});

export const mapDispatchToProps = {
  fetchCountries: countryActions.fetchCountry,
  addStates: stateActions.addStates,
  fetchStates: stateActions.fetchStates,
  deleteState: stateActions.deleteState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(State);
