import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { AddStakeholder } from '../../../containers/Stakeholders/addStakeholder';

describe('<AddStakeholder /> ', () => {
  const props = {
    step: 1,
    pages: 2,
    fetchStates: jest.fn(),
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

  const response = {
    adding: true,
  };
  const wrapper = shallow(
    <AddStakeholder
      addStakeholder={jest.fn}
      response={response}
      state={props}
      fetchStates={jest.fn()}
    />,
    new ReactRouterEnzymeContext(),
  );

  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'title',
      value: 'This is My Title',
    },
  };

  it('renders Add stakeholder conatiner without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('', () => {
    wrapper.instance().handleChange(event);
    wrapper.instance().handlePrev(event);
    wrapper.instance().handleNext(event);
    wrapper.instance().handleDateChange(event, 'yearOfRegistration', '2020');
    wrapper.instance().handleAddnewBeneficiary(event);
    wrapper.instance().handleFormContent(event);
    wrapper.instance().handleSubmit(event);
  });
});
