import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as frequencyActions from '../../../store/actions/dropdowns/frequency';
import Frequency from '../../../components/DropDowns/Frequency';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class FrequencyOption extends Component {
  static propTypes = {
    addFrequency: PropTypes.func,
    fetchFrequency: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchFrequency } = this.props;
    fetchFrequency();
  }

  componentDidUpdate() {
    const { loading, frequencies } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      frequencies.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== frequencies.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: frequencies, refresh: false });
    } else if (frequencies.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: frequencies, refresh: false });
    }
  }

  addTempFrequency = () => {
    const { dropdowns } = this.state;
    const frequencies = dropdowns.slice();
    frequencies.push({
      frequencyValue: '',
      classification: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: frequencies });
  };

  editFrequency = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const frequencies = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const stateIndex = frequencies.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    frequencies[stateIndex] = data;
    this.setState({ dropdowns: frequencies });
  };

  deleteAFrequency = (item) => {
    const { deleteFrequency } = this.props;
    const { dropdowns } = this.state;
    const frequencies = dropdowns.slice();
    if (item._id) {
      deleteFrequency({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = frequencies.indexOf(item);
    if (index > -1) {
      frequencies.splice(index, 1);
    }
    this.setState({ dropdowns: frequencies });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addFrequency } = this.props;
    const frequencies = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (
        data.classification.trim() === '' ||
        data.classification === undefined
      ) {
        data.errors = data.errors ? data.errors : {};
        data.errors.classification = 'Please enter a classification';
        errors.push(data.errors.classification);
      }
      return frequencies.push(data);
    });
    // validate frequency duplicates
    const editData = filterDropdowns(frequencies, hasId);
    const addData = filterDropdowns(frequencies, hasNoId);

    editData.map((item) => {
      function condition(frequencyData) {
        return (
          frequencyData.frequencyValue.toString() ===
            item.frequencyValue.toString() &&
          frequencyData.classification === item.classification
        );
      }
      const duplicates = addData.filter(condition);
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.frequencyValue = `frequency value of ${
          value.frequencyValue
        } already has simalar classification `;
        errors.push(value);
        return this.editFrequency(value, false);
      });
    });
    this.setState({ dropdowns: frequencies });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addFrequency({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addFrequency({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <Frequency
        dropdowns={dropdowns}
        {...this.props}
        addTempFrequency={this.addTempFrequency}
        editFrequency={this.editFrequency}
        handleSubmit={this.handleSubmit}
        deleteAFrequency={this.deleteAFrequency}
      />
    );
  }
}

export const mapStateToProps = (state) => ({
  frequencies: state.frequency.data,
  loading: state.frequency.loading,
});

export const mapDispatchToProps = {
  addFrequency: frequencyActions.addFrequency,
  fetchFrequency: frequencyActions.fetchFrequency,
  deleteFrequency: frequencyActions.deleteFrequency,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FrequencyOption);
