import Joi from 'joi';

export default {
  stakeholdersDirectory: {
    body: Joi.object({
      basicInformation: Joi.object({
        stakeholderName: Joi.string()
          .required()
          .label('Stakeholder Name'),
        email: Joi.string()
          .email()
          .label('Email'),
        organisationType: Joi.string()
          .required()
          .label('Organisation Type'),
        registrationStatus: Joi.string()
          .required()
          .label('Registration Status'),
        yearOfRegistration: Joi.date()
          .iso()
          .required()
          .label('Year of Registration'),
        registrationNumber: Joi.string()
          .required()
          .label('Registration Number'),
        volunteers: Joi.string()
          .required()
          .label('Volunteers'),
        numberOfVolunteers: Joi.number()
          .required()
          .label('Number of Volunteers'),
        partnerships: Joi.string()
          .required()
          .label('Partnerships'),
        partnershipType: Joi.string()
          .required()
          .label('Partnerships Type'),
        impactType: Joi.string()
          .required()
          .label('Impact Type'),
        operatingInEdoState: Joi.boolean()
          .required()
          .label('Operating in Edo State'),
        edoStateOperationStartYear: Joi.date()
          .iso()
          .required()
          .label('Edo State Operation Start Year'),
        partnerWithEdoStateGovernment: Joi.boolean()
          .required()
          .label('Partner with Edo State Government'),
        country: Joi.string()
          .required()
          .label('Country'),
        state: Joi.string().label('State'),
        totalAmountInvested: Joi.string().label('Total Amount Invested'),
        founder: Joi.string()
          .required()
          .label('Founder'),
        website: Joi.string()
          .uri()
          .label('Website'),
        headOfficeAddress: Joi.string()
          .required()
          .label('Head office Address'),
        stateOfficeAddress: Joi.string().label('State Office Address'),
        phoneNumberOne: Joi.string()
          .required()
          .label('Phone Number One'),
        phoneNumberTwo: Joi.string().label('Phone Number Two'),
        phoneNumberThree: Joi.string().label('Phone Number Three'),
        staffStrength: Joi.string().label('Staff Strength'),
        localContactPerson: Joi.string().label('Local Contact Person'),
        contactPersonEmailAddress: Joi.string()
          .email()
          .label('Contact Person Email Address'),
        contactPersonPhoneNumber: Joi.string().label(
          'Contact Person Phone Number',
        ),
        notes: Joi.string().label('Notes'),
      })
        .required()
        .label('Basic Information'),
      beneficiaryService: Joi.array()
        .items(
          Joi.object({
            serviceName: Joi.string()
              .required()
              .label('Service Name'),
            targetAudience: Joi.string()
              .required()
              .label('Target Audience'),
            beneficiaryType: Joi.string()
              .required()
              .label('Beneficiary Type'),
            numberOfMaleBeneciaries: Joi.number()
              .required()
              .label('Number of Male Beneficiaries'),
            numberOfFemaleBeneciaries: Joi.number()
              .required()
              .label('Number of Female Beneficiaries'),
            frequency: Joi.number().label('Frequency'),
            duration: Joi.string().label('Duration'),
            numberOfBeneciariesPerService: Joi.number().label(
              'Number of Beneficiaries per Service',
            ),
            thematicPillars: Joi.string()
              .required()
              .label('Thematic Pillars'),
            subTheme: Joi.string()
              .required()
              .label('Sub theme'),
            focusArea: Joi.string()
              .required()
              .label('Focus Area'),
            fundingSource: Joi.string()
              .required()
              .label('Funding Source'),
            amountInvested: Joi.string().label('Amount Invested'),
            country: Joi.string()
              .required()
              .label('Country'),
            state: Joi.string()
              .required()
              .label('State'),
            localGovernment: Joi.string()
              .required()
              .label('Local Goverment'),
            ward: Joi.string().label('Ward'),
            localCommunities: Joi.string()
              .required()
              .label('Local Communities'),
            totalNumberOfBeneficiaries: Joi.number().label(
              'Total Number of Beneficiaries',
            ),
            notes: Joi.string().label('Notes'),
          }),
        )
        .required()
        .label('Beneficiary Service'),
    }),
  },
};
