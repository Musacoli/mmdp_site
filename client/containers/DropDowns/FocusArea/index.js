import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as subThemesActions from '../../../store/actions/dropdowns/subTheme';
import * as focusAreaActions from '../../../store/actions/dropdowns/focusArea';
import FocusAreaForm from '../../../components/DropDowns/FocusArea';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class FocusAreaOption extends Component {
  static propTypes = {
    subTheme: PropTypes.arrayOf(PropTypes.shape({})),
    addFocusArea: PropTypes.func,
    fetchFocusArea: PropTypes.func,
  };

  state = {
    dropdowns: [],
    refresh: true,
  };

  componentDidMount() {
    const { fetchFocusArea, fetchSubthemes } = this.props;
    fetchFocusArea();
    fetchSubthemes();
  }

  componentDidUpdate() {
    const { loading, focusAreas } = this.props;
    const { dropdowns, refresh } = this.state;
    const filtered = filterDropdowns(dropdowns, hasId);

    if (
      focusAreas.length > 0 &&
      !loading &&
      refresh &&
      filtered.length !== focusAreas.length
    ) {
      // eslint-disable-next-line
      this.setState({ dropdowns: focusAreas, refresh: false });
    } else if (focusAreas.length === 0 && !loading && refresh) {
      // eslint-disable-next-line
      this.setState({ dropdowns: focusAreas, refresh: false });
    }
  }

  addTempFocusArea = () => {
    const { dropdowns } = this.state;
    const focusAreas = dropdowns.slice();
    focusAreas.push({
      focusAreaName: '',
      description: '',
      subThemeId: '',
      id: dropdowns.length + 1,
    });
    this.setState({ dropdowns: focusAreas });
  };

  editFocusArea = (dropdown, deleteErrors = true) => {
    const { dropdowns } = this.state;
    const focusAreas = dropdowns.slice();

    const data = { ...dropdown };
    const key = dropdown._id ? '_id' : 'id';
    const focusAreaIndex = focusAreas.findIndex(
      (item) => item[key] === data[key],
    );
    if (deleteErrors) {
      delete data.errors;
    }

    focusAreas[focusAreaIndex] = data;
    this.setState({ dropdowns: focusAreas });
  };

  deleteAFocusArea = (item) => {
    const { deleteFocusArea } = this.props;
    const { dropdowns } = this.state;
    const focusAreas = dropdowns.slice();
    if (item._id) {
      deleteFocusArea({ id: item._id });
      this.setState({ refresh: true });
      return false;
    }
    const index = focusAreas.indexOf(item);
    if (index > -1) {
      focusAreas.splice(index, 1);
    }
    this.setState({ dropdowns: focusAreas });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addFocusArea } = this.props;
    const focusAreas = [];
    const errors = [];

    // validate field required
    dropdowns.map((item) => {
      const data = item;
      if (
        data.focusAreaName.trim() === '' ||
        data.focusAreaName === undefined
      ) {
        data.errors = data.errors ? data.errors : {};
        data.errors.focusAreaName = 'Please enter a name';
        errors.push(data.errors.focusAreaName);
      }
      if (data.subThemeId === '' || data.subThemeId === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.subThemeId = 'Please select a Sub Theme';
        errors.push(data.errors.subThemeId);
      }
      return focusAreas.push(data);
    });
    const editData = filterDropdowns(focusAreas, hasId);
    const addData = filterDropdowns(focusAreas, hasNoId);

    editData.map((item) => {
      function condition(focusAreaData) {
        return (
          focusAreaData.focusAreaName === item.focusAreaName &&
          focusAreaData.subThemeId === item.subThemeId
        );
      }

      const duplicates = addData.filter(condition);
      return duplicates.map((value) => {
        // eslint-disable-next-line
        value.errors = value.errors ? value.errors : {};
        // eslint-disable-next-line
        value.errors.focusAreaName = `${
          value.focusAreaName
        }  Focus Area name already exists`;
        errors.push(value);
        return this.editFocusArea(value, false);
      });
    });
    this.setState({ dropdowns: focusAreas });
    if (errors.length < 1) {
      if (editData.length > 0) {
        addFocusArea({ data: { data: editData }, new: false });
      }
      if (addData.length > 0) {
        addFocusArea({ data: { data: addData }, new: true });
        this.setState({ refresh: true });
      }
    }
  };

  getSubthemeOptions = () => {
    const { subTheme } = this.props;
    const options = subTheme || [];
    const subthemeOptions = [];
    options.map((value) =>
      subthemeOptions.push({ value: value._id, text: value.subThemeName }),
    );
    return subthemeOptions;
  };

  render() {
    const { dropdowns } = this.state;

    return (
      <FocusAreaForm
        dropdowns={dropdowns}
        {...this.props}
        addTempFocusArea={this.addTempFocusArea}
        editFocusArea={this.editFocusArea}
        handleSubmit={this.handleSubmit}
        deleteAFocusArea={this.deleteAFocusArea}
        subthemeOptions={this.getSubthemeOptions()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  subTheme: state.subTheme.data,
  focusAreas: state.focusArea.data,
  loading: state.focusArea.loading,
});

const mapDispatchToProps = {
  fetchSubthemes: subThemesActions.fetchSubThemes,
  addFocusArea: focusAreaActions.addFocusArea,
  fetchFocusArea: focusAreaActions.fetchFocusArea,
  deleteFocusArea: focusAreaActions.deleteFocusArea,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FocusAreaOption);
