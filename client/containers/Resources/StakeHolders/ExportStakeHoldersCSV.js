/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import converter from 'json-2-csv';
import FileSaver from 'file-saver';
import toastr from 'toastr';
import _ from 'lodash';
import {
  handleFocusAreas,
  handleGetPartnerships,
  handleGetValue,
  handleMultipleStrings,
  handleStakeholderAddresses,
  handleTotals,
} from '../../../utils/resources/Stakeholders';

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
    // debugger;
    const { data } = this.props;
    const temp = _.cloneDeep(data);
    const beneficiaries = [];
    const filtered = temp.map((item) => {
      // remove the beneficiaries from the original data
      if (item.beneficiaries) {
        beneficiaries.push(item.beneficiaries);
      }
      return item;
    });

    // update state
    this.setState({
      stakeholderData: filtered.map((values) =>
        this.mapValuesToStakeholdersSchema(values, values.beneficiaries),
      ),
      beneficiaryService: beneficiaries.map((value) =>
        this.mapValuesToBeneficiariesSchema(value[0]),
      ),
    });
  };

  mapValuesToStakeholdersSchema = (item, beneficiaries) => {
    const FocusAreas = handleFocusAreas(beneficiaries);
    return {
      'S/N': handleGetValue(item, '_id'),
      'Name of Organization': handleGetValue(item, 'organisationName'),
      'Category / Type': handleGetValue(item, 'organisationTypeId', 'typeName'),
      // Country: values.country,
      // State: values.state,
      'Head Office Location/Address': handleStakeholderAddresses(item, 'HOME'),
      'State Office Location/Address': handleStakeholderAddresses(
        item,
        'BRANCH',
      ),
      'Registration Status': handleGetValue(
        item,
        'registrationStatusId',
        'registrationStatus',
      ),
      'Year of Registration': handleGetValue(item, 'yearOfCacREG'),
      'RC Number': handleGetValue(item, 'cacRcNumber'),
      'Number of Staff': handleGetValue(
        item,
        'staffStrengthRangeId',
        'staffStrength',
      ),
      'Volunteers?':
        typeof handleGetValue(item, 'volunteersCount') === 'number',
      'Number of Volunteers': handleGetValue(item, 'volunteersCount'),
      Partnerships: handleGetPartnerships(item),
      'Partnership Type': handleGetPartnerships(item, 'partnershipType'),
      'Operating in Edo State?':
        handleGetValue(item, 'edoStateOperationStartYear') !== '-',
      'Year Started in Edo State': handleGetValue(
        item,
        'edoStateOperationStartYear',
      ),
      'Willing to partner with Edo State Government?': handleGetValue(
        item,
        'partnerWithGovernment',
      ),
      'Impact Type': handleGetValue(item, 'impactTypeID', 'impactTypeName'),
      'Total Amount Invested': handleTotals('amountInvested', beneficiaries),
      Founder: handleGetValue(item, 'founder'),
      'Phone Number': handleGetValue(item, 'phoneNumber'),
      'Email Address': handleGetValue(item, 'email'),
      'Local Contact Person': handleGetValue(item, 'localManagerName'),
      'Phone number of contact Person': handleGetValue(
        item,
        'localManagerMobile',
      ),
      'Email address of contact person': handleGetValue(
        item,
        'localManagerEmail',
      ),
      Website: handleGetValue(item, 'email'),
      Notes: handleGetValue(item, 'note'),
      'Name of Service': handleMultipleStrings(
        'serviceName',
        '',
        beneficiaries,
      ),
      'Target Audience': handleMultipleStrings(
        'targetAudienceId',
        'audienceType',
        beneficiaries,
      ),
      'Beneficiary Type(Migrants, displaced persons)': handleMultipleStrings(
        'beneficiaryTypeId',
        'beneficiaryTypeName',
        beneficiaries,
      ),
      'Number of Male Beneficiaries': handleTotals(
        'averageNumberOfMaleBeneficiaries',
        beneficiaries,
      ),
      'Number of Female Beneficiaries': handleTotals(
        'averageNumberOfFemaleBeneficiaries',
        beneficiaries,
      ),
      'Number of Beneficiary': handleTotals(
        'averageNumberOfMaleBeneficiaries',
        beneficiaries,
      ),
      'Thematic Pillar': FocusAreas[1],
      'Sub Theme': FocusAreas[0],
      'Focus Area': FocusAreas[2],
      'Source of Funding': handleMultipleStrings(
        'sourceOfFundingId',
        'sourceOfFundingName',
        beneficiaries,
      ),
      'LGA of operation': handleMultipleStrings(
        'localGovernmentArea',
        'lgaName',
        beneficiaries,
      ),
      Ward: handleMultipleStrings('ward', 'wardName', beneficiaries),
      'Local Community': handleMultipleStrings(
        'community',
        'communityName',
        beneficiaries,
      ),
      'Total number of beneficiaries reached by stakeholder': handleTotals(
        'totalNumberOfBeneficiaries',
        beneficiaries,
      ),
    };
  };

  mapValuesToBeneficiariesSchema = (item) => {
    return {
      'S/N': handleGetValue(item, '_id'),
      'Name of Service': handleGetValue(item, 'serviceName'),
      'Target Audience': handleGetValue(
        item,
        'targetAudienceId',
        'audienceType',
      ),
      'Beneficiary Type(Migrants, displaced persons)': handleGetValue(
        item,
        'beneficiaryTypeId',
        'beneficiaryTypeName',
      ),
      'Number of Male Beneficiaries': handleGetValue(
        item,
        'averageNumberOfMaleBeneficiaries',
      ),
      'Number of Female Beneficiaries': handleGetValue(
        item,
        'averageNumberOfFemaleBeneficiaries',
      ),
      'Frequency(days)': handleGetValue(item, 'frequency'),
      'Duration(Days)': handleGetValue(item, 'duration'),
      'Number of Beneficiary': handleGetValue(
        item,
        'totalNumberOfBeneficiaries',
      ),
      'Thematic Pillar': handleGetValue(
        item,
        'focusArea',
        'thematicPillarName',
      ),
      'Sub Theme': handleGetValue(item, 'focusArea', 'subThemeName'),
      'Focus Area': handleGetValue(item, 'focusArea', 'focusAreaName'),
      'Source of Funding': handleGetValue(
        item,
        'sourceOfFundingId',
        'sourceOfFundingName',
      ),
      'Amount Invested per service': handleGetValue(
        item,
        'amountInvestedRange',
        'amountInvestedRange',
      ),
      'LGA of operation': handleGetValue(
        item,
        'localGovernmentArea',
        'lgaName',
      ),
      Ward: handleGetValue(item, 'ward', 'wardName'),
      'Local Community': handleGetValue(item, 'community', 'communityName'),
      'Total number of beneficiaries reached by stakeholder': handleGetValue(
        item,
        'totalNumberOfBeneficiaries',
      ),
    };
  };

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
