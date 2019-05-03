import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import FormHeader from './formHeader';
import TextInput from '../../../containers/Resources/StakeHolders/addStakeholder/textInput';
import InputDropDown from '../../../containers/Resources/StakeHolders/addStakeholder/inputDropDown';
import ManageVolunteers from '../../../containers/Resources/StakeHolders/addStakeholder/manageVolunteers';
import ManagePartnerships from '../../../containers/Resources/StakeHolders/addStakeholder/managePartnerships';
import { NextButton } from './nextButton';

const BasicInformationForm = ({
  handleNext,
  handleChange,
  step,
  pages,
  commonValues,
  addressData,
  fieldOptions,
  data,
  updateRequiredFields,
  handleRegistrationStatus,
  dropdownData,
  handleStatesOptionsUpdate,
}) => (
  <Form className="stakeholder-container">
    <FormHeader title="Basic Information" step={step} pages={pages} />
    <Form.Group widths="equal">
      <TextInput
        {...commonValues}
        nameValue="organisationName"
        label="Stakeholder Name"
        placeholder="StakeholderName"
        isRequired
      />
      <TextInput
        {...commonValues}
        nameValue="email"
        label="Email"
        placeholder="email"
        type="email"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <InputDropDown
        {...commonValues}
        placeholder="Organisation Type"
        label="Organisation Type"
        nameValue="organisationTypeId"
        loading={dropdownData.organisationTypeId.loading}
        options={dropdownData.organisationTypeId.data}
        isRequired
      />
      <InputDropDown
        {...commonValues}
        placeholder="Registration Status"
        label="Registration Status"
        nameValue="registrationStatusId"
        isRequired
        customBehaviour={handleRegistrationStatus}
        loading={dropdownData.registrationStatusId.loading}
        options={dropdownData.registrationStatusId.data}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <div className="field">
        <TextInput
          {...commonValues}
          nameValue="yearOfCacREG"
          label="Year of Registration"
          placeholder="Year of Registration"
          isYearInput
          isDisabled={!fieldOptions.isRegistered}
          isRequired
        />
      </div>
      <TextInput
        {...commonValues}
        nameValue="cacRcNumber"
        label="Registration Number"
        placeholder="Registration Number"
        isRequired
        isDisabled={!fieldOptions.isRegistered}
      />
    </Form.Group>
    <ManageVolunteers
      onChange={handleChange}
      updateRequiredFields={updateRequiredFields}
      data={data}
    />
    <ManagePartnerships
      onChange={handleChange}
      data={data}
      partnershipData={dropdownData.partnershipData}
      partnershipTypesData={dropdownData.partnershipTypes}
    />
    <Form.Group widths="equal">
      <InputDropDown
        {...commonValues}
        placeholder="Impact type"
        label="Impact Type"
        nameValue="impactTypeId"
        options={dropdownData.impactTypeId.data}
        loading={dropdownData.impactTypeId.loading}
        isRequired
      />
      <InputDropDown
        {...commonValues}
        placeholder="Yes or No"
        label="Willing to partner with edo State Government?"
        nameValue="partnerWithGovernment"
        options={[
          {
            key: 1,
            text: `Yes`,
            value: true,
          },
          {
            key: 2,
            text: `No`,
            value: false,
          },
        ]}
        isRequired
      />
    </Form.Group>
    <Form.Group widths="equal">
      <InputDropDown
        {...commonValues}
        data={addressData}
        placeholder="Country"
        label="Country"
        nameValue="country"
        options={dropdownData.country.data}
        loading={dropdownData.country.loading}
        customBehaviour={handleStatesOptionsUpdate}
        isRequired
      />
      <InputDropDown
        {...commonValues}
        data={addressData}
        placeholder="state"
        label="State"
        nameValue="state"
        options={dropdownData.states.data}
        loading={dropdownData.states.loading}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <InputDropDown
        {...commonValues}
        placeholder="Impact Type"
        label="Impact Type"
        nameValue="impactTypeId"
        options={dropdownData.impactTypeId.data}
        loading={dropdownData.impactTypeId.loading}
        isRequired
      />
      <TextInput
        {...commonValues}
        placeholder="Founder"
        label="Founder"
        nameValue="founder"
        isRequired
      />
    </Form.Group>
    <Form.Group widths="equal">
      <TextInput
        {...commonValues}
        placeholder="Website"
        label="Website"
        nameValue="website"
      />
      <TextInput
        {...commonValues}
        data={addressData}
        placeholder="Head Office Address"
        label="Head Office Address"
        nameValue="headOfficeAddress"
        isRequired
      />
    </Form.Group>
    <Form.Group widths="equal">
      <TextInput
        {...commonValues}
        data={addressData}
        placeholder="State Office Address"
        label="State Office Address"
        nameValue="stateOfficeAddress"
        isRequired
      />
      <TextInput
        {...commonValues}
        placeholder="phoneNumber1"
        label="PhoneNumber 1"
        nameValue="phoneNumber"
        type="number"
        isRequired
      />
    </Form.Group>
    <Form.Group widths="equal">
      <TextInput
        {...commonValues}
        placeholder="phoneNumber2"
        label="PhoneNumber 2"
        nameValue="phoneNumber2"
        type="number"
      />
      <TextInput
        {...commonValues}
        placeholder="phoneNumber3"
        label="PhoneNumber 3"
        nameValue="phoneNumber3"
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <InputDropDown
        {...commonValues}
        label="Staff Strength"
        placeholder="Staff Strength"
        nameValue="staffStrengthRangeId"
        options={dropdownData.staffStrengthRangeId.data}
        loading={dropdownData.staffStrengthRangeId.loading}
      />
      <TextInput
        {...commonValues}
        placeholder="Local Manager"
        label="Local Manager"
        nameValue="localManagerName"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <TextInput
        {...commonValues}
        placeholder="Local Manager Email"
        label="Local Manager Email"
        nameValue="localManagerEmail"
        type="email"
      />
      <TextInput
        {...commonValues}
        placeholder="Phone number"
        label="Phone number of Contact Person"
        nameValue="localManagerMobile"
        type="number"
      />
    </Form.Group>
    <Form.Group widths="equal">
      <TextInput
        {...commonValues}
        label="Notes"
        placeholder="Notes..."
        nameValue="notes"
        isTextArea
      />
    </Form.Group>
    <Form.Group>
      <NextButton text="Next" handleNext={handleNext} />
    </Form.Group>
  </Form>
);

BasicInformationForm.propTypes = {
  updateRequiredFields: PropTypes.func.isRequired,
  handleRegistrationStatus: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleStatesOptionsUpdate: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  commonValues: PropTypes.instanceOf(Object).isRequired,
  addressData: PropTypes.instanceOf(Object).isRequired,
  fieldOptions: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  dropdownData: PropTypes.instanceOf(Object).isRequired,
};

export default BasicInformationForm;
