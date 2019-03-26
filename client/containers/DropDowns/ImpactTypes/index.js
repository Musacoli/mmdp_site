import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as impactTypeActions from '../../../store/actions/dropdowns/impactTypes';
import ImpactType from '../../../components/DropDowns/ImpactType';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class ImpactTypes extends Component {
  static propTypes = {
    addImpactType: PropTypes.func,
    fetchImpactTpes: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchImpactTypes } = this.props;
    fetchImpactTypes();
  }

  componentDidUpdate() {
    const { loading, impactTypes } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);
    if (
      impactTypes.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== impactTypes.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: impactTypes, refresh: false });
    } else if (impactTypes.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: impactTypes, refresh: false });
    }
  }

  addTempImpactType = () => {
    const { dropdowns } = this.state;
    const impactTypes = dropdowns.slice();
    impactTypes.push({
      impactTypeName: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: impactTypes });
  };

  editAnImpactType = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const impactTypes = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const impactTypeIndex = impactTypes.findIndex(
      (item) => item[key] === data[key],
    );
    if (deleteErrors) {
      delete data.errors;
    }

    impactTypes[impactTypeIndex] = data;
    this.setState({ dropdowns: impactTypes });
  };

  deleteAnImpactType = (item) => {
    const { deleteAnImpactType } = this.props;
    const { dropdowns } = this.state;
    const impactTypes = dropdowns.slice();
    if (item._id) {
      deleteAnImpactType({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = impactTypes.indexOf(item);
    if (index > -1) {
      impactTypes.splice(index, 1);
    }
    this.setState({ dropdowns: impactTypes });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addImpactType } = this.props;
    const impactTypes = [];
    const errors = [];
    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (data.impactTypeName === '' || data.impactTypeName === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.impactTypeName = 'Impact Type required';
        errors.push(data.errors.impactTypeName);
      }
      // debugger
      return impactTypes.push(data);
    });
    // validate
    const editData = filterDropdowns(impactTypes, hasId);
    const addData = filterDropdowns(impactTypes, hasNoId);

    editData.map((item) => {
      function condition(impactTypeData) {
        return (
          impactTypeData.impactTypeName === item.impactTypeName &&
          impactTypeData.description === item.description
        );
      }
      const duplicates = addData.filter(condition);
      // console.warn(duplicates)
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors :{};
        // eslint-disable-next-line
        value.errors.impactTypeName = value.impactTypeName +' Impact type already exists';
        errors.push(value);
        return this.editAnImpactType(value, false);
      });
    });

    this.setState({ dropdowns: impactTypes });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addImpactType({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addImpactType({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    const impactTypeInput = [
      { key: 'direct', text: 'direct', value: 'direct' },
      { key: 'indirect', text: 'indirect', value: 'indirect' },
    ];
    return (
      <ImpactType
        dropdowns={dropdowns}
        {...this.props}
        impactTypeInput={impactTypeInput}
        addTempImpactType={this.addTempImpactType}
        editAnImpactType={this.editAnImpactType}
        handleSubmit={this.handleSubmit}
        deleteAnImpactType={this.deleteAnImpactType}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  impactTypes: state.impactTypes.data,
  loading: state.impactTypes.loading,
});

const mapDispatchToProps = {
  addImpactType: impactTypeActions.addImpactTypes,
  fetchImpactTypes: impactTypeActions.fetchImpactTypes,
  deleteAnImpactType: impactTypeActions.deleteImpactType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImpactTypes);
