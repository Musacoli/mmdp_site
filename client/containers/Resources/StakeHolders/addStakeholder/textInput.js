import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { YearInput } from 'semantic-ui-calendar-react';
import { handleGetValue } from '../../../../utils/resources/stakeholderDirectory/Stakeholders';

class TextInput extends Component {
  state = {
    isError: false,
    value: '',
    isDisabled: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { data, nameValue, subKeyValue, isDisabled } = props;
    const newValue = data
      ? handleGetValue(data, nameValue, subKeyValue, '')
      : '';
    if (newValue !== state.value) {
      return { value: newValue };
    }
    return { isDisabled };
  }

  handleErrors = (status) => {
    this.setState({ isError: status });
  };

  resetFieldValue = () => {
    const { onChange, nameValue } = this.props;
    // create an event
    const evt = new Event('input', { bubbles: true });
    // trigger on change event
    onChange(evt, { name: nameValue, value: '' });
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
    const { value, isDisabled } = this.state;
    const { updateRequiredFields, nameValue, isRequired } = this.props;
    if (prevState.value !== value) {
      // handle validation
      this.handleValidation();
      // handle required fields
      updateRequiredFields(nameValue, isRequired, isDisabled);
    }
    if (prevState.isDisabled === false && isDisabled) {
      this.resetFieldValue();
    }
  }

  ValidEmail = (email) =>
    email.length < 256 && /^[^@]+@[^@]{2,}\.[^@]{2,}$/.test(email);

  handleEmailValidation = () => {
    const { type } = this.props;
    const { value } = this.state;
    if (type === 'email' && value !== '') {
      const isValid = this.ValidEmail(value);
      if (isValid) {
        this.handleErrors(false);
      } else {
        this.handleErrors(true);
      }
    }
  };

  handleRequiredValues = () => {
    const { value } = this.state;
    const { isRequired } = this.props;
    if (value === '' && isRequired) {
      this.handleErrors(true);
    } else {
      this.handleErrors(false);
    }
  };

  handleValidation = () => {
    this.handleRequiredValues();
    this.handleEmailValidation();
  };

  handleChange = (event, { name, value }) => {
    const { onChange, keyVal } = this.props;
    event.persist();
    if (keyVal !== undefined) {
      // handle a case here a keVal is provided .USe a custom function instead
      onChange(keyVal, { event, name, value });
    } else {
      onChange(event, {
        name,
        value,
      });
    }
  };

  render() {
    const {
      label,
      placeholder,
      isRequired,
      nameValue,
      isDisabled,
      isReadOnly,
      isTextArea,
      isYearInput,
      propsValue,
      type,
    } = this.props;
    const { isError, value } = this.state;
    const fieldProps = {
      name: nameValue,
      label,
      placeholder,
      error: isError,
      required: isRequired,
      onChange: this.handleChange,
      value: propsValue || value,
      disabled: isDisabled,
      readOnly: isReadOnly,
      type: type === 'email' ? 'text' : type,
    };
    // eslint-disable-next-line no-nested-ternary
    return isTextArea ? (
      <Form.TextArea {...fieldProps} />
    ) : isYearInput ? (
      <YearInput
        {...fieldProps}
        closable
        clearable
        localization="en"
        dateFormat="YYYY"
        icon="calendar alternate"
        iconPosition="right"
        maxDate={String(new Date().getFullYear())}
      />
    ) : (
      <Form.Input {...fieldProps} />
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isTextArea: PropTypes.bool,
  isYearInput: PropTypes.bool,
  nameValue: PropTypes.string,
  propsValue: PropTypes.string,
  onChange: PropTypes.func,
  updateRequiredFields: PropTypes.func,
  keyVal: PropTypes.number,
};

TextInput.defaultProps = {
  type: 'text',
  isRequired: false,
  isDisabled: false,
  isReadOnly: false,
  isTextArea: false,
  isYearInput: false,
  updateRequiredFields() {},
};

export default TextInput;
