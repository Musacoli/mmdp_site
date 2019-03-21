import React from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';
import ActionModal from '../Modal/ActionModal';

const RegistrationStatusForm = ({ item, editAStatus, deleteAStatus }) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    const instance = { ...item };
    instance[name] = value;
    editAStatus(instance);
  };

  return (
    <Form.Group widths="equal">
      <Form.Field>
        <Form.Input
          className="app-search-input animated fadeIn"
          fluid
          label="Registration Status"
          placeholder="Registration Status"
          name="registrationStatus"
          value={item.registrationStatus}
          onChange={handleChange}
        />

        {item.errors && item.errors.stateName && (
          <Label htmlFor={item.registrationStatus} basic color="red" pointing>
            {item.errors.registrationStatus}
          </Label>
        )}
      </Form.Field>
      <Form.Input
        fluid
        label="Description"
        className="animated fadeIn"
        placeholder="Description"
        onChange={handleChange}
        value={item.description}
        name="description"
      />
      <div className="stateDropdown__actions two-fields">
        <ActionModal
          confirmDeleteGroup={deleteAStatus}
          group={item}
          header="Delete a status"
          content="Confirm delete status"
          triggerText={<Icon name="trash alternate outline" size="large" />}
        />
      </div>
    </Form.Group>
  );
};

export default RegistrationStatusForm;
