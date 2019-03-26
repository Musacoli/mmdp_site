import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as lgaActions from '../../../store/actions/dropdowns/LGA';
import * as wardActions from '../../../store/actions/dropdowns/ward';
import WardForm from '../../../components/DropDowns/Ward';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class Ward extends Component {
  static propTypes = {
    lgas: PropTypes.arrayOf(PropTypes.shape({})),
    addWards: PropTypes.func,
    fetchWards: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchWards, fetchLgas } = this.props;
    fetchWards();
    fetchLgas();
  }

  componentDidUpdate() {
    const { loading, wards } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      wards.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== wards.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: wards, refresh: false });
    } else if (wards.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: wards, refresh: false });
    }
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const wards = dropdowns.slice();
    wards.push({
      wardName: '',
      description: '',
      lgaId: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: wards });
  };

  editWard = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const wards = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const wardIndex = wards.findIndex((item) => item[key] === data[key]);
    if (deleteErrors) {
      delete data.errors;
    }

    wards[wardIndex] = data;
    this.setState({ dropdowns: wards });
  };

  deleteWard = (item) => {
    const { deleteWard } = this.props;
    const { dropdowns } = this.state;
    const wards = dropdowns.slice();
    if (item._id) {
      deleteWard({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = wards.indexOf(item);
    if (index > -1) {
      wards.splice(index, 1);
    }
    this.setState({ dropdowns: wards });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addWards } = this.props;
    const wards = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (data.wardName.trim() === '' || data.wardName === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.wardName = 'Please enter a name';
        errors.push(data.errors.wardName);
      }
      if (data.lgaId === '' || data.lgaId === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.lgaId = 'Please select a local government area';
        errors.push(data.errors.lgaId);
      }
      return wards.push(data);
    });
    // validate wardName duplicates
    const editData = filterDropdowns(wards, hasId);
    const addData = filterDropdowns(wards, hasNoId);

    editData.map((item) => {
      function condition(wardData) {
        return (
          wardData.wardName === item.wardName && wardData.lgaId === item.lgaId
        );
      }

      const duplicates = addData.filter(condition);
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.wardName = value.wardName + ' ward name exists';
        errors.push(value);
        return this.editWard(value, false);
      });
    });
    this.setState({ dropdowns: wards });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addWards({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addWards({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  getLgaOptions = () => {
    const { lgas } = this.props;
    const options = lgas || [];
    const lgaOptions = [];
    options.map((value) =>
      lgaOptions.push({ value: value._id, text: value.lgaName }),
    );
    return lgaOptions;
  };

  render() {
    const { dropdowns } = this.state;

    return (
      <WardForm
        dropdowns={dropdowns}
        {...this.props}
        addTempState={this.addTempState}
        editWard={this.editWard}
        handleSubmit={this.handleSubmit}
        deleteWard={this.deleteWard}
        lgaOptions={this.getLgaOptions()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  lgas: state.LGA.data,
  wards: state.wards.data,
  loading: state.wards.loading,
});

const mapDispatchToProps = {
  fetchLgas: lgaActions.getLGARequest,
  addWards: wardActions.addWards,
  fetchWards: wardActions.fetchWards,
  deleteWard: wardActions.deleteWard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ward);
