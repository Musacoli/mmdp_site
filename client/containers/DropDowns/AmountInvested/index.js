import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as amountActions from '../../../store/actions/dropdowns/amountInvested';
import AmountInvested from '../../../components/DropDowns/AmountInvested';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class AmounntInvestedOption extends Component {
  static propTypes = {
    addAmount: PropTypes.func,
    fetchAmount: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchAmount } = this.props;
    fetchAmount();
  }

  componentDidUpdate() {
    const { loading, investments } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      investments.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== investments.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: investments, refresh: false });
    } else if (investments.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: investments, refresh: false });
    }
  }

  addTempAmount = () => {
    const { dropdowns } = this.state;
    const investments = dropdowns.slice();
    investments.push({
      amountInvestedRange: '',
      description: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: investments });
  };

  editAmount = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const investments = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const stateIndex = investments.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    investments[stateIndex] = data;
    this.setState({ dropdowns: investments });
  };

  deleteAAmount = (item) => {
    const { deleteAmount } = this.props;
    const { dropdowns } = this.state;
    const investments = dropdowns.slice();
    if (item._id) {
      deleteAmount({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = investments.indexOf(item);
    if (index > -1) {
      investments.splice(index, 1);
    }
    this.setState({ dropdowns: investments });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addAmount } = this.props;
    const investments = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (
        data.amountInvestedRange.trim() === '' ||
        data.amountInvestedRange === undefined
      ) {
        data.errors = data.errors ? data.errors : {};
        data.errors.amountInvestedRange =
          'Please enter an investment range eg. 500-1000';
        errors.push(data.errors.amountInvestedRange);
      }
      return investments.push(data);
    });
    const editData = filterDropdowns(investments, hasId);
    const addData = filterDropdowns(investments, hasNoId);

    editData.map((item) => {
      function condition(AmountData) {
        return AmountData.amountInvestedRange === item.amountInvestedRange;
      }
      const duplicates = addData.filter(condition);
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.amountInvestedRange = `${
          value.amountInvestedRange
        } Amount Investement Range Already exists`;
        errors.push(value);
        return this.editAmount(value, false);
      });
    });
    this.setState({ dropdowns: investments });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addAmount({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addAmount({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  render() {
    const { dropdowns } = this.state;
    return (
      <AmountInvested
        dropdowns={dropdowns}
        {...this.props}
        addTempAmount={this.addTempAmount}
        editAmount={this.editAmount}
        handleSubmit={this.handleSubmit}
        deleteAAmount={this.deleteAAmount}
      />
    );
  }
}

export const mapStateToProps = (state) => ({
  investments: state.amountInvested.data,
  loading: state.amountInvested.loading,
});

export const mapDispatchToProps = {
  addAmount: amountActions.addAmount,
  fetchAmount: amountActions.fetchAmount,
  deleteAmount: amountActions.deleteAmount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmounntInvestedOption);
