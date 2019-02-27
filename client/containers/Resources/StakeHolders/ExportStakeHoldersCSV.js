import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import converter from 'json-2-csv';
import FileSaver from 'file-saver';
import toastr from 'toastr';
import _ from 'lodash';
import {
  mapValuesToBeneficiariesSchema,
  mapValuesToStakeholdersSchema,
} from '../../../utils/resources/stakeholderDirectory/exportStakeholderToCSVUtils';

class ExportStakeHoldersCsv extends Component {
  constructor(props) {
    super(props);
    this.state = { stakeholderData: [], beneficiaryService: [] };
  }

  componentDidUpdate(prevProps, prevState) {
    const { stakeholderData, beneficiaryService } = this.state;
    const options = {
      delimiter: { wrap: '"', field: ',', eol: '\n' },
      prependHeader: true,
      sortHeader: false,
      excelBOM: true,
      trimHeaderValues: true,
      trimFieldValues: true,
    };
    if (prevState !== this.state) {
      this.writeToCSV(stakeholderData, options, 'Stakeholders.csv'); // write to csv
      this.writeToCSV(beneficiaryService, options, 'Beneficiaries.csv'); // write to csv
    }
  }

  handleData = () => {
    const { data } = this.props; // remove nested lists from lists
    const temp = _.cloneDeep(data);
    const beneficiaries = [];
    const filtered = temp.map((item) => {
      if (item.beneficiaries) {
        const ben = item.beneficiaries.map((beneficiary) => {
          const variable = beneficiary;
          variable.organisationName = item.organisationName;
          return variable;
        });

        beneficiaries.push(ben);
      }
      return item;
    }); // update state
    this.setState({
      stakeholderData: filtered.map((values) =>
        mapValuesToStakeholdersSchema(values, values.beneficiaries),
      ),
      beneficiaryService: beneficiaries.map((value) =>
        mapValuesToBeneficiariesSchema(value[0]),
      ),
    });
  };

  writeToCSV = (data, options, filename) => {
    converter.json2csv(
      data,
      (err, csv) => {
        if (err) toastr.warning(err);
        const file = new File([csv], filename);
        FileSaver.saveAs(file);
      },
      options,
    );
  };

  render() {
    const { data } = this.props;
    return data.length > 0 ? (
      <Button icon primary onClick={this.handleData} className="Export-CSV">
        <Icon name="cloud download" />
        &nbsp;Export CSV
      </Button>
    ) : (
      <div />
    );
  }
}

ExportStakeHoldersCsv.propTypes = {
  data: PropTypes.instanceOf(Object),
};

export default ExportStakeHoldersCsv;
