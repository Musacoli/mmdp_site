import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class DropDownOption extends Component {
  state = {
    id: '',
  };

  componentDidMount() {
    const { optionId } = this.props;
    optionId ? this.setState({ id: optionId }) : '';
  }

  onChange = (e) => {
    const { addInputData } = this.props;
    const item = { [e.target.name]: e.target.value };
    this.setState(item);
    addInputData(this.state);
  };

  addInputData = () => {
    const { addInputData } = this.props;
    addInputData(this.state);
  };

  render() {
    const {
      options,
      fieldName,
      fieldValue,
      fieldLabel,
      description,
      placeholderText,
    } = this.props;

    return (
      <Form.Group widths="equal">
        <Form.Field>
          <Form.Input
            name={fieldName}
            className="form__text-input"
            fluid
            label={fieldLabel}
            type="text"
            defaultValue={fieldValue || ''}
            placeholder={placeholderText}
            onChange={this.onChange}
            required
          />
        </Form.Field>
        {options ? <Form.Select options={options} /> : ''}
        <Form.Input
          name="description"
          className="form__text-input"
          fluid
          label="Description"
          type="text"
          defaultValue={description || ''}
          placeholder="Description of option"
          onChange={this.onChange}
          required
        />
      </Form.Group>
    );
  }
}

DropDownOption.propTypes = {
  // onChange: PropTypes.func.isRequired,
  // description: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  // fieldValue: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  addInputData: PropTypes.func,
};

export default DropDownOption;
