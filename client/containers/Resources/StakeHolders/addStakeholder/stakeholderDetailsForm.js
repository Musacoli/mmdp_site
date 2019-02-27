/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { handleGetValue } from '../../../../utils/resources/stakeholderDirectory/Stakeholders';
import { getDropDownData } from '../../../../utils/resources/stakeholderDirectory/fetchDropdownData';
import BasicInformationForm from '../../../../components/Resources/Stakeholders/addBasicInfo';

class StakeholderDetailsForm extends Component {
  state = {
    fieldOptions: {
      isRegistered: false,
      hasVolunteers: false,
    },
    dropdownData: {},
    loaded: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      dropdownData: getDropDownData(nextProps.reduxState),
    };
  }

  static handleActiveStatus = (
    data,
    options,
    optionText,
    nameValue,
    subKey = '',
  ) => {
    // handle active status of the registration number
    const dataValue = handleGetValue(data, nameValue, subKey);
    const option = _.find(options, { value: dataValue });
    if (option) {
      return option.text === optionText;
    }
    return true;
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({ loaded: true });
    if (data.cacRcNumber !== '') {
      this.updateFieldOptions('isRegistered', true);
    }
  }

  handleRegistrationStatus = () => {
    const { data, updateRequiredFields } = this.props;
    const { dropdownData } = this.state;
    const options = dropdownData.registrationStatusId.data;
    const status = StakeholderDetailsForm.handleActiveStatus(
      data,
      options,
      'Registered',
      'registrationStatusId',
    );
    this.updateFieldOptions('isRegistered', status);
    updateRequiredFields('cacRcNumber', true, !status);
  };

  handleStatesOptionsUpdate = () => {
    // update the states options on country change
    const { addressData, getStates } = this.props;
    if (addressData.country !== '') {
      getStates({ countryId: addressData.country });
    }
  };

  updateFieldOptions = (key, value, subKey = '') => {
    const { fieldOptions } = this.state;
    const temp = fieldOptions;

    if (subKey !== '') {
      temp[key][value] = subKey;
    } else {
      temp[key] = value;
    }
    this.setState({ fieldOptions: temp });
  };

  render() {
    const {
      step,
      pages,
      handleNext,
      handleChange,
      data,
      updateRequiredFields,
      addressData,
    } = this.props;
    const { fieldOptions, loaded, dropdownData } = this.state;
    if (!loaded) {
      return <div>Loading...</div>;
    }
    const commonValues = {
      onChange: handleChange,
      data,
      updateRequiredFields,
      className: 'ui input',
    };
    return (
      <BasicInformationForm
        updateRequiredFields={updateRequiredFields}
        handleRegistrationStatus={this.handleRegistrationStatus}
        handleNext={handleNext}
        handleChange={handleChange}
        handleStatesOptionsUpdate={this.handleStatesOptionsUpdate}
        commonValues={commonValues}
        addressData={addressData}
        fieldOptions={fieldOptions}
        data={data}
        dropdownData={dropdownData}
        pages={pages}
        step={step}
      />
    );
  }
}

StakeholderDetailsForm.propTypes = {
  step: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateRequiredFields: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object),
  addressData: PropTypes.instanceOf(Object),
  getStates: PropTypes.func,
};

export default StakeholderDetailsForm;
