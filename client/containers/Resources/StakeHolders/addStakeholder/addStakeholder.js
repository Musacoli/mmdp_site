import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import _ from 'lodash';
import * as stateActions from '../../../../store/actions/dropdowns/state';

import {
  addStakeholderRequest,
  editStakeholderRequest,
} from '../../../../store/actions/stakeholders/stakeholders';
import StakeholderDetailsForm from './stakeholderDetailsForm';
import ReturneeServiceForm from './ReturneeServiceForm';
import { computeTotalNumberOfBeneficiaries } from '../../../../utils/resources/stakeholderDirectory/Stakeholders';
import { getOrganizationTypeRequest } from '../../../../store/actions/dropdowns/organizationType';
import { fetchStatuses } from '../../../../store/actions/dropdowns/statuses';
import { searchStakeHolders } from '../../../../store/actions/resources/Stakeholders';
import { fetchPartnershipType } from '../../../../store/actions/dropdowns/partnershipType';
import { fetchImpactTypes } from '../../../../store/actions/dropdowns/impactTypes';
import { fetchCountry } from '../../../../store/actions/dropdowns/country';
import { fetchingStaffStrengths } from '../../../../store/actions';
import {
  handleFormValidation,
  preSubmitValidationAndCleanup,
  requiredBeneficiaryFieldsTemplate,
} from '../../../../utils/resources/stakeholderDirectory/formValidation';
import { mapStakeholderDataToBeneficiaryTemplate } from '../../../../utils/resources/stakeholderDirectory/editStakeholder';
import {
  basicInformationTemplate,
  beneficiaryInformationTemplate,
  stakeholderAddressItemTemplate,
} from '../../../../utils/resources/stakeholderDirectory/staticFields';

export class AddStakeholder extends Component {
  state = {
    step: 1,
    pages: 2,
    stakeholderData: {},
    beneficiariesItem: {},
    stakeholderAddressItem: {},
    requireStakeholderFields: [],
    requiredBeneficiaryFields: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state;
    if (prevState.step !== step) this.forceUpdate();
  }

  componentWillMount() {
    const {
      reduxState,
      match: { params },
      beneficiaryInformationTemplate,
      basicInformationTemplate,
    } = this.props;
    const data = mapStakeholderDataToBeneficiaryTemplate(reduxState, params);
    if (params.id !== undefined)
      this.setState({
        stakeholderData: data.stakeholderData,
        beneficiariesItem: _.cloneDeep(beneficiaryInformationTemplate),
        stakeholderAddressItem: data.stakeholderAddressItem,
        requiredBeneficiaryFields: _.cloneDeep(
          requiredBeneficiaryFieldsTemplate,
        ),
      });
    else {
      this.setState({
        stakeholderData: _.cloneDeep(basicInformationTemplate),
        beneficiariesItem: _.cloneDeep(beneficiaryInformationTemplate),
        stakeholderAddressItem: _.cloneDeep(stakeholderAddressItemTemplate),
        requiredBeneficiaryFields: _.cloneDeep(
          requiredBeneficiaryFieldsTemplate,
        ),
      });
    }
  }

  componentDidMount() {
    const {
      getOrganisationTypes,
      getRegistrationStatuses,
      getStakeholders,
      getPartnershipTypes,
      getImpactTypes,
      getCountries,
      fetchStaffStrengths,
      getStates,
      match: { params },
    } = this.props; // poppulate the state witht the id if it exists
    if (params.id) {
      const id = { organisationName: params.id };
      this.setState({ id });
    } // fetch dropdown data to the state
    getOrganisationTypes();
    getRegistrationStatuses();
    getStakeholders({ page: 1, searchQuery: '', perPage: 90000 });
    getPartnershipTypes();
    getImpactTypes();
    getCountries();
    fetchStaffStrengths();
    getStates();
  }

  handleChange = (event, { name, value }) => {
    event.preventDefault();
    const { step, stakeholderAddressItem } = this.state;
    const { stakeholderData } = { ...this.state };
    if (step === 1) {
      const isNotEssentialField = _.find(
        Object.keys(stakeholderAddressItem),
        (key) => key === name,
      );
      if (isNotEssentialField) {
        stakeholderAddressItem[name] = value; // modify metaData first
        this.setState({ stakeholderAddressItem });
      } else {
        stakeholderData[name] = value; // modify data directly
        this.setState({ stakeholderData });
      }
    } else {
      const tempBeneficiaries = _.map(stakeholderData.beneficiaries, _.clone); // create a deep copy of the array
      const temp = tempBeneficiaries[step - 2]; // get the value at the current step and update it
      const beneficiaryItem = temp || beneficiaryInformationTemplate;
      beneficiaryItem[name] = value; // make sure the number of beneficiaries is updated
      beneficiaryItem.totalNumberOfBeneficiaries = computeTotalNumberOfBeneficiaries(
        tempBeneficiaries,
      ); // update the state with the new updated value
      tempBeneficiaries[step - 2] = beneficiaryItem;
      stakeholderData.beneficiaries = tempBeneficiaries;
      this.setState({ stakeholderData });
    }
  };

