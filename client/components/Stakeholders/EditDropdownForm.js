import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import DropDownOption from '../common/Inputs/DropDownOption';

export class EditDropdownForm extends Component {
  state = {
    inputFields: [],
    optionsData: [],
    newOptionsData: [],
  };

  componentWillReceiveProps(props, context) {
    const { optionsData, addInputData } = props;
    optionsData ? this.loadFields(optionsData, addInputData) : '';
  }

  loadFields = (data, addInputData) => {
    this.state.inputFields = data.map((option) => {
      return (
        <DropDownOption
          key={option._id}
          optionId={option._id}
          placeholderText="Staff Strength staffStrength"
          fieldValue={option.staffStrength}
          fieldName="staffStrength"
          fieldLabel="Staff Strength"
          description={option.description}
          addInputData={addInputData}
        />
      );
    });
  };

  addField = () => {
    const { inputFields, addInputData } = this.state;
    const field = (
      <DropDownOption
        placeholderText="Staff Strength staffStrength"
        fieldValue=""
        fieldName="staffStrength"
        fieldLabel="Staff Strength"
        description=""
        addInputData={addInputData}
      />
    );
    this.setState({
      inputFields: [...inputFields, field],
    });
  };

  render() {
    const { onSubmit } = this.props;
    const { inputFields, addInputData } = this.state;

    return (
      <Form onSubmit={onSubmit} id="dropdown-edit-content">
        {inputFields.length > 0 ? (
          inputFields
        ) : (
          <DropDownOption
            placeholderText="Staff Strength staffStrength"
            fieldValue=""
            fieldName="staffStrength"
            fieldLabel="Staff Strength"
            description=""
            addInputData={addInputData}
          />
        )}
        <Form.Group className="options__group">
          <Form.Button
            className="btn__add__options"
            id="dropdown__add__btn"
            onClick={this.addField}
          >
            Add more options
          </Form.Button>
          <Form.Button type="submit" className="btn__upload" id="dropdown__btn">
            Save Dropdown
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

EditDropdownForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // addField: PropTypes.func.isRequired,
  // inputFields: PropTypes.arrayOf(PropTypes.shape({})),
};

export default EditDropdownForm;
