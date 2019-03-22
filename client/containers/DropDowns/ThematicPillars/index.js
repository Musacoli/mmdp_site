import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as thematicPillarActions from '../../../store/actions/dropdowns/thematicPillars';
import ThematicPillarsDropDown from '../../../components/DropDowns/ThematicPillars';
import {
  filterDropdowns,
  checkEditedData,
  hasId,
  hasNoId,
  getKeys,
  checkEmptyField,
  updateOrCreate,
} from '../../../utils/dropdowns';

export class ThematicPillars extends Component {
  static propTypes = {
    addthematicPillars: PropTypes.func,
    fetchthematicPillars: PropTypes.func,
  };

  state = {
    dropdowns: [],
  };

  componentDidMount() {
    const { fetchThematicPillars } = this.props;
    fetchThematicPillars();
  }

  static getDerivedStateFromProps(props) {
    if (props.thematicPillars) {
      return { dropdowns: props.thematicPillars || [] };
    }
    return '';
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const thematicPillars = dropdowns;
    thematicPillars.push({
      pillarTitle: '',
      description: '',
      id: dropdowns.length,
    });
    this.setState({ dropdowns: thematicPillars });
  };

  editADropdown = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const thematicPillars = dropdowns;

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const thematicPillarsIndex = thematicPillars.findIndex(
      (item) => item[key] === data[key],
    );
    if (deleteErrors) {
      delete data.errors;
    }

    thematicPillars[thematicPillarsIndex] = data;
    this.setState({ dropdowns: thematicPillars });
  };

  deleteADropdown = (item) => {
    const { deletethematicPillar } = this.props;
    const { dropdowns } = this.state;
    const thematicPillars = dropdowns;
    if (item._id) {
      deletethematicPillar({ id: item._id });
    }
    const index = thematicPillars.indexOf(item);
    if (index > -1) {
      thematicPillars.splice(index, 1);
    }
    this.setState({ dropdowns: thematicPillars });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addThematicPillar } = this.props;
    const thematicPillars = [];
    const errors = [];
    const editData = filterDropdowns(dropdowns, hasId);
    const addData = filterDropdowns(dropdowns, hasNoId);
    const baseArray = getKeys(editData, 'pillarTitle');

    checkEditedData(editData, errors, 'Thematic pillar title is duplicated');
    checkEditedData(addData, errors, 'Thematic pillar title is duplicated');
    checkEditedData(
      addData,
      errors,
      'Thematic pillar title already exist',
      baseArray,
    );
    checkEmptyField(dropdowns, thematicPillars, errors);
    this.setState({ dropdowns: thematicPillars });
    if (errors.length < 1) {
      updateOrCreate(addThematicPillar, editData, addData);
    }
  };

  render() {
    const { dropdowns } = this.state;
    const { loading } = this.props;
    return (
      <ThematicPillarsDropDown
        loading={loading}
        dropdowns={dropdowns || []}
        {...this.props}
        addTempState={this.addTempState}
        editADropdown={this.editADropdown}
        handleSubmit={this.handleSubmit}
        deleteADropdown={this.deleteADropdown}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  thematicPillars: state.thematicPillars.data,
  loading: state.thematicPillars.loading,
});

const mapDispatchToProps = {
  addThematicPillar: thematicPillarActions.addThematicPillar,
  fetchThematicPillars: thematicPillarActions.fetchThematicPillars,
  deletethematicPillar: thematicPillarActions.deletethematicPillar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThematicPillars);