  handleNext = (e) => {
    e.preventDefault();
    const { step } = this.state;
    handleFormValidation(this.state).then((hasError) => {
      if (!hasError) this.setState({ step: step + 1 });
    });
  };

  handlePrev = (e) => {
    e.preventDefault();
    const { step } = this.state;
    handleFormValidation(this.state).then((hasError) => {
      if (!hasError) this.setState({ step: step - 1 });
    });
  };

  handleAddNewBeneficiary = (e) => {
    const { stakeholderData, beneficiariesItem, step, pages } = this.state;
    e.preventDefault();
    this.handleFormValidation().then(() => {
      stakeholderData.beneficiaries.push(beneficiariesItem);
      this.setState({ step: step + 1, pages: pages + 1 });
      toastr.success('New beneficiary service form added');
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      stakeholderData,
      beneficiariesItem,
      stakeholderAddressItem,
      pages,
    } = this.state;
    const {
      addStakeholder,
      match: { params },
      editStakeholder,
    } = this.props;
    stakeholderData.beneficiaries.push(beneficiariesItem);
    const beneficiaries = _.cloneDeep(stakeholderData.beneficiaries).slice(
      0,
      pages - 1,
    );
    let data = _.cloneDeep(stakeholderData);
    data.beneficiaries = beneficiaries;
    data = preSubmitValidationAndCleanup(data, stakeholderAddressItem);
    try {
      if (data !== undefined) {
        params.id === undefined ? addStakeholder(data) : editStakeholder(data);
      }
    } catch (e) {
      toastr.info(
        'There was an error completing the request. Please reload the form and try again',
      );
    }
  };

  handleFormValidation = async () => {
    const {
      stakeholderData,
      requireStakeholderFields,
      requiredBeneficiaryFields,
      step,
    } = this.state;
    let invalidCount = 0;
    const missingFields = [];
    let data;
    let requireFields;

    if (step === 1) {
      data = stakeholderData;
      requireFields = requireStakeholderFields;
    } else {
      data = stakeholderData.beneficiaries[step - 2];
      requireFields = requiredBeneficiaryFields;
    }
    requireFields.forEach((field) => {
      if (field) {
        try {
          if (data[field].length === 0) {
            invalidCount++;
            missingFields.push(field);
          } // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    });
    if (invalidCount > 0) {
      toastr.warning(
        missingFields.join(','),
        `${invalidCount} of the required fields have not been filled`,
      );
      return true;
    }
    if (invalidCount === 0) return false;
  };

  updateRequiredFields = (fieldId, isRequired, isDisabled) => {
    const { requireStakeholderFields } = this.state;
    let temp = requireStakeholderFields;
    if (isRequired) {
      const res = temp.find((item) => item === fieldId); // if a required field is disabled remove it from the array
      if (res !== undefined && isDisabled) {
        const x = _.cloneDeep(temp);
        temp = _.remove(x, (key) => key !== fieldId);
      } // if it is not disabled and not in the required fields, add it back
      if (!temp.includes(fieldId) && !isDisabled) {
        temp.push(fieldId);
      }
      this.setState({ requireStakeholderFields: temp });
    }
  };

  render() {
    const { step, pages, stakeholderData, stakeholderAddressItem } = this.state;
    const { reduxState, getStates } = this.props;
    return step === 1 ? (
      <StakeholderDetailsForm
        step={step}
        pages={pages}
        data={stakeholderData}
        addressData={stakeholderAddressItem}
        handleNext={this.handleNext}
        handleChange={this.handleChange}
        updateRequiredFields={this.updateRequiredFields}
        reduxState={reduxState}
        getStates={getStates}
      />
    ) : (
      <ReturneeServiceForm
        step={step}
        pages={pages}
        data={stakeholderData.beneficiaries}
        handleNext={this.handleNext}
        handleChange={this.handleChange}
        handlePrev={this.handlePrev}
        handleSubmit={this.handleSubmit}
        handleAddNewBeneficiary={this.handleAddNewBeneficiary}
        reduxState={reduxState}
      />
    );
  }
}

AddStakeholder.propTypes = {
  addStakeholder: PropTypes.func,
  basicInformationTemplate: PropTypes.instanceOf(Object),
  beneficiaryInformationTemplate: PropTypes.instanceOf(Object),
};

AddStakeholder.defaultProps = {
  basicInformationTemplate: _.cloneDeep(basicInformationTemplate),
  beneficiaryInformationTemplate: _.cloneDeep(beneficiaryInformationTemplate),
};

export const mapStateToProps = (state) => ({
  states: state.states.data,
  reduxState: state,
});

export const mapDispatchToProps = {
  addStakeholder: (data) => addStakeholderRequest(data),
  editStakeholder: editStakeholderRequest,
  getStates: stateActions.fetchStates,
  getOrganisationTypes: getOrganizationTypeRequest,
  getRegistrationStatuses: fetchStatuses,
  getStakeholders: searchStakeHolders,
  getPartnershipTypes: fetchPartnershipType,
  getImpactTypes: fetchImpactTypes,
  getCountries: fetchCountry,
  fetchStaffStrengths: fetchingStaffStrengths,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStakeholder);
