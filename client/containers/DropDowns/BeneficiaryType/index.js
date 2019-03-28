/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as beneficiaryTypeActions from '../../../store/actions/dropdowns/beneficiaryType';
import BeneficiaryTypeForm from '../../../components/DropDowns/BeneficiaryType/index';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class BeneficiaryTypeDropdown extends Component {
  static propTypes = {
    addTypes: PropTypes.func,
    fetchTypes: PropTypes.func,
  };

  state = {
    dropdowns: [],
  };

  componentDidMount() {
    const { fetchTypes } = this.props;
    fetchTypes();
  }

  static getDerivedStateFromProps(props) {
    if (props.types) {
      return { dropdowns: props.types || [] };
    }
    return '';
  }

  addNewDropDown = () => {
    const { dropdowns } = this.state;
    const newType = dropdowns;
    newType.push({
      beneficiaryTypeName: '',
      description: '',
      id: dropdowns.length,
    });
    this.setState({ dropdowns: newType });
  };

  handleChange = (item, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const newArray = dropdowns;

    const data = { ...item };
    const key = data._id ? '_id' : 'id';
    const index = newArray.findIndex((x) => x[key] === item[key]);

    if (deleteErrors) {
      delete data.errors;
    }

    newArray[index] = data;
    this.setState({
      dropdowns: newArray,
    });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { updateTypes, addTypes } = this.props;
    const elementsWithErrors = [];
    const errors = [];

    const updatedTypes = filterDropdowns(dropdowns, hasId);
    const addedTypes = filterDropdowns(dropdowns, hasNoId);

    const Duplicates = (duplicates) => {
      duplicates.map((value) => {
        value.errors = value.errors ? value.errors : {};
        value.errors.beneficiaryTypeName = `${
          value.beneficiaryTypeName
        } Beneficiary Type exists`;
        errors.push(value);
        return this.handleChange(value, false);
      });
    };

    updatedTypes.map((item) => {
      function condition(data) {
        return data.beneficiaryTypeName === item.beneficiaryTypeName;
      }
      const duplicates = addedTypes.filter(condition);
      return Duplicates(duplicates);
    });

    if (updatedTypes.length === 0 && addedTypes.length > 0) {
      addedTypes.map((item) => {
        function condition(data) {
          if (data.id !== item.id) {
            return data.beneficiaryTypeName === item.beneficiaryTypeName;
          }
        }
        const duplicates = addedTypes.filter(condition);
        return Duplicates(duplicates);
      });
    }

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (
        data.beneficiaryTypeName.trim() === '' ||
        data.beneficiaryTypeName === undefined
      ) {
        data.errors = data.errors ? data.errors : {};
        data.errors.beneficiaryTypeName = 'Please enter a Beneficiary Type';
        errors.push(data.errors.beneficiaryTypeName);
      }
      return elementsWithErrors.push(data);
    });

    this.setState({ dropdowns: elementsWithErrors });

    if (errors.length < 1) {
      if (updatedTypes.length > 0) {
        updateTypes({ data: updatedTypes });
      }
      if (addedTypes.length > 0) {
        addTypes({ data: addedTypes });
      }
    }
  };

  handleDelete = (item) => {
    const { deleteTypes } = this.props;
    const { dropdowns } = this.state;
    const Types = dropdowns;
    if (item._id) {
      deleteTypes({ id: item._id });
    }
    const index = Types.indexOf(item);
    if (index > -1) {
      Types.splice(index, 1);
    }
    this.setState({ dropdowns: Types });
  };

  render() {
    const { dropdowns } = this.state;
    const { loading } = this.props;
    return (
      <BeneficiaryTypeForm
        loading={loading}
        dropdowns={dropdowns}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        addNewDropDown={this.addNewDropDown}
        handleDelete={this.handleDelete}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  types: state.beneficiaryTypes.data,
  loading: state.beneficiaryTypes.loading,
});

const mapDispatchToProps = {
  addTypes: beneficiaryTypeActions.addTypes,
  fetchTypes: beneficiaryTypeActions.fetchTypes,
  deleteTypes: beneficiaryTypeActions.deleteType,
  updateTypes: beneficiaryTypeActions.updateType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BeneficiaryTypeDropdown);
