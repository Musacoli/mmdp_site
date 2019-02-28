/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import converter from 'json-2-csv';
import FileSaver from 'file-saver';
import toastr from 'toastr';
import _ from 'lodash';

class ExportStakeHoldersCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stakeholderData: [],
      beneficiaryService: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { stakeholderData, beneficiaryService } = this.state;
    const options = {
      delimiter: {
        wrap: '"', // Double Quote (") character
        field: ',', // Comma field delimiter
        eol: '\n', // Newline delimiter
      },
      prependHeader: true,
      sortHeader: false,
      excelBOM: true,
      trimHeaderValues: true,
      trimFieldValues: true,
    };

    if (prevState !== this.state) {
      // write to csv
      this.writeToCSV(stakeholderData, options, 'Stakeholders.csv');
      this.writeToCSV(beneficiaryService, options, 'Beneficiaries.csv');
    }
  }

  handleData = () => {
    // remove nested lists from lists
    const { data } = this.props;
    const temp = _.cloneDeep(data);
    const beneficiaries = [];
    const filtered = temp.map((item) => {
      // remove the beneficiaries from the original data
      if (item[0].beneficiaryService) {
        beneficiaries.push(item[0].beneficiaryService);
        // delete item[0].beneficiaryService;
      }
      return item[0];
    });

    // update state
    this.setState({
      stakeholderData: filtered.map((values) =>
        this.mapValuesToStakeholdersSchema(
          values.basicInformation,
          values.beneficiaryService,
        ),
      ),
      beneficiaryService: beneficiaries.map((value) =>
        this.mapValuesToBeneficiariesSchema(value[0]),
      ),
    });
  };

  handleMultipleStringValues = (beneficiaries, target) => {
    const values = beneficiaries.map((value) => value[target]);
    return values.join();
  };

  handleTotals = (beneficiaries, target) => {
    let total = 0;
    beneficiaries.forEach((value) => {
      total += value[target];
    });
    return total;
  };

  mapValuesToStakeholdersSchema = (values, beneficiaries) => ({
    'S/N': values._id,
    'Name of Organization': values.stakeholderName,
    'Category / Type': values.organisationType,
    Country: values.country,
    State: values.state,
    'Head Office Location/Address': values.headOfficeAddress,
    'State Office Location/Address': values.stateOfficeAddress,
    'Registration Status': values.registrationStatus,
    'Year of Registration': values.yearOfRegistration,
    'RC Number': values.registrationNumber,
    'Number of Staff': values.staffStrength,
    'Volunteers?': values.volunteers,
    'Number of Volunteers': values.numberOfVolunteers,
    Partnerships: values.partnerships,
    'Partnership Type': values.partnershipType,
    'Operating in Edo State?': values.operatingInEdoState,
    'Year Started in Edo State': values.edoStateOperationStartYear,
    'Willing to partner with Edo State Government?':
      values.partnerWithEdoStateGovernment,
    'Impact Type': values.impactType,
    'Total Amount Invested': this.handleTotals(beneficiaries, 'amountInvested'),
    Founder: values.founder,
    'Phone Number': values.phoneNumberOne,
    'Email Address': values.email,
    'Local Contact Person': values.localContactPerson,
    'Phone number of contact Person': values.contactPersonPhoneNumber,
    'Email address of contact person': values.contactPersonEmailAddress,
    Website: values.website,
    Notes: values.notes,
    'Name of Service': this.handleMultipleStringValues(
      beneficiaries,
      'serviceName',
    ),
    'Target Audience': this.handleMultipleStringValues(
      beneficiaries,
      'targetAudience',
    ),
    'Beneficiary Type(Migrants, displaced persons)': this.handleMultipleStringValues(
      beneficiaries,
      'beneficiaryType',
    ),
    'Number of Male Beneficiaries': this.handleTotals(
      beneficiaries,
      'numberOfMaleBeneciaries',
    ),
    'Number of Female Beneficiaries': this.handleTotals(
      beneficiaries,
      'numberOfFemaleBeneciaries',
    ),
    'Number of Beneficiary': this.handleTotals(
      beneficiaries,
      'numberOfBeneciariesPerService',
    ),
    'Thematic Pillar': this.handleMultipleStringValues(
      beneficiaries,
      'thematicPillars',
    ),
    'Sub Theme': this.handleMultipleStringValues(beneficiaries, 'subTheme'),
    'Focus Area': this.handleMultipleStringValues(beneficiaries, 'focusArea'),
    'Source of Funding': this.handleMultipleStringValues(
      beneficiaries,
      'fundingSource',
    ),
    'LGA of operation': this.handleMultipleStringValues(
      beneficiaries,
      'localGovernment',
    ),
    Ward: this.handleMultipleStringValues(beneficiaries, 'ward'),
    'Local Community': this.handleMultipleStringValues(
      beneficiaries,
      'localCommunities',
    ),
    'Total number of beneficiaries reached by stakeholder': this.handleTotals(
      beneficiaries,
      'totalNumberOfBeneficiaries',
    ),
  });

  mapValuesToBeneficiariesSchema = (values) => ({
    'S/N': values._id,
    'Name of Service': values.serviceName,
    'Target Audience': values.targetAudience,
    'Beneficiary Type(Migrants, displaced persons)': values.beneficiaryType,
    'Number of Male Beneficiaries': values.numberOfMaleBeneciaries,
    'Number of Female Beneficiaries': values.numberOfFemaleBeneciaries,
    'Frequency(days)': values.frequency,
    'Duration(Days)': values.duration,
    'Number of Beneficiary': values.numberOfBeneciariesPerService,
    'Thematic Pillar': values.thematicPillars,
    'Sub Theme': values.subTheme,
    'Focus Area': values.focusArea,
    'Source of Funding': values.fundingSource,
    'Amount Invested per service': values.amountInvested,
    'LGA of operation': values.localGovernment,
    Ward: values.ward,
    'Local Community': values.localCommunities,
    'Total number of beneficiaries reached by stakeholder':
      values.totalNumberOfBeneficiaries,
  });

  writeToCSV = (data, options, filename) => {
    converter.json2csv(
      data,
      (err, csv) => {
        if (err) {
          toastr.warning(err);
        }
        const file = new File([csv], filename);
        FileSaver.saveAs(file);
      },
      options,
    );
  };

  render() {
    const { data } = this.props;
    if (data.length > 0) {
      return (
        <Button icon primary onClick={this.handleData} className="Export-CSV">
          <Icon name="cloud download" />
          &nbsp;Export CSV
        </Button>
      );
    }
    return <div />;
  }
}

ExportStakeHoldersCsv.propTypes = {
  data: PropTypes.instanceOf(Object),
};

export default ExportStakeHoldersCsv;
