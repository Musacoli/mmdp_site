/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { handleOptionsUpdate } from '../../../../utils/resources/stakeholderDirectory/Stakeholders';
import BeneficiaryServicesForm from '../../../../components/Resources/Stakeholders/addBeneficiaryServices';
import {
  getDropDownData,
  mapStateToOptions,
} from '../../../../utils/resources/stakeholderDirectory/fetchDropdownData';
import { getLGARequest } from '../../../../store/actions/dropdowns/LGA';
import { fetchingTargetAudiences } from '../../../../store/actions';
import { fetchTypes } from '../../../../store/actions/dropdowns/beneficiaryType';
import { fetchThematicPillars } from '../../../../store/actions/dropdowns/thematicPillars';
import { fetchFunding } from '../../../../store/actions/dropdowns/funding';
import * as stateActions from '../../../../store/actions/dropdowns/state';
import * as wardActions from '../../../../store/actions/dropdowns/ward';
import * as communityActions from '../../../../store/actions/dropdowns/communities';
import * as amountActions from '../../../../store/actions/dropdowns/amountInvested';
import * as subThemeActions from '../../../../store/actions/dropdowns/subTheme';
import * as focusAreaActions from '../../../../store/actions/dropdowns/focusArea';
import * as frequencyActions from '../../../../store/actions/dropdowns/frequency';
import {
  beneficiaryInformationTemplate,
  beneficiaryTypeTemplate,
} from '../../../../utils/resources/stakeholderDirectory/staticFields';

class ReturneeServiceForm extends Component {
  state = {
    formData: {},
    dropdownData: {},
  };

  static getDerivedStateFromProps(nextProps) {
    const step = nextProps.step;
    const formData = nextProps.data[step - 2]
      ? nextProps.data[step - 2]
      : nextProps.dataTemplate;
    return {
      formData,
      dataIndex: step - 2,
      dropdownData: getDropDownData(nextProps.reduxState, step - 2),
    };
  }

  componentDidMount() {
    const {
      getTargetAudiences,
      getBeneficiaryTypes,
      getThematicPillars,
      getFundingSources,
      getWards,
      getCommunities,
      getAmountsInvested,
      getSubThemes,
      getFocusAreas,
      getFrequencies,
    } = this.props;
    getTargetAudiences();
    getBeneficiaryTypes();
    getThematicPillars();
    getFundingSources();
    getWards();
    getCommunities();
    getAmountsInvested();
    getSubThemes();
    getFocusAreas();
    getFrequencies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { getStates, getLGAs } = this.props;

    handleOptionsUpdate(
      prevState,
      this.state,
      'country',
      'countryId',
      getStates,
    );
    handleOptionsUpdate(prevState, this.state, 'state', 'stateId', getLGAs);
  }

  handleNewBeneficiaryType = () => {
    const { handleChange } = this.props;
    const { formData, dropdownData } = this.state;
    const currentBeneficiaries = _.cloneDeep(formData.beneficiaryServiceType);
    const newBeneficiaryType = _.cloneDeep(beneficiaryTypeTemplate);

    if (dropdownData.beneficiaryTypes) {
      if (dropdownData.beneficiaryTypes.data) {
        if (
          currentBeneficiaries.length <
          dropdownData.beneficiaryTypes.data.length
        ) {
          currentBeneficiaries.push(newBeneficiaryType);
        } else {
          toastr.warning(
            `You cannot add more than the ${
              dropdownData.beneficiaryTypes.data.length
            } available beneficiary types`,
          );
        }
      }
    }

    const event = new Event('input', { bubbles: true });
    handleChange(event, {
      name: 'beneficiaryServiceType',
      value: currentBeneficiaries,
    });
  };

  handleWardOptions = () => {
    const { formData } = this.state;
    const { reduxState } = this.props;
    try {
      const wards = reduxState.wards.data || [];
      const LGAs = formData.localGovernmentArea;

      const filteredWards = _.filter(wards, (ward) => {
        const wardLGA = ward.lgaId;
        return _.includes(LGAs, wardLGA);
      });
      return mapStateToOptions(filteredWards || [], '_id', '_id', 'wardName');
    } catch (e) {
      return {
        loading: true,
        data: [],
      };
    }
  };

  handleCommunityOptions = () => {
    const { formData } = this.state;
    const { reduxState } = this.props;

    const communities = reduxState.communities.data || [];
    const wards = formData.ward;

    const filteredCommunities = _.filter(communities, (community) => {
      const communityWard = community.wardId;
      return _.includes(wards, communityWard);
    });

    return mapStateToOptions(
      filteredCommunities || [],
      '_id',
      '_id',
      'communityName',
    );
  };

  render() {
    const {
      step,
      pages,
      handleChange,
      handleNext,
      handlePrev,
      handleSubmit,
      handleAddNewBeneficiary,
      reduxState,
    } = this.props;
    const { formData, dropdownData } = this.state;

    const commonValues = {
      onChange: handleChange,
      data: formData,
    };
    return (
      <BeneficiaryServicesForm
        commonValues={commonValues}
        dropDownData={dropdownData}
        formData={formData}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleAddNewBeneficiary={handleAddNewBeneficiary}
        handleNewBeneficiaryType={this.handleNewBeneficiaryType}
        pages={pages}
        step={step}
        wardOptions={this.handleWardOptions()}
        communityOptions={this.handleCommunityOptions()}
        reduxData={reduxState}
      />
    );
  }
}

ReturneeServiceForm.propTypes = {
  step: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleAddNewBeneficiary: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  dataTemplate: PropTypes.instanceOf(Object),
  reduxState: PropTypes.instanceOf(Object),
};

ReturneeServiceForm.defaultProps = {
  dataTemplate: _.cloneDeep(beneficiaryInformationTemplate),
};

const mapDispatchToProps = {
  getLGAs: getLGARequest,
  getTargetAudiences: fetchingTargetAudiences,
  getBeneficiaryTypes: fetchTypes,
  getThematicPillars: fetchThematicPillars,
  getFundingSources: fetchFunding,
  getStates: stateActions.fetchStates,
  getWards: wardActions.fetchWards,
  getCommunities: communityActions.fetchCommunities,
  getAmountsInvested: amountActions.fetchAmount,
  getSubThemes: subThemeActions.fetchSubThemes,
  getFocusAreas: focusAreaActions.fetchFocusArea,
  getFrequencies: frequencyActions.fetchFrequency,
  getDropDownData,
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReturneeServiceForm);
