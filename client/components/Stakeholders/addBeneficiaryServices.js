import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import FormLabels from './formLabels';
import FormHeader from './formHeader';
import FormNotesTextarea from './textArea';

const BeneficiaryServicesForm = (props) => {
  const {
    handlePrev,
    handleNext,
    handleChange,
    handleSubmit,
    state,
    handleAddnewBeneficiary,
    pages,
    step,
    states,
    handleSelectChange,
  } = props;

  return (
    <React.Fragment>
      <div className="stakeholder-container">
        <FormHeader title="Beneficiary services" step={step} pages={pages} />
        <div className="ui grid">
          <FormLabels label1="Service name" label2="Target audience" />
          <div className="row">
            <div className="seven wide column">
              <input
                className="st-input"
                id="serviceName"
                name="serviceName"
                onChange={handleChange}
                value={state.serviceName}
              />
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                id="targetAudience"
                name="targetAudience"
                onChange={handleChange}
                value={state.targetAudience}
              >
                <option value="">Sample text</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <div className="row row-label">
            <div className="seven wide column">
              <span className="st-label">Beneficiary type</span>
            </div>
            <div className="column split-column">
              <span className="st-label">No. of male beneficiaries</span>
            </div>
            <div className="column split-column">
              <span className="st-label">No. of female beneficiaries</span>
            </div>
          </div>
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                id="beneficiaryType"
                name="beneficiaryType"
                onChange={handleChange}
                value={state.beneficiaryType}
              >
                <option value="">Example</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="column split-column">
              <input
                className="st-input small"
                id="numberOfMaleBeneciaries"
                name="numberOfMaleBeneciaries"
                onChange={handleChange}
                value={state.numberOfMaleBeneciaries}
              />
            </div>
            <div className="column split-column">
              <input
                className="st-input small"
                id="numberOfFemaleBeneciaries"
                name="numberOfFemaleBeneciaries"
                onChange={handleChange}
                value={state.numberOfFemaleBeneciaries}
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <span className="st-label cool-blue-label">
                New Beneficiary Type
              </span>
            </div>
          </div>
          <FormLabels label1="Frequency" label2="Duration" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                id="frequency"
                name="frequency"
                onChange={handleChange}
                value={state.frequency}
              >
                <option value="">2 weeks</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <input
                className="st-input"
                id="duration"
                name="duration"
                onChange={handleChange}
                value={state.duration}
              />
            </div>
          </div>
          <FormLabels
            label1="Number of Beneficiaries per service"
            label2="Thematic Pillars"
          />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                id="numberOfBeneciariesPerService"
                name="numberOfBeneciariesPerService"
                onChange={handleChange}
                value={state.numberOfBeneciariesPerService}
              >
                <option value="">Auto calculated</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                id="thematicPillars"
                name="thematicPillars"
                onChange={handleChange}
                value={state.thematicPillars}
              >
                <option value="">Pillar 1,2</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <FormLabels label1="Sub theme" label2="Focus area" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                id="subTheme"
                name="subTheme"
                onChange={handleChange}
                value={state.subTheme}
              >
                <option value="">Placeholder text</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                id="focusArea"
                name="focusArea"
                onChange={handleChange}
                value={state.focusArea}
              >
                <option value="">Placeholder text</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <FormLabels label1="Funding source" label2="Amount Invested" />
          <div className="row">
            <div className="seven wide column">
              <input
                className="st-input"
                id="fundingSource"
                name="fundingSource"
                onChange={handleChange}
                value={state.fundingSource}
              />
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                id="amountInvested"
                name="amountInvested"
                onChange={handleChange}
                value={state.amountInvested}
              >
                <option value="">3,000,000</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <FormLabels label1="Country" label2="State" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                id="country"
                name="country"
                onChange={handleChange}
                value={state.country}
              >
                <option value="">Nigeria</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="seven wide column">
              <div className="select__box">
                <Select
                  getOptionValue={(item) => item._id}
                  getOptionLabel={(item) => item.stateName}
                  options={states}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
          </div>
          <FormLabels label1="Local government" label2="Ward" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                id="localGovernment"
                name="localGovernment"
                onChange={handleChange}
                value={state.localGovernment}
              >
                <option value="">Oredo</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                id="ward"
                name="ward"
                onChange={handleChange}
                value={state.ward}
              >
                <option value="">Ward 1</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <FormLabels
            label1="Local Communities"
            label2="Total Number of Beneficiaries reached by Stakeholder"
          />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                id="localCommunities"
                name="localCommunities"
                onChange={handleChange}
                value={state.localCommunities}
              >
                <option value="">Sample text</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <input
                className="st-input"
                id="totalNumberOfBeneficiaries"
                name="totalNumberOfBeneficiaries"
                onChange={handleChange}
                value={state.totalNumberOfBeneficiaries}
              />
            </div>
          </div>
          <FormLabels label1="Notes" />
          <FormNotesTextarea handleChange={handleChange} value={state.notes} />
          <div className="row">
            <div className="six wide column">
              {pages === step ? (
                <button type="button" className="btn-back" onClick={handlePrev}>
                  Back
                </button>
              ) : (
                <button type="button" className="btn-save" onClick={handlePrev}>
                  Back
                </button>
              )}
            </div>
            <div className="four wide column m-r-16">
              {pages === step ? (
                <button
                  type="button"
                  className="btn-add-new"
                  onClick={handleAddnewBeneficiary}
                >
                  Add New Beneficiary Service
                </button>
              ) : (
                <div />
              )}
            </div>
            <div className="three wide column">
              {pages === step ? (
                <button
                  type="submit"
                  className="btn-save"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              ) : (
                <button type="submit" className="btn-save" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

BeneficiaryServicesForm.propTypes = {
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired,
  handleAddnewBeneficiary: PropTypes.func,
  pages: PropTypes.number,
  step: PropTypes.number,
};

export default BeneficiaryServicesForm;
