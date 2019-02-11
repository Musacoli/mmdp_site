import React from 'react';
import PropTypes from 'prop-types';
import { YearInput } from 'semantic-ui-calendar-react';
import FormLabels from './formLabels';
import FormHeader from './formHeader';
import FormInputs from './formInputs';
import FormNotesTextarea from './textArea';

const BasicInformationForm = (props) => {
  const {
    handleNext,
    handleChange,
    handleDateChange,
    yearOfRegistration,
    edoStateOperationStartYear,
    state,
    step,
    pages,
  } = props;
  return (
    <form>
      <div className="stakeholder-container">
        <FormHeader title="Basic Information" step={step} pages={pages} />
        <div className="ui grid">
          <FormLabels label1="Stakeholder name" label2="Email" />
          <FormInputs
            id1="stakeholderName"
            name1="stakeholderName"
            id2="email"
            name2="email"
            handleChange={handleChange}
            value1={state.stakeholderName}
            value2={state.email}
          />
          <FormLabels label1="Organisation type" label2="Registration status" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                name="organisationType"
                onChange={handleChange}
                defaultValue={state.organisationType}
              >
                <option value="">Example</option>
                <option value="option 1">option 1</option>
                <option value="option 2">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                name="registrationStatus"
                onChange={handleChange}
                defaultValue={state.registrationStatus}
              >
                <option value="">Registered</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <FormLabels
            label1="Year of registration"
            label2="Registration number"
          />
          <div className="row">
            <div className="seven wide column">
              <YearInput
                popupPosition="bottom center"
                closable
                clearable
                value={yearOfRegistration}
                defaultValue={yearOfRegistration}
                onChange={handleDateChange}
                iconPosition="right"
                name="yearOfRegistration"
                placeholder="Pick a year"
              />
            </div>
            <div className="eight wide column">
              <input
                className="st-input"
                name="registrationNumber"
                onChange={handleChange}
                defaultValue={state.registrationNumber}
              />
            </div>
          </div>
          <FormLabels label1="Volunteers" label2="Number of volunteers" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                name="volunteers"
                onChange={handleChange}
                defaultValue={state.volunteers}
              >
                <option value="">Yes</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <input
                className="st-input"
                name="numberOfVolunteers"
                onChange={handleChange}
                defaultValue={state.numberOfVolunteers}
                type="number"
              />
            </div>
          </div>
          <FormLabels label1="Partnership" label2="Partnership type" />
          <div className="row">
            <div className="seven wide column">
              <input
                className="st-input"
                name="partnerships"
                onChange={handleChange}
                defaultValue={state.partnerships}
              />
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                name="partnershipType"
                onChange={handleChange}
                defaultValue={state.partnershipType}
              >
                <option value="">Placeholder text</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <FormLabels
            label1="Total amount invested"
            label2="Are you operating in Edo state?"
          />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                name="totalAmountInvested"
                onChange={handleChange}
                defaultValue={state.totalAmountInvested}
              >
                <option value="">Direct</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                name="operatingInEdoState"
                onChange={handleChange}
                defaultValue={state.operatingInEdoState}
              >
                <option value="">Yes</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <FormLabels
            label1="Year operation started in Edo state"
            label2="Willing to partner with Edo state government?"
          />
          <div className="row">
            <div className="seven wide column">
              <YearInput
                popupPosition="bottom center"
                closable
                clearable
                value={edoStateOperationStartYear}
                defaultValue={edoStateOperationStartYear}
                onChange={handleDateChange}
                iconPosition="right"
                name="edoStateOperationStartYear"
                placeholder="Pick a year"
              />
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                name="partnerWithEdoStateGovernment"
                onChange={handleChange}
                defaultValue={state.partnerWithEdoStateGovernment}
              >
                <option value="">Yes</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <FormLabels label1="Country" label2="State" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                name="country"
                onChange={handleChange}
                defaultValue={state.country}
              >
                <option value="">Nigeria</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <select
                className="ui dropdown st-input"
                name="state"
                onChange={handleChange}
                defaultValue={state.state}
              >
                <option value="">Edo</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
          </div>
          <FormLabels label1="Impact type" label2="Founder" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                name="impactType"
                onChange={handleChange}
                defaultValue={state.impactType}
              >
                <option value="">High</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <input
                className="st-input"
                name="founder"
                onChange={handleChange}
                defaultValue={state.founder}
              />
            </div>
          </div>
          <FormLabels label1="Website" label2="Head office address" />
          <FormInputs
            id1="website"
            name1="website"
            id2="headOfficeAddress"
            name2="headOfficeAddress"
            handleChange={handleChange}
            value1={state.website}
            value2={state.headOfficeAddress}
          />
          <FormLabels label1="State office address" label2="Phone number 1" />
          <FormInputs
            id1="stateOfficeAddress"
            name1="stateOfficeAddress"
            id2="phoneNumberOne"
            name2="phoneNumberOne"
            handleChange={handleChange}
            value1={state.stateOfficeAddress}
            value2={state.phoneNumberOne}
          />
          <FormLabels label1="Phone number 2" label2="Phone number 3" />
          <FormInputs
            id1="phoneNumberTwo"
            name1="phoneNumberTwo"
            id2="phoneNumberThree"
            name2="phoneNumberThree"
            handleChange={handleChange}
            value1={state.phoneNumberTwo}
            value2={state.phoneNumberThree}
          />
          <FormLabels label1="Staff strength" label2="Local contact person" />
          <div className="row">
            <div className="seven wide column">
              <select
                className="ui dropdown st-input"
                name="staffStrength"
                onChange={handleChange}
                defaultValue={state.staffStrength}
              >
                <option value="">200</option>
                <option value="1">option 1</option>
                <option value="0">option 2</option>
              </select>
            </div>
            <div className="eight wide column">
              <input
                className="st-input"
                name="localContactPerson"
                onChange={handleChange}
                defaultValue={state.localContactPerson}
              />
            </div>
          </div>
          <FormLabels
            label1="Email address of contact person"
            label2="Phone number of contact person"
          />
          <FormInputs
            id1="contactPersonEmailAddress"
            name1="contactPersonEmailAddress"
            id2="contactPersonPhoneNumber"
            name2="contactPersonPhoneNumber"
            handleChange={handleChange}
            value1={state.contactPersonEmailAddress}
            value2={state.contactPersonPhoneNumber}
          />
          <FormLabels label1="Notes" />
          <FormNotesTextarea handleChange={handleChange} value={state.notes} />
          <div className="row">
            <div className="thirteen wide column pr-25">
              <button
                type="submit"
                className="btn-save right floated"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

BasicInformationForm.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  state: PropTypes.shape({}).isRequired,
  yearOfRegistration: PropTypes.string,
  edoStateOperationStartYear: PropTypes.string,
  pages: PropTypes.number,
  step: PropTypes.number,
};

export default BasicInformationForm;
