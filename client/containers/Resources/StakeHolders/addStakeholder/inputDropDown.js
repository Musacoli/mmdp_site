import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { handleGetValue } from '../../../../utils/resources/stakeholderDirectory/Stakeholders';

class InputDropDown extends Component {
  state = {
    hasError: false,
    dropDownValue: [],
    event: null,
    // a static list of fields with custom behavior functions defined
    customBehaviourLists: ['registrationStatusId', 'country'],
  };

  componentDidMount() {
    const {
      updateRequiredFields,
      nameValue,
      isRequired,
      isDisabled,
    } = this.props;
    updateRequiredFields(nameValue, isRequired, isDisabled);
  }

  componentDidUpdate(prevProps, prevState) {
    const { dropDownValue, event, customBehaviourLists } = this.state;
    const {
      updateRequiredFields,
      nameValue,
      isRequired,
      isDisabled,
      customBehaviour,
      keyVal,
      onChange,
    } = this.props;
    if (prevState.dropDownValue !== dropDownValue) {
      // handle a unique case where a keyValue is Provided
      if (keyVal !== undefined) {
        onChange(keyVal, { event, name: nameValue, value: dropDownValue });
      }
      if (event !== null) {
        this.handleRequiredValues();
        this.handleValueUpdate(event);
        updateRequiredFields(nameValue, isRequired, isDisabled);
      } // perform any custom dropdown behavior if necessary
      if (customBehaviourLists.find((item) => item === nameValue)) {
        customBehaviour();
      }
    }
  }

  handleValueUpdate = (event) => {
    const { dropDownValue } = this.state;
    const { onChange, nameValue, selectsMultiple } = this.props;
    if (!selectsMultiple) {
      const value = dropDownValue[0] === undefined ? '' : dropDownValue[0];
      onChange(event, { name: nameValue, value });
    }
    if (selectsMultiple) {
      const value = dropDownValue === undefined ? [] : dropDownValue;
      onChange(event, { name: nameValue, value });
    }
  };

  handleErrors = (status) => {
    this.setState({ hasError: status });
  };

  handleRequiredValues = () => {
    const { dropDownValue } = this.state;
    const { isRequired } = this.props;
    if (dropDownValue.length === 0 && isRequired) {
      this.handleErrors(true);
    } else {
      this.handleErrors(false);
    }
  };

  onChange = (e, { value }) => {
    const { selectsMultiple } = this.props;
    e.persist();
    this.setState({ event: e });
    if (!selectsMultiple) {
      const newVal = [];
      if (value !== '') newVal[0] = value;
      this.setState({ dropDownValue: newVal });
    } else {
      this.setState({ dropDownValue: value });
    }
  };

  handleDropDownValue = () => {
    // return a default value if the dropdown is empty
    const { dropDownValue } = this.state;
    if (dropDownValue.length === 0) {
      return '';
    }
    if (dropDownValue.length === 1) {
      return dropDownValue[0];
    }
    return dropDownValue;
  };

  getValue = () => {
    // populate the dropdown with values from the object passed from the parent
    const { selectsMultiple, nameValue, subKeyValue, data } = this.props;
    if (!selectsMultiple) {
      return data
        ? handleGetValue(
            data,
            nameValue,
            subKeyValue,
            this.handleDropDownValue(),
          )
        : this.handleDropDownValue();
    }
    return data ? handleGetValue(data, nameValue, subKeyValue, []) : [];
  };

  render() {
    const {
      placeholder,
      options,
      selectsMultiple,
      isClearable,
      isSelection,
      isSearchable,
      isDisabled,
      label,
      isRequired,
      isReadOnly,
      nameValue,
      onLabelClick,
      loading,
    } = this.props;
    const { hasError } = this.state;
    return (
      <Form.Select
        label={label}
        fluid
        placeholder={placeholder}
        options={options}
        multiple={selectsMultiple}
        clearable={isClearable}
        selection={isSelection}
        search={isSearchable}
        upward={false}
        disabled={isDisabled}
        noResultsMessage="There are no results to display"
        required={isRequired}
        error={hasError}
        onChange={this.onChange}
        name={nameValue}
        value={this.getValue()}
        readOnly={isReadOnly}
        onLabelClick={onLabelClick}
        loading={loading}
      />
    );
  }
}

InputDropDown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.instanceOf(Array).isRequired,
  selectsMultiple: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isSelection: PropTypes.bool,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  nameValue: PropTypes.string,
  subKeyValue: PropTypes.string,
  onChange: PropTypes.func,
  customBehaviour: PropTypes.func,
  data: PropTypes.instanceOf(Object),
  updateRequiredFields: PropTypes.func,
  onLabelClick: PropTypes.func,
  isReadOnly: PropTypes.bool,
  loading: PropTypes.bool,
  keyVal: PropTypes.number,
};

InputDropDown.defaultProps = {
  label: 'label',
  selectsMultiple: false,
  isSearchable: true,
  isSelection: true,
  isClearable: true,
  isDisabled: false,
  isRequired: false,
  isReadOnly: false,
  loading: false,
  nameValue: '',
  subKeyValue: '',
  data: {},
  updateRequiredFields() {},
};

export default InputDropDown;
