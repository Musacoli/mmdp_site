/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getLGARequest,
  updateLGARequest,
  addLGARequest,
  deleteLGARequest,
} from '../../../store/actions/dropdowns/LGA';
import { fetchStates } from '../../../store/actions/dropdowns/state';
import LGAForm from '../../../components/DropDowns/LGA';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';

export class LGA extends Component {
  state = {
    dropDowns: [],
  };

  componentDidMount() {
    const { getLGAs, getStates } = this.props;
    getStates();
    getLGAs();
  }

  static getDerivedStateFromProps(props) {
    if (props.LGAItems) {
      return { dropDowns: props.LGAItems || [] };
    }
    return '';
  }

  addNewDropDown = () => {
    const { dropDowns } = this.state;
    const newLGA = dropDowns;
    newLGA.push({
      lgaName: '',
      description: '',
      stateId: '',
      id: dropDowns.length,
    });
    this.setState({ dropDowns: newLGA });
  };

  handleChange = (item, deleteErrors = true) => {
    const { dropDowns } = this.state;
    const newArray = dropDowns;

    const data = { ...item };
    const key = data._id ? '_id' : 'id';
    const index = newArray.findIndex((x) => x[key] === item[key]);

    if (deleteErrors) {
      delete data.errors;
    }

    newArray[index] = data;
    this.setState({
      dropDowns: newArray,
    });
  };

  handleSubmit = () => {
    const { dropDowns } = this.state;
    const { updateLGAs, addLGAs } = this.props;

    const states = [];
    const errors = [];

    const updatedLGAs = filterDropdowns(dropDowns, hasId);
    const addedLGAs = filterDropdowns(dropDowns, hasNoId);

    const Duplicates = (duplicates) => {
      duplicates.map((value) => {
        value.errors = value.errors ? value.errors : {};
        value.errors.lgaName = `${value.lgaName} Local Government Area exists`;
        errors.push(value);
        return this.handleChange(value, false);
      });
    };

    updatedLGAs.map((item) => {
      function condition(data) {
        return data.lgaName === item.lgaName && data.stateId === item.stateId;
      }
      const duplicates = addedLGAs.filter(condition);
      return Duplicates(duplicates);
    });

    if (updatedLGAs.length === 0 && addedLGAs.length > 0) {
      addedLGAs.map((item) => {
        function condition(data) {
          if (data.id !== item.id) {
            return (
              data.lgaName === item.lgaName && data.stateId === item.stateId
            );
          }
        }
        const duplicates = addedLGAs.filter(condition);
        return Duplicates(duplicates);
      });
    }

    // validate field required
    dropDowns.map((item) => {
      const data = item;
      if (data.lgaName.trim() === '' || data.lgaName === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.lgaName = 'Please enter a LGA';
        errors.push(data.errors.lgaName);
      }
      if (data.stateId.trim() === '' || data.stateId === undefined) {
        data.errors = data.errors ? data.errors : {};
        data.errors.stateId = 'Please select a State';
        errors.push(data.errors.stateId);
      }
      return states.push(data);
    });

    this.setState({ dropDowns: states });

    if (errors.length < 1) {
      if (updatedLGAs.length > 0) {
        updateLGAs({ data: updatedLGAs });
      }
      if (addedLGAs.length > 0) {
        addLGAs({ data: addedLGAs });
      }
    }
  };

  handleDelete = (item) => {
    const { deleteLGAs } = this.props;
    const { dropDowns } = this.state;
    const LGAs = dropDowns;
    if (item._id) {
      deleteLGAs({ id: item._id });
    }
    const index = LGAs.indexOf(item);
    if (index > -1) {
      LGAs.splice(index, 1);
    }
    this.setState({ dropDowns: LGAs });
  };

  render() {
    const { dropDowns } = this.state;
    const { states, loading } = this.props;
    return (
      <LGAForm
        loading={loading}
        dropdowns={dropDowns}
        states={states || []}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        addNewDropDown={this.addNewDropDown}
        handleDelete={this.handleDelete}
      />
    );
  }
}

LGA.prototypes = {
  getStates: PropTypes.func.isRequired,
  getLGAs: PropTypes.func.isRequired,
  updateLGAs: PropTypes.func.isRequired,
  addLGAs: PropTypes.func.isRequired,
  deleteLGAs: PropTypes.func.isRequired,
  LGAItems: PropTypes.shape({}).isRequired,
  states: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  LGAItems: state.LGA.data,
  loading: state.LGA.loading,
  states: state.states.data.map((x, index) => ({
    text: x.stateName,
    value: x._id,
    key: index,
  })),
});

const mapDispatchToProps = {
  getLGAs: getLGARequest,
  updateLGAs: updateLGARequest,
  addLGAs: addLGARequest,
  deleteLGAs: deleteLGARequest,
  getStates: fetchStates,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LGA);
