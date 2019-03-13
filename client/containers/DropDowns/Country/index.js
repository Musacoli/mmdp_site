import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  getCountryDropDown,
  updateCountryDropDown,
  deleteCountryDropDown,
} from '../../../store/actions/dropdowns/country';
import {
  EditDropDownForm,
  ButtonHolder,
} from '../../../components/DropDowns/Country/CountryForm';

export class CountryDropDown extends Component {
  state = {
    dropDowns: [],
    newOption: false,
    optionsNumber: 1,
  };

  componentDidMount = () => {
    const { getCountryDropDown } = this.props;
    getCountryDropDown();
  };

  static getDerivedStateFromProps(props) {
    if (props.country && props.country.results) {
      return { dropDowns: props.country.results.data.results || [] } || '';
    }
    return '';
  }

  onChangeHandler = (e) => {
    const { dropDowns } = this.state;
    const countryName =
      e.target.parentNode.parentNode.children[0].children[1].value;
    const description =
      e.target.parentNode.parentNode.children[1].children[1].value;
    const itemId = e.target.getAttribute('sharedid');
    const countryDetail = {
      _id: itemId,
      description,
      countryName,
    };

    const dropDownsArray = dropDowns;
    const index = dropDownsArray.findIndex((x) => x._id === countryDetail._id);
    dropDownsArray[index] = countryDetail;
    this.setState({
      dropDowns: [...dropDownsArray],
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { updateCountryDropDown, getCountryDropDown } = this.props;
    const { dropDowns } = this.state;
    const dropDownsArray = dropDowns;
    const newInput = dropDowns[-1];
    const result = dropDowns.filter((dropDown, index) => index !== -1);
    this.state.dropDowns = result;
    if (newInput) {
      this.setState({ dropDowns: dropDownsArray.push(newInput) });
      updateCountryDropDown(dropDowns);
      setTimeout(() => {
        window.location.assign('/dropdowns/Country/edit');
      }, 200);
      getCountryDropDown();
    }

    updateCountryDropDown(dropDowns);
    getCountryDropDown();
  };

  addMoreOptions = (e) => {
    e.preventDefault();
    this.setState({ newOption: true });
    const { optionsNumber } = this.state;
    const totalOptions = optionsNumber + 1;
    this.setState({ optionsNumber: totalOptions });
  };

  deleteHandler = (e) => {
    e.preventDefault();
    const { deleteCountryDropDown } = this.props;
    const itemId = e.target.getAttribute('sharedid');
    deleteCountryDropDown(itemId);
  };

  render() {
    const { dropDowns, newOption, optionsNumber } = this.state;
    const result = dropDowns.filter((dropDown, index) => index !== -1);
    let results;
    if (result) {
      results = result.map((x) => (
        <EditDropDownForm
          onchangeHandler={this.onChangeHandler}
          countryName={x.countryName}
          countryDescription={x.description}
          key={x._id}
          itemId={x._id}
          delete={this.deleteHandler}
        />
      ));
    }
    let newInputs;
    const newInputsTotal = _.range(optionsNumber - 1);

    if (newInputsTotal.length > 0) {
      newInputs = newInputsTotal.map((y, index) => (
        <EditDropDownForm
          onchangeHandler={this.onChangeHandler}
          countryName=""
          countryDescription=""
          key={index}
          delete={this.deleteHandler}
        />
      ));
    }
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
          {results}
          {newOption ? <div> {newInputs}</div> : ''}
          <ButtonHolder click={this.addMoreOptions} />
        </form>
      </>
    );
  }
}

CountryDropDown.propTypes = {};

const mapStateToProps = (state) => ({
  country: state.countryDropDown,
});

const mapDispatchToProps = {
  getCountryDropDown,
  updateCountryDropDown,
  deleteCountryDropDown,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryDropDown);
