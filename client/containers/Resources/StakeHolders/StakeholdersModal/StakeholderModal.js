import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Modal } from 'semantic-ui-react';
import _ from 'lodash';
import uuid4 from 'uuid/v4';
import StakeholderModalItem from '../../../../components/Resources/Stakeholders/StakeholderModalItem';
import {
  handleBeneficiaryGenderDistribution,
  handleFocusAreas,
  handleGetPartnerships,
  handleGetValue,
  handleMultipleStrings,
  handleTotals,
} from '../../../../utils/resources/stakeholderDirectory/Stakeholders';

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
    const { item } = this.props;
    const beneficiaries = item.beneficiaries || [];
    const address = _.find(item.adresses || [], { addressType: 'HOME' });
    const FocusAreas = handleFocusAreas(beneficiaries);
    this.setState({
      schema: {
        'Year of Registration': handleGetValue(item, 'yearOfCacREG'),
        'RC Number': handleGetValue(item, 'cacRcNumber'),
        'Category ': handleGetValue(item, 'organisationTypeId', 'typeName'),
        'Founder name': handleGetValue(item, 'founder'),
        'Founders Phone Number': handleGetValue(item, 'phoneNumber'),
        'Location ': handleGetValue(address, 'address'),
        'Thematic Pillar (s)': FocusAreas[1],
        'Sub Theme (s)': FocusAreas[0],
        'Focus Area (s) ': FocusAreas[2],
        'Service (s)': handleMultipleStrings('serviceName', '', beneficiaries),
        'Source (s) of Funding': handleMultipleStrings(
          'sourceOfFundingId',
          'sourceOfFundingName',
          beneficiaries,
          '-',
          'fundingSources',
        ),
        'Amount Invested till date': handleTotals(
          'amountInvested',
          beneficiaries,
        ),
        'Local Communities': handleMultipleStrings(
          'communityId',
          'communityName',
          beneficiaries,
          '-',
          'communities',
        ),
        'LGA of Operation': handleMultipleStrings(
          'lgaId',
          'lgaName',
          beneficiaries,
          '-',
          'communities',
        ),
        'Partners (Local and International)': handleGetPartnerships(item),
        'Gender distribution of beneficiaries (in percentage) Male %  Female%': handleBeneficiaryGenderDistribution(
          beneficiaries,
          'beneficiaryTypes',
        ),
        'Total Number of Beneficiary': handleTotals(
          'totalNumberOfBeneficiaries',
          beneficiaries,
          'beneficiaryTypes',
        ),
        'Beneficiary Type': handleMultipleStrings(
          'beneficiaryTypeId',
          'beneficiaryTypeName',
          beneficiaries,
          '-',
          'beneficiaryTypes',
        ),
        'Target Audience (s)': handleMultipleStrings(
          'targetAudienceId',
          'audienceType',
          beneficiaries,
        ),
        'Number of Staff': handleGetValue(
          item,
          'staffStrengthRangeId',
          'staffStrength',
        ),
        'Number of Volunteers': handleGetValue(item, 'volunteersCount'),
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
          {item.organisationName}
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
