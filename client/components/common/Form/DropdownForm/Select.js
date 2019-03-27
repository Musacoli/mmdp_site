import React from 'react';
import { Form, Label } from 'semantic-ui-react';

/**
 * This component renders a dropdown input field of type select
 * @param {!Object} props component props
 *  Props shape: {
 *    handleChange: [function] called when a change event is triggered
 *    attributes: [Object] input form attributes e.g {value: 2, label: username}
 *    dropdownItem: [Object] an instance of a dropdown
 * }
 */
export const SelectInput = ({
  handleSelectChange,
  attributes,
  dropdownItem,
}) => {
  return (
    <Form.Field>
      <Form.Select {...attributes} onChange={handleSelectChange} />
      {dropdownItem.errors && dropdownItem.errors[attributes.name] && (
        <Label
          htmlFor={dropdownItem[attributes.name]}
          basic
          color="red"
          pointing
        >
          {dropdownItem.errors[attributes.name]}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
