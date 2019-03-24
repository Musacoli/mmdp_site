import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as countryActions from '../../../store/actions/dropdowns/country';
import CountryForm from '../../../components/DropDowns/Country';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class CountryDropDown extends Component {
  static propTypes = {
    fetchCountry: PropTypes.func,
    addCountry: PropTypes.func,
    deleteCountry: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchCountry } = this.props;
    fetchCountry();
  }

  componentDidUpdate() {
    const { loading, countries } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      countries.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== countries.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: countries, refresh: false });
    } else if (countries.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: countries, refresh: false });
    }
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const countries = dropdowns.slice();
    countries.push({
      countryName: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: countries });
  };

  editAStatus = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const countries = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const stateIndex = countries.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    countries[stateIndex] = data;
    this.setState({ dropdowns: countries });
  };

  deleteAStatus = (item) => {
    const { deleteCountry } = this.props;
    const { dropdowns } = this.state;
    const countries = dropdowns.slice();
    if (item._id) {
      deleteCountry({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = countries.indexOf(item);
    if (index > -1) {
      countries.splice(index, 1);
    }
    this.setState({ dropdowns: countries });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addCountry } = this.props;
    const countries = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (data.countryName === '' || data.countryName === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.countryName = 'Please enter a Country Name ';
        errors.push(data.errors.countryName);
      }

      return countries.push(data);
    });
    // validate stateName duplicates
    const editData = filterDropdowns(countries, hasId);
    const addData = filterDropdowns(countries, hasNoId);

    editData.map((item) => {
      function condition(countryData) {
        return countryData.countryName === item.countryName;
      }
      const duplicates = addData.filter(condition);
      // console.warn(duplicates)
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.countryName = `${value.countryName} country exists`;
        errors.push(value);
        return this.editAStatus(value, false);
      });
    });
    this.setState({ dropdowns: countries });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addCountry({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addCountry({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <CountryForm
        dropdowns={dropdowns}
        {...this.props}
        addTempState={this.addTempState}
        editAStatus={this.editAStatus}
        handleSubmit={this.handleSubmit}
        deleteAStatus={this.deleteAStatus}
        twoFieldsClass="two-fields"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  countries: state.country.data,
  loading: state.country.loading,
});

const mapDispatchToProps = {
  fetchCountry: countryActions.fetchCountry,
  addCountry: countryActions.addCountry,
  deleteCountry: countryActions.deleteCountry,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryDropDown);
