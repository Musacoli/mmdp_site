import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TargetAudienceForm from '../../../components/DropDowns/TargetAudience/index';
import { filterDropdowns, hasId, hasNoId } from '../../../utils/dropdowns';
import {
  createTargetAudiences,
  deleteTargetAudience,
  fetchingTargetAudiences,
  updateTargetAudiences,
} from '../../../store/actions/dropdowns/targetAudience';

export class TargetAudienceDropdown extends Component {
  static propTypes = {
    addTargetAudiences: PropTypes.func,
    fetchTargetAudiences: PropTypes.func,
    updateTargetAudiences: PropTypes.func,
  };

  state = {
    dropdowns: [],
  };

  componentDidMount() {
    const { fetchTargetAudiences } = this.props;
    fetchTargetAudiences();
  }

  static getDerivedStateFromProps(props) {
    if (props.TargetAudiences) {
      return { dropdowns: props.TargetAudiences.TargetAudiences || [] };
    }
    return '';
  }

  addNewDropdown = () => {
    const { dropdowns } = this.state;
    const targetAudiencesArray = dropdowns;
    targetAudiencesArray.push({
      audienceType: '',
      description: '',
      id: dropdowns.length,
    });
    this.setState({ dropdowns: targetAudiencesArray });
  };

  handleChange = (option, removingErrors = true) => {
    const data = { ...option };
    const key = data._id ? '_id' : 'id';

    const { dropdowns } = this.state;

    const targetAudiencesArray = dropdowns;

    const index = targetAudiencesArray.findIndex((x) => x[key] === option[key]);

    if (removingErrors) {
      delete data.errors;
    }

    targetAudiencesArray[index] = data;
    this.setState({
      dropdowns: targetAudiencesArray,
    });
  };

  deleteATargetAudience = (item) => {
    const { dropdowns } = this.state;
    const TargetAudiences = dropdowns;

    const { deleteTargetAudience } = this.props;

    if (item._id) {
      deleteTargetAudience({ id: item._id });
    }

    const index = TargetAudiences.indexOf(item);
    if (index > -1) {
      TargetAudiences.splice(index, 1);
    }
    this.setState({ dropdowns: TargetAudiences });
  };

  handleSubmit = () => {
    const { dropdowns } = this.state;
    const { addTargetAudiences, updateTargetAudiences } = this.props;

    const TargetAudiences = [];
    const errors = [];

    const updatedTargetAudiences = filterDropdowns(dropdowns, hasId);
    const addedTargetAudiences = filterDropdowns(dropdowns, hasNoId);

    const Replicas = (copies) => {
      copies.map((result) => {
        const data = { ...result };
        data.errors = data.errors ? data.errors : {};
        data.errors.audienceType = `${data.audienceType} already exists`;
        errors.push(data);
        return this.handleChange(data, false);
      });
    };

    updatedTargetAudiences.map((item) => {
      function condition(data) {
        return data.audienceType === item.audienceType && data._id === item._id;
      }
      const copies = addedTargetAudiences.filter(condition);
      return Replicas(copies);
    });

    if (
      addedTargetAudiences.length > 0 &&
      updatedTargetAudiences.length === 0
    ) {
      addedTargetAudiences.map((option) => {
        function condition(data) {
          if (data.id !== option.id) {
            return (
              data.audienceType === option.audienceType &&
              data._id === option._id
            );
          }
        }
        const copies = addedTargetAudiences.filter(condition);
        return Replicas(copies);
      });
    }

    // validate field required
    dropdowns.map((item) => {
      const collection = item;
      if (
        collection.audienceType.trim() === '' ||
        collection.audienceType === undefined
      ) {
        collection.errors = collection.errors ? collection.errors : {};
        collection.errors.audienceType = 'Please enter an Audience type';
        errors.push(collection.errors.audienceType);
      } else if (
        collection.description.trim() === '' ||
        collection.description === undefined
      ) {
        collection.errors = collection.errors ? collection.errors : {};
        collection.errors.description = 'Please enter a description';
        errors.push(collection.errors.description);
      }
      return TargetAudiences.push(collection);
    });

    this.setState({ dropdowns: TargetAudiences });

    if (errors.length < 1) {
      if (updatedTargetAudiences.length > 0) {
        updateTargetAudiences({ TargetAudience: updatedTargetAudiences });
      }
      if (addedTargetAudiences.length > 0) {
        addTargetAudiences({ TargetAudience: addedTargetAudiences });
      }
    }
  };

  render() {
    const { loading } = this.props;
    const { dropdowns } = this.state;
    return (
      <TargetAudienceForm
        loading={loading}
        dropdowns={dropdowns}
        handleChange={this.handleChange}
        addNewDropdown={this.addNewDropdown}
        handleSubmit={this.handleSubmit}
        deleteATargetAudience={this.deleteATargetAudience}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  TargetAudiences: state.targetAudience.data,
  loading: state.targetAudience.loading,
});

const mapDispatchToProps = {
  addTargetAudiences: createTargetAudiences,
  fetchTargetAudiences: fetchingTargetAudiences,
  updateTargetAudiences,
  deleteTargetAudience,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TargetAudienceDropdown);
