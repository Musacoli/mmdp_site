import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import toastr from 'toastr';
import uuid from 'uuid/v1';
import InputDropDown from './inputDropDown';
import TextInput from './textInput';
import ActionModal from '../../../../components/common/Modal/ActionModal';

class ManageBeneficiaryTypes extends Component {
  state = {
    beneficiaryType: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      beneficiaryType: nextProps.data.beneficiaryServiceType,
    };
  }

  getOptions = () => {
    const { beneficiaryTypeOptions } = this.props;
    return beneficiaryTypeOptions.data;
  };

  handleDeleteRow = (index) => {
    const { beneficiaryType } = this.state;
    const { handleChange } = this.props;
    // clone beneficiary types
    const temp = _.cloneDeep(beneficiaryType);
    temp.splice(index, 1);

    const event = new Event('input', { bubbles: true });
    handleChange(event, {
      name: 'beneficiaryServiceType',
      value: temp,
    });
  };

  onChange = (index, options) => {
    const { beneficiaryType } = this.state;
    const { handleChange } = this.props;
    // create deep clone of the object
    const temp = _.cloneDeep(beneficiaryType);
    try {
      // update the object safely
      const current = temp[index];
      current[options.name] =
        options.value instanceof Array ? options.value[0] : options.value;
      // if male figures and female figures are available, populate the total beneficiaries
      if (
        current.noOfFemaleBeneficiaries !== '' &&
        current.noOfMaleBeneficiaries !== ''
      ) {
        const male = current.noOfMaleBeneficiaries;
        const female = current.noOfFemaleBeneficiaries;

        current.totalNumberOfBeneficiaries =
          parseInt(male, 10) + parseInt(female, 10);

        // safely update the state
        temp[index] = current;
        handleChange(options.event, {
          name: 'beneficiaryServiceType',
          value: temp,
        });
      }
    } catch (e) {
      toastr.warning(
        'There was ana error proceesing the request please retry or contact the admin',
      );
    }
  };

  render() {
    const { beneficiaryType } = this.state;
    const { beneficiaryTypeOptions } = this.props;
    const common = {
      isRequired: true,
      onChange: this.onChange,
      type: 'number',
    };
    return (
      <div>
        {beneficiaryType.map((val, index) => (
          <Form.Group key={uuid()}>
            <InputDropDown
              data={beneficiaryType[index]}
              placeholder="Beneficiary Type"
              options={this.getOptions()}
              loading={beneficiaryTypeOptions.loading}
              nameValue="beneficiaryTypeId"
              label="Beneficiary Type"
              keyVal={index}
              {...common}
            />
            <Form.Group inline>
              <TextInput
                data={beneficiaryType[index]}
                placeholder="male beneficiaries"
                label="No.of male beneficiaries"
                nameValue="noOfMaleBeneficiaries"
                keyVal={index}
                {...common}
              />
              <TextInput
                data={beneficiaryType[index]}
                placeholder="female beneficiaries"
                label="No.of female beneficiaries"
                nameValue="noOfFemaleBeneficiaries"
                keyVal={index}
                {...common}
              />
              <ActionModal
                group={index}
                confirmDeleteGroup={this.handleDeleteRow}
                header="delete"
                content="Do you want to delete this Beneficiary Type?"
                triggerText={
                  <Icon name="trash alternate outline" size="large" />
                }
              />
            </Form.Group>
          </Form.Group>
        ))}
      </div>
    );
  }
}

ManageBeneficiaryTypes.propTypes = {
  beneficiaryTypeOptions: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ManageBeneficiaryTypes;
