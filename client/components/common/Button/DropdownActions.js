import React from 'react';
import { Form } from 'semantic-ui-react';

function DropdownActions({ addDropdown, handleSubmit }) {
  return (
    <Form.Group>
      <Form.Button className="dropdowns__add" onClick={() => addDropdown()}>
        Add more options
      </Form.Button>
      <Form.Button
        className="dropdowns__save bg-transparent"
        onClick={handleSubmit}
      >
        Save dropdown
      </Form.Button>
    </Form.Group>
  );
}

export default DropdownActions;
