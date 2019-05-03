import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fundingActions from '../../../store/actions/dropdowns/funding';
import Funding from '../../../components/DropDowns/SourceOfFunding';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class SourceOfFunding extends Component {
  static propTypes = {
    addFunding: PropTypes.func,
    fetchFunding: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchFunding } = this.props;
    fetchFunding();
  }

  componentDidUpdate() {
    const { loading, fundings } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      fundings.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== fundings.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: fundings, refresh: false });
    } else if (fundings.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: fundings, refresh: false });
    }
  }

  addTempFunding = () => {
    const { dropdowns } = this.state;
    const fundings = dropdowns.slice();
    fundings.push({
      sourceOfFundingName: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: fundings });
  };

  editFunding = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const fundings = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const stateIndex = fundings.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    fundings[stateIndex] = data;
    this.setState({ dropdowns: fundings });
  };

  deleteAFunding = (item) => {
    const { deleteFunding } = this.props;
    const { dropdowns } = this.state;
    const fundings = dropdowns.slice();
    if (item._id) {
      deleteFunding({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = fundings.indexOf(item);
    if (index > -1) {
      fundings.splice(index, 1);
    }
    this.setState({ dropdowns: fundings });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addFunding } = this.props;
    const fundings = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (
        data.sourceOfFundingName.trim() === '' ||
        data.sourceOfFundingName === undefined
      ) {
        data.errors = data.errors ? data.errors : {};
        data.errors.sourceOfFundingName = 'Please enter a name';
        errors.push(data.errors.sourceOfFundingName);
      }
      return fundings.push(data);
    });
    // validate stateName duplicates
    const editData = filterDropdowns(fundings, hasId);
    const addData = filterDropdowns(fundings, hasNoId);

    editData.map((item) => {
      function condition(fundingData) {
        return fundingData.sourceOfFundingName === item.sourceOfFundingName;
      }
      const duplicates = addData.filter(condition);
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.sourceOfFundingName =`${value.sourceOfFundingName} source of funding name exists`;
        errors.push(value);
        return this.editFunding(value, false);
      });
    });
    this.setState({ dropdowns: fundings });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addFunding({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addFunding({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <Funding
        dropdowns={dropdowns}
        {...this.props}
        addTempFunding={this.addTempFunding}
        editFunding={this.editFunding}
        handleSubmit={this.handleSubmit}
        deleteAFunding={this.deleteAFunding}
      />
    );
  }
}

export const mapStateToProps = (state) => ({
  fundings: state.funding.data,
  loading: state.funding.loading,
});

export const mapDispatchToProps = {
  addFunding: fundingActions.addFunding,
  fetchFunding: fundingActions.fetchFunding,
  deleteFunding: fundingActions.deleteFunding,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SourceOfFunding);
