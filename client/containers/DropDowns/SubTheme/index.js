import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as thematicPillarsActions from '../../../store/actions/dropdowns/thematicPillars';
import * as subThemeActions from '../../../store/actions/dropdowns/subTheme';
import SubThemeForm from '../../../components/DropDowns/SubTheme';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class SubTheme extends Component {
  static propTypes = {
    thematicPillars: PropTypes.arrayOf(PropTypes.shape({})),
    addSubThemes: PropTypes.func,
    fetchSubThemes: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchSubThemes, fetchThematicPillars } = this.props;
    fetchSubThemes();
    fetchThematicPillars();
  }

  componentDidUpdate() {
    const { loading, subTheme } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      subTheme.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== subTheme.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: subTheme, refresh: false });
    } else if (subTheme.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: subTheme, refresh: false });
    }
  }

  addTempState = () => {
    const { dropdowns } = this.state;
    const subThemes = dropdowns.slice();
    subThemes.push({
      subThemeName: '',
      description: '',
      thematicPillarId: '',
      edoTarget: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: subThemes });
  };

  editSubTheme = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const subThemes = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const subThemeIndex = subThemes.findIndex(
      (item) => item[key] === data[key],
    );
    if (deleteErrors) {
      delete data.errors;
    }

    subThemes[subThemeIndex] = data;
    this.setState({ dropdowns: subThemes });
  };

  deleteSubTheme = (item) => {
    const { deleteSubTheme } = this.props;
    const { dropdowns } = this.state;
    const subThemes = dropdowns.slice();
    if (item._id) {
      deleteSubTheme({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = subThemes.indexOf(item);
    if (index > -1) {
      subThemes.splice(index, 1);
    }
    this.setState({ dropdowns: subThemes });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addSubThemes } = this.props;
    const subThemes = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (data.subThemeName.trim() === '' || data.subThemeName === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.subThemeName = 'Please enter a name';
        errors.push(data.errors.subThemeName);
      }
      if (data.thematicPillarId === '' || data.thematicPillarId === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.thematicPillarId = 'Please select a thematic pillar';
        errors.push(data.errors.thematicPillarId);
      }
      if (data.edoTarget.trim() === '' || data.edoTarget === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.edoTarget = 'Please enter edo target';
        errors.push(data.errors.edoTarget);
      }
      return subThemes.push(data);
    });
    // validate wardName duplicates
    const editData = filterDropdowns(subThemes, hasId);
    const addData = filterDropdowns(subThemes, hasNoId);

    editData.map((item) => {
      function condition(subThemeData) {
        return (
          subThemeData.subThemeName === item.subThemeName &&
          subThemeData.thematicPillarId === item.thematicPillarId
        );
      }

      const duplicates = addData.filter(condition);
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.subThemeName = value.subThemeName + ' sub theme name exists';
        errors.push(value);
        return this.editSubTheme(value, false);
      });
    });
    this.setState({ dropdowns: subThemes });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addSubThemes({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addSubThemes({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  getThematicOptions = () => {
    const { thematicPillars } = this.props;
    const options = thematicPillars || [];
    const thematicOptions = [];
    options.map((value) =>
      thematicOptions.push({ value: value._id, text: value.pillarTitle }),
    );
    return thematicOptions;
  };

  render() {
    const { dropdowns } = this.state;

    return (
      <SubThemeForm
        dropdowns={dropdowns}
        {...this.props}
        addTempState={this.addTempState}
        editSubTheme={this.editSubTheme}
        handleSubmit={this.handleSubmit}
        deleteSubTheme={this.deleteSubTheme}
        thematicOptions={this.getThematicOptions()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  thematicPillars: state.thematicPillars.data,
  subTheme: state.subTheme.data,
  loading: state.subTheme.loading,
});

const mapDispatchToProps = {
  fetchThematicPillars: thematicPillarsActions.fetchThematicPillars,
  addSubThemes: subThemeActions.addSubThemes,
  fetchSubThemes: subThemeActions.fetchSubThemes,
  deleteSubTheme: subThemeActions.deleteSubTheme,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubTheme);
