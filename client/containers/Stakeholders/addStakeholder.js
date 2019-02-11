import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BasicInformationForm from '../../components/Stakeholders/addBasicInfo';
import BeneficiaryServiceForm from '../../components/Stakeholders/addBeneficiaryServices';
import { addStakeholderRequest } from '../../store/actions/stakeholders/stakeholders';

export class AddStakeholder extends Component {
  state = {
    step: 1,
    pages: 2,
    basicInformation: {
      stakeholderName: '',
      email: '',
      organisationType: '',
      registrationStatus: '',
      yearOfRegistration: '',
      registrationNumber: '',
      volunteers: '',
      numberOfVolunteers: '',
      partnerships: '',
      partnershipType: '',
      impactType: '',
      operatingInEdoState: '',
      edoStateOperationStartYear: '',
      partnerWithEdoStateGovernment: '',
      country: '',
      state: '',
      website: '',
      headOfficeAddress: '',
      stateOfficeAddress: '',
      phoneNumberOne: '',
      phoneNumberTwo: '',
      phoneNumberThree: '',
      localContactPerson: '',
      contactPersonEmailAddress: '',
      contactPersonPhoneNumber: '',
      notes: '',
      totalAmountInvested: '',
      founder: '',
      staffStrength: '',
    },
    beneficiaryService: [],
    item: {
      serviceName: '',
      targetAudience: '',
      beneficiaryType: '',
      numberOfMaleBeneciaries: '',
      numberOfFemaleBeneciaries: '',
      frequency: '',
      duration: '',
      numberOfBeneciariesPerService: '',
      thematicPillars: '',
      subTheme: '',
      focusArea: '',
      fundingSource: '',
      amountInvested: '',
      country: '',
      state: '',
      localGovernment: '',
      ward: '',
      localCommunities: '',
      totalNumberOfBeneficiaries: '',
      notes: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { step } = this.state;
    if (prevState.step !== step) {
      this.forceUpdate();
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { step } = this.state;

    if (step === 1) {
      const { basicInformation } = { ...this.state };
      basicInformation[event.target.name] = event.target.value;
      this.setState({ basicInformation });
    } else {
      const { item } = this.state;
      const i = Object.assign({}, item);
      i[event.target.name] = event.target.value;
      this.setState({ item: i });
    }
  };

  handleDateChange = (event, { name, value }) => {
    this.setState((prevState) => ({
      ...prevState,
      basicInformation: {
        ...prevState.basicInformation,
        [name]: value,
      },
    }));
  };

  handleNext = (e) => {
    e.preventDefault();
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  handlePrev = (e) => {
    e.preventDefault();
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleAddnewBeneficiary = (e) => {
    const { beneficiaryService, item, step, pages } = this.state;
    e.preventDefault();
    beneficiaryService.push(item);
    this.setState({ step: step + 1, pages: pages + 1 });
  };

  handleFormContent = () => {
    const { beneficiaryService, item, step } = this.state;
    if (beneficiaryService[step - 2] === undefined) {
      return item;
    }
    return beneficiaryService[step - 2];
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { beneficiaryService, basicInformation, item } = this.state;
    beneficiaryService.push(item);
    const stakeholderData = { basicInformation, beneficiaryService };
    const { addStakeholder } = this.props;
    addStakeholder(stakeholderData);
  };

  render() {
    const { step, basicInformation, pages } = this.state;
    return step === 1 ? (
      <BasicInformationForm
        handleChange={this.handleChange}
        handleNext={this.handleNext}
        handleDateChange={this.handleDateChange}
        yearOfRegistration={basicInformation.yearOfRegistration}
        edoStateOperationStartYear={basicInformation.edoStateOperationStartYear}
        state={basicInformation}
        pages={pages}
        step={step}
      />
    ) : (
      <BeneficiaryServiceForm
        handleChange={this.handleChange}
        handlePrev={this.handlePrev}
        handleNext={this.handleNext}
        handleSubmit={this.handleSubmit}
        state={this.handleFormContent()}
        handleAddnewBeneficiary={this.handleAddnewBeneficiary}
        pages={pages}
        step={step}
      />
    );
  }
}

AddStakeholder.propTypes = {
  addStakeholder: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  stakeholderData: state,
});

export const mapDispatchToProps = {
  addStakeholder: (data) => addStakeholderRequest(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddStakeholder);
