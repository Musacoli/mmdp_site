/** A custom row to manage the relationship between the relationship */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';
import _ from 'lodash';
import toastr from 'toastr';
import { partnershipItemTemplate } from '../../../../utils/resources/stakeholderDirectory/staticFields';

class ManagePartnerships extends Component {
  state = {
    partnerships: [],
    partnershipTypes: [],
    message: 'some text',
    messageHiddenStatus: true,
    isWarning: false,
  };

  componentDidMount() {
    const {
      data: { partnerships },
    } = this.props;

    const partners = [];
    const types = [];

    partnerships.forEach((entry) => {
      partners.push(entry.stakeholder2Id);
      types.push(entry.partnershipTypeId);
    });

    this.setState({
      partnerships: partners,
      partnershipTypes: types,
    });
  }

  onPartnershipsTypeChange = (e, { value }) => {
    const { partnerships } = this.state;
    this.handleMissingPartnerships(partnerships, value);
    this.createPartnershipsObject(partnerships, value);
  };

  onPartnershipsChange = (e, { value }) => {
    const { partnershipTypes } = this.state;
    e.persist();
    // manage visibility of the message bar
    const messageVisible = value.length === 0;
    // match the length of the partnerships to partnerships type
    if (value.length >= partnershipTypes.length) {
      this.handleMissingPartnershipTypes(value, partnershipTypes);
      this.setState({
        partnerships: value,
        messageHiddenStatus: messageVisible,
      });
    } else {
      toastr.warning(
        'To clear or remove an item from the partnerships selection, Please remove the corresponding entries in the partnerships types selection ',
        'Rejected Operation',
      );
    }
  };

  handleMissingPartnershipTypes = (partnerships, types) => {
    // handle the message for missing partnerships type
    const matchWithPartnershipsLength = partnerships.length !== types.length;
    if (matchWithPartnershipsLength === false) {
      this.setState({ isWarning: false });
    } else {
      const missing = partnerships.length - types.length;
      const message = `${missing} partners have no corresponding partnership types`;
      this.setState({ isWarning: true, message });
    }
  };

  handleMissingPartnerships = (partnerships, types) => {
    const diff = types.length - partnerships.length;
    let message = '';
    if (diff > 0) {
      message =
        'The number of partnership types exceeds selected partnerships.';
      toastr.warning(message, 'Value rejected');
    } else if (diff === 0) {
      message = 'Success.Partnership Types match partnerships';
      this.setState({
        message,
        isWarning: false,
        partnershipTypes: types,
      });
    } else {
      // actually update the value of partnerships
      message = `${-1 * diff} partnership types are required`;
      this.setState({
        partnershipTypes: types,
        isWarning: true,
        message,
      });
    }
  };

  getPartnershipTypeOptions = () => {
    const { partnerships, partnershipTypes } = this.state;
    const { partnershipTypesData } = this.props;
    const options = _.cloneDeep(partnershipTypesData.data);
    // get the ID of the last partner without an associated partnership type
    const currentIndex = partnershipTypes.length;
    // debugger;
    const oldOptions = this.partnershipTypesToOptions(
      partnershipTypes,
      options,
    );
    const newOptions = this.addSuffixToTypeOptions(
      options,
      partnerships[currentIndex],
      oldOptions.length,
    );

    return [...oldOptions, ...newOptions];
  };

  addSuffixToTypeOptions = (options, suffix, initialCount = 0) => {
    // add suffix to option values to make them unique
    let count = initialCount;
    return options.map((item) => {
      const temp = item;
      temp.key = count;
      // check if already has a suffix
      const hasSuffix = suffix === undefined;
      temp.value = hasSuffix ? item.value : `${item.value}suffix${suffix}`;

      count += 1;
      return temp;
    });
  };

  partnershipTypesToOptions = (types, validOptions) => {
    // convert partnership types to valid options
    let count = 0;
    return types.map((type) => {
      const str = type.substr(0, type.lastIndexOf('suffix')) || type;
      const option = _.find(validOptions, { value: str }) || { text: '' };
      const temp = {
        text: option.text,
        value: type,
        key: count,
      };
      count += 1;
      return temp;
    });
  };

  createPartnershipsObject = (partnerships, partnershipTypes) => {
    const { onChange } = this.props;
    const temp = [];
    let count = 0;
    if (
      partnerships.length === partnershipTypes.length &&
      partnerships.length > 0
    ) {
      partnerships.forEach((partner) => {
        const template = _.cloneDeep(partnershipItemTemplate);
        template.stakeholder2Id = partner;
        const type = partnershipTypes[count];
        template.partnershipTypeId =
          type.substr(0, type.lastIndexOf('suffix')) || type;
        temp.push(template);
        count += 1;
      });

      // dispatch Event to update the object
      const event = new Event('input', { bubbles: true });
      onChange(event, { name: 'partnerships', value: temp });
    }
  };

  render() {
    const {
      partnerships,
      partnershipTypes,
      message,
      messageHiddenStatus,
      isWarning,
    } = this.state;
    const { partnershipData, partnershipTypesData } = this.props;
    const common = {
      noResultsMessage: 'There are no results to display',
      fluid: true,
      search: true,
      clearable: true,
      multiple: true,
      upward: false,
    };
    return (
      <React.Fragment>
        <Message
          hidden={messageHiddenStatus}
          icon="handshake"
          header="partnerships status"
          content={message}
          negative={isWarning}
        />
        <Form.Group widths="equal">
          <Form.Select
            value={partnerships}
            name="partnerships"
            label="Partnerships"
            placeholder="partnerships"
            options={partnershipData.data}
            loading={partnershipData.loading}
            onChange={this.onPartnershipsChange}
            onLabelClick={this.onLabelClick}
            {...common}
          />
          <Form.Select
            value={partnershipTypes}
            name="partnershipTypes"
            label="Partnership Types"
            placeholder="partnership types"
            options={this.getPartnershipTypeOptions()}
            loading={partnershipTypesData.loading}
            onChange={this.onPartnershipsTypeChange}
            {...common}
          />
        </Form.Group>
      </React.Fragment>
    );
  }
}

ManagePartnerships.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  partnershipData: PropTypes.instanceOf(Object).isRequired,
  partnershipTypesData: PropTypes.instanceOf(Object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ManagePartnerships;
