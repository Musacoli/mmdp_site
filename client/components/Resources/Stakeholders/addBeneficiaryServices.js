/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'semantic-ui-react';
import FormHeader from './formHeader';
import TextInput from '../../../containers/Resources/StakeHolders/addStakeholder/textInput';
import InputDropDown from '../../../containers/Resources/StakeHolders/addStakeholder/inputDropDown';
import ManageBeneficiaryTypes from '../../../containers/Resources/StakeHolders/addStakeholder/manageBeneficiaryTypes';
import PageNavigation from './pageNavigation';
import { computeTotalNumberOfBeneficiariesPerService } from '../../../utils/resources/stakeholderDirectory/Stakeholders';

const BeneficiaryServicesForm = (props) => {
  const {
    handlePrev,
    handleNext,
    handleChange,
    handleSubmit,
    pages,
    step,
    handleAddNewBeneficiary,
    commonValues,
    handleNewBeneficiaryType,
    formData,
    dropDownData,
    wardOptions,
    communityOptions,
  } = props;

  return (
    <Grid padded stackable>
      <Grid.Row>
        <Form className="stakeholder-container">
          <FormHeader title="Beneficiary services" step={step} pages={pages} />
          <Form.Group widths="equal">
            <TextInput
              {...commonValues}
              nameValue="serviceName"
              label="Service Name"
              placeholder="Service Name"
              isRequired
            />
            <InputDropDown
              {...commonValues}
              placeholder="Target Audience"
              label="Target Audience"
              nameValue="targetAudienceId"
              options={dropDownData.targetAudiences.data}
              loading={dropDownData.targetAudiences.loading}
              isRequired
            />
          </Form.Group>
          <ManageBeneficiaryTypes
            beneficiaryTypeOptions={dropDownData.beneficiaryTypes}
            handleChange={handleChange}
            data={formData}
          />
          <Form.Group widths="equal">
            <div className="field">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <span
                role="button"
                aria-pressed
                className="New-Beneficiary-Type"
                onClick={handleNewBeneficiaryType}
              >
                New Beneficiary Type
              </span>
            </div>
          </Form.Group>
          <Form.Group widths="equal">
            <InputDropDown
              {...commonValues}
              className="ui input"
              placeholder="Frequency"
              label="Frequency"
              nameValue="frequency"
              options={dropDownData.frequencies.data}
              loading={dropDownData.frequencies.loading}
            />
            <TextInput
              {...commonValues}
              placeholder="Duration"
              label="Duration"
              nameValue="duration"
              type="number"
            />
          </Form.Group>
          <Form.Group widths="equal">
            <TextInput
              label="Number of Beneficiaries PerService"
              className="ui input"
              placeholder="no of beneficiaries"
              isReadOnly
              propsValue={computeTotalNumberOfBeneficiariesPerService(
                formData.beneficiaryServiceType,
              )}
            />
            <InputDropDown
              {...commonValues}
              placeholder="thematic Pillars"
              label="Thematic Pillars"
              options={dropDownData.thematicPillars.data}
              loading={dropDownData.thematicPillars.loading}
              nameValue="thematicPillars"
              isRequired
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputDropDown
              {...commonValues}
              label="Sub-themes"
              nameValue="subTheme"
              placeholder="Sub theme"
              options={dropDownData.subThemes.data}
              loading={dropDownData.subThemes.loading}
              isRequired
            />
            <InputDropDown
              {...commonValues}
              nameValue="focusArea"
              label="Focus area"
              placeholder="Focus area"
              options={dropDownData.focusAreas.data}
              loading={dropDownData.focusAreas.loading}
              isRequired
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputDropDown
              {...commonValues}
              nameValue="sourceOfFunding"
              label="Funding Source"
              placeholder="Source"
              options={dropDownData.fundingSources.data}
              loading={dropDownData.fundingSources.loading}
              isRequired
              selectsMultiple
            />
            <InputDropDown
              {...commonValues}
              nameValue="amountInvestedRange"
              label="Amount invested"
              placeholder="range"
              options={dropDownData.AmountInvestedRange.data}
              loading={dropDownData.AmountInvestedRange.loading}
              isRequired
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputDropDown
              {...commonValues}
              nameValue="country"
              placeholder="Country"
              label="Country"
              options={dropDownData.country.data}
              loading={dropDownData.country.loading}
              isRequired
              customBehaviour={() => {}}
            />
            <InputDropDown
              {...commonValues}
              nameValue="state"
              label="State"
              placeholder="State"
              options={dropDownData.states.data}
              loading={dropDownData.states.loading}
              isRequired
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputDropDown
              {...commonValues}
              nameValue="localGovernmentArea"
              label="Local Government Area"
              placeholder="Local Government Area"
              options={dropDownData.LGAs.data}
              loading={dropDownData.LGAs.loading}
              isRequired
              selectsMultiple
            />
            <InputDropDown
              {...commonValues}
              nameValue="ward"
              label="Ward"
              placeholder="Ward"
              options={wardOptions}
              selectsMultiple
            />
          </Form.Group>
          <Form.Group widths="equal">
            <InputDropDown
              {...commonValues}
              nameValue="community"
              label="Local Community"
              placeholder="Local Community"
              isRequired
              options={communityOptions}
              selectsMultiple
            />
            <TextInput
              {...commonValues}
              label="Total Number of beneficiaries reached by Stakeholder"
              placeholder="Number of Beneficiaries"
              nameValue="totalNumberOfBeneficiaries"
              isReadOnly
            />
          </Form.Group>
          <Form.Group widths="equal">
            <TextInput
              {...commonValues}
              label="Notes"
              placeholder="Notes..."
              nameValue="note"
              isTextArea
            />
          </Form.Group>
        </Form>
      </Grid.Row>
      <PageNavigation
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleSubmit={handleSubmit}
        handleAddNewBeneficiary={handleAddNewBeneficiary}
        pages={pages}
        step={step}
      />
    </Grid>
  );
};

BeneficiaryServicesForm.propTypes = {
  commonValues: PropTypes.instanceOf(Object).isRequired,
  formData: PropTypes.instanceOf(Object).isRequired,
  dropDownData: PropTypes.instanceOf(Object).isRequired,
  wardOptions: PropTypes.instanceOf(Array).isRequired,
  communityOptions: PropTypes.instanceOf(Array).isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleAddNewBeneficiary: PropTypes.func.isRequired,
  handleNewBeneficiaryType: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};

export default BeneficiaryServicesForm;
