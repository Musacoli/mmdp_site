import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import uuid4 from 'uuid/v4';
import StakeholderModalItem from '../../../../components/Resources/Stakeholders/StakeholderModalItem';

class StakeholderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      schema: {},
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    const {
      item: { basicInformation },
    } = this.props;
    this.setState({
      schema: {
        'Year of Registration': basicInformation.yearOfRegistration,
        'RC Number': basicInformation.registrationNumber,
        'Category ': basicInformation.organisationType,
        'Founder name': basicInformation.founder,
        'Founders Phone Number': basicInformation.phoneNumberOne,
        'Location ': basicInformation.headOfficeAddress,
        'Thematic Pillar (s)': this.handleMultipleStrings('thematicPillars'),
        'Sub Theme (s)': this.handleMultipleStrings('subTheme'),
        'Focus Area (s) ': this.handleMultipleStrings('focusArea'),
        'Service (s)': this.handleMultipleStrings('serviceName'),
        'Source (s) of Funding': this.handleMultipleStrings('fundingSource'),
        'Amount Invested till date': this.handleTotals('amountInvested'),
        'Local Communities': this.handleMultipleStrings('localCommunities'),
        'LGA of Operation': this.handleMultipleStrings('localGovernment'),
        'Partners (Local and International)': basicInformation.partnerships,
        'Gender distribution of beneficiaries (in percentage) Male %  Female%': this.handleBeneficiaryGenderDistribution(),
        'Total Number of Beneficiary': this.handleTotals(
          'totalNumberOfBeneficiaries',
        ),
        'Beneficiary Type': this.handleMultipleStrings('beneficiaryType'),
        'Target Audience (s)': this.handleMultipleStrings('targetAudience'),
        'Number of Staff': basicInformation.staffStrength,
        'Number of Volunteers': basicInformation.numberOfVolunteers,
      },
    });
  }

  handleOpen = () => {
    const { modalOpen } = this.state;
    if (!modalOpen) {
      this.setState({ modalOpen: true });
    }
  };

  handleClose = () => {
    const { modalOpen } = this.state;
    this.handleBeneficiaryGenderDistribution();
    if (modalOpen) this.setState({ modalOpen: false });
  };

  handleItems = () => {
    const { schema } = this.state;

    // truncate the schema into groups of 3 for each row using lodash
    const truncated = _.chunk(Object.keys(schema), 3);

    // iterate through out the list creating columns and rows
    // return the rows
    return truncated.map((row) => {
      const children = row.map((col) => {
        const obj = {};
        obj[col] = schema[col];
        return <StakeholderModalItem key={uuid4()} entry={obj} />;
      });
      return (
        <Grid.Row key={uuid4()} columns={3} className="sh-card-row">
          {children}
        </Grid.Row>
      );
    });
  };

  handleBeneficiaryGenderDistribution = () => {
    const {
      item: { beneficiaryService },
    } = this.props;

    let male = 0;
    let female = 0;

    if (beneficiaryService) {
      beneficiaryService.forEach((service) => {
        male += service.numberOfMaleBeneciaries;
        female += service.numberOfFemaleBeneciaries;
      });

      const total = male + female;
      return `Male:${Math.round((male / total) * 100)}%, Female:${Math.round(
        (female / total) * 100,
      )}%`;
    }
    return '-';
  };

  handleMultipleStrings = (key) => {
    const {
      item: { beneficiaryService },
    } = this.props;
    const str = [];

    if (beneficiaryService) {
      beneficiaryService.forEach((service) => {
        str.push(service[key]);
      });
    }

    const unique = [...new Set(str)];
    if (unique.length > 0) {
      return _.join(unique);
    }
    return '-';
  };

  handleTotals = (key) => {
    const {
      item: { beneficiaryService },
    } = this.props;
    let total = 0;

    if (beneficiaryService) {
      beneficiaryService.forEach((service) => {
        total += service[key];
      });
    }

    return total;
  };

  render() {
    const { trigger, item } = this.props;
    const { modalOpen } = this.state;
    return (
      <Modal
        trigger={trigger}
        className="sh-modal"
        open={modalOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        <Modal.Header className="sh-modal-header">
          {item.basicInformation.stakeholderName}
          <button
            type="button"
            onClick={this.handleClose}
            className="close-stakeholder-modal"
          />
        </Modal.Header>
        <hr className="sh-hr" />
        <Grid columns={3}>{this.handleItems()}</Grid>
      </Modal>
    );
  }
}

StakeholderModal.propTypes = {
  trigger: PropTypes.element.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};

export default StakeholderModal;
