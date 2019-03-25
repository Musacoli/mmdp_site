import React from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';
import ActionModal from '../Modal/ActionModal';

const StaffStrengthForm = ({
  item,
  editAStaffStrength,
  deleteAStaffStrength,
}) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    const instance = { ...item };
    instance[name] = value;
    editAStaffStrength(instance);
  };

  return (
    <Form.Group widths="equal">
      <Form.Field>
        <Form.Input
          className="app-search-input animated fadeIn"
          fluid
          label="Staff Strength"
          placeholder="Staff Strength"
          name="staffStrength"
          value={item.staffStrength}
          onChange={handleChange}
        />

        {item.errors && item.errors.stateName && (
          <Label htmlFor={item.staffStrength} basic color="red" pointing>
            {item.errors.staffStrength}
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
          confirmDeleteGroup={deleteAStaffStrength}
          group={item}
          header="Delete a Range"
          content="Confirm delete Range"
          triggerText={<Icon name="trash alternate outline" size="large" />}
        />
      </div>
    </Form.Group>
  );
};

export default StaffStrengthForm;
