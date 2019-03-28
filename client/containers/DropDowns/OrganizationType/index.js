/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getOrganizationTypeRequest,
  updateOrganizationTypeRequest,
  addOrganizationTypeRequest,
  deleteOrganizationTypeRequest,
} from '../../../store/actions/dropdowns/organizationType';
import OrganizationTypeForm from '../../../components/DropDowns/OrganizationType';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class OrganizationTypeDropdown extends Component {
  state = {
    dropdowns: [],
  };

  componentDidMount() {
    const { getItems } = this.props;
    getItems();
  }

  static getDerivedStateFromProps(props) {
    if (props.organizationTypes) {
      return { dropdowns: props.organizationTypes || [] };
    }
    return '';
  }

  addNewDropdown = () => {
    const { dropdowns } = this.state;
    const newArray = dropdowns;
    newArray.push({
      typeName: '',
      description: '',
      id: dropdowns.length,
    });
    this.setState({ dropdowns: newArray });
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
    const { updateItems, addItems } = this.props;

    const states = [];
    const errors = [];

    const updatedData = filterDropdowns(dropdowns, hasId);
    const addedData = filterDropdowns(dropdowns, hasNoId);

    const Duplicates = (duplicates) => {
      duplicates.map((value) => {
        value.errors = value.errors ? value.errors : {};
        value.errors.typeName = `${value.typeName} Organization Type Exists`;
        errors.push(value);
        return this.handleChange(value, false);
      });
    };

    updatedData.map((item) => {
      function condition(data) {
        return data.typeName === item.typeName;
      }
      const duplicates = addedData.filter(condition);
      return Duplicates(duplicates);
    });

    if (updatedData.length === 0 && addedData.length > 0) {
      addedData.map((item) => {
        function condition(data) {
          if (data.id !== item.id) {
            return data.typeName === item.typeName;
          }
        }
        const duplicates = addedData.filter(condition);
        return Duplicates(duplicates);
      });
    }

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (data.typeName.trim() === '' || data.typeName === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.typeName = 'Please enter a the Organization Type';
        errors.push(data.errors.typeName);
      }
      return states.push(data);
    });

    this.setState({ dropdowns: states });

    if (errors.length < 1) {
      if (updatedData.length > 0) {
        updateItems({ data: updatedData });
      }
      if (addedData.length > 0) {
        addItems({ data: addedData });
      }
    }
  };

  deleteOrganizationType = (item) => {
    const { deleteItems } = this.props;
    const { dropdowns } = this.state;
    const newArray = dropdowns;
    if (item._id) {
      deleteItems({ id: item._id });
    }
    const index = newArray.indexOf(item);
    if (index > -1) {
      newArray.splice(index, 1);
    }
    this.setState({ dropdowns: newArray });
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <OrganizationTypeForm
        dropdowns={dropdowns}
        addNewDropdown={this.addNewDropdown}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        deleteOrganizationType={this.deleteOrganizationType}
      />
    );
  }
}

OrganizationTypeDropdown.prototypes = {
  getItems: PropTypes.func.isRequired,
  updateItems: PropTypes.func.isRequired,
  addItems: PropTypes.func.isRequired,
  deleteItems: PropTypes.func.isRequired,
  organizationTypes: PropTypes.shape([]).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  organizationTypes: state.ogranizationType.data,
  loading: state.ogranizationType.loading,
});

const mapDispatchToProps = {
  getItems: getOrganizationTypeRequest,
  updateItems: updateOrganizationTypeRequest,
  addItems: addOrganizationTypeRequest,
  deleteItems: deleteOrganizationTypeRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationTypeDropdown);
