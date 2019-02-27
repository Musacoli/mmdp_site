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
    const { item } = this.props;
    const FocusAreas = this.handleFocusAreas();
    this.setState({
      schema: {
        'Year of Registration': this.handleGetValue(item, 'yearOfCacREG'),
        'RC Number': this.handleGetValue(item, 'cacRcNumber'),
        'Category ': this.handleGetValue(
          item,
          'organisationTypeId',
          'typeName',
        ),
        'Founder name': this.handleGetValue(item, 'founder'),
        'Founders Phone Number': this.handleGetValue(item, 'phoneNumber'),
        'Location ': this.handleGetValue(item, 'locality'),
        'Thematic Pillar (s)': FocusAreas[1],
        'Sub Theme (s)': FocusAreas[0],
        'Focus Area (s) ': FocusAreas[2],
        'Service (s)': this.handleMultipleStrings('serviceName'),
        'Source (s) of Funding': this.handleMultipleStrings(
          'sourceOfFundingId',
          'sourceOfFundingName',
        ),
        'Amount Invested till date': this.handleTotals('amountInvested'),
        'Local Communities': this.handleMultipleStrings(
          'community',
          'communityName',
        ),
        'LGA of Operation': this.handleMultipleStrings(
          'localGovernmentArea',
          'lgaName',
        ),
        'Partners (Local and International)': this.handleGetPartnerships(),
        'Gender distribution of beneficiaries (in percentage) Male %  Female%': this.handleBeneficiaryGenderDistribution(),
        'Total Number of Beneficiary': this.handleTotals(
          'totalNumberOfBeneficiaries',
        ),
        'Beneficiary Type': this.handleMultipleStrings(
          'beneficiaryTypeId',
          'beneficiaryTypeName',
        ),
        'Target Audience (s)': this.handleMultipleStrings(
          'targetAudienceId',
          'audienceType',
        ),
        'Number of Staff': this.handleGetValue(item, 'staffStrength'),
        'Number of Volunteers': this.handleGetValue(item, 'volunteersCount'),
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
      item: { beneficiaries },
    } = this.props;

    let male = 0;
    let female = 0;

    if (beneficiaries.length > 0) {
      beneficiaries.forEach((service) => {
        male += service.averageNumberOfMaleBeneficiaries;
        female += service.averageNumberOfFemaleBeneficiaries;
      });

      const total = male + female;
      return `Male:${Math.round((male / total) * 100)}%, Female:${Math.round(
        (female / total) * 100,
      )}%`;
    }
    return '-';
  };

  handleMultipleStrings = (key, subkey) => {
    const {
      item: { beneficiaries },
    } = this.props;
    const str = [];

    if (beneficiaries) {
      beneficiaries.forEach((service) => {
        str.push(this.handleGetValue(service, key, subkey));
      });
    }

    const unique = [...new Set(str)];
    if (unique.length > 0) {
      _.pull(unique, '-');
      return _.join(unique);
    }
    return '-';
  };

  handleGetValue = (obj, key = '', subKey = '') => {
    const primary = obj[key];
    if (primary !== null && primary !== undefined) {
      const secondary = primary[subKey];
      if (secondary !== null && secondary !== undefined) {
        return secondary;
      }
      return primary;
    }
    return '-';
  };

  handleTotals = (key) => {
    const {
      item: { beneficiaries },
    } = this.props;
    let total = 0;

    if (beneficiaries) {
      beneficiaries.forEach((service) => {
        if (service[key]) {
          total += service[key];
        }
      });
    }

    return total;
  };

  handleGetPartnerships = () => {
    const { item } = this.props;
    const partners = item.partnerships;
    const partnerships1 = [];
    // get all partnerships names
    if (partners.length > 0) {
      partners.forEach((partner) => {
        partnerships1.push(partner.stakeholder1Id);
        partnerships1.push(partner.stakeholder2Id);
      });
    }
    // make sure the components in the arrays are unique
    const uniqueCombinedArray = [...new Set(partnerships1)];
    // remove the name of the current organisationName. This will also mutate the array
    _.pull(uniqueCombinedArray, item.organisationName);

    return uniqueCombinedArray.join(',');
  };

  handleFocusAreas = () => {
    const {
      item: { beneficiaries },
    } = this.props;
    const subThemes = [];
    const thematicPillars = [];
    const FocusAreas = [];

    if (beneficiaries.length > 0) {
      beneficiaries.forEach((service) => {
        if (service.focusArea) {
          FocusAreas.push(service.focusArea.focusAreaName);
          subThemes.push(service.focusArea.subThemeName);
          thematicPillars.push(service.focusArea.thematicPillarName);
        }
      });
    }

    const uniqueSubThemes = [...new Set(subThemes)];
    const uniquePillars = [...new Set(thematicPillars)];
    const uniqueFocusAreas = [...new Set(FocusAreas)];

    return [
      _.join(uniqueSubThemes),
      _.join(uniquePillars),
      _.join(uniqueFocusAreas),
    ];
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
