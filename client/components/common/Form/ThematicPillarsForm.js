import React from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';
import ActionModal from '../Modal/ActionModal';

const ThematicPillarsForm = ({ item, editADropdown, deleteADropdown }) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    const instance = { ...item };
    instance[name] = value;
    editADropdown(instance);
  };

  return (
    <Form.Group widths="equal">
      <Form.Field>
        <Form.Input
          className="app-search-input animated fadeIn"
          fluid
          label="Thematic Pillar title"
          placeholder="Thematic Pillar title"
          name="pillarTitle"
          value={item.pillarTitle}
          onChange={handleChange}
        />

        {item.errors && item.errors.thematicPillars ? (
          <Label htmlFor={item.pillarTitle} basic color="red" pointing>
            {item.errors.thematicPillars}
          </Label>
        ) : (
          <React.Fragment />
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
          confirmDeleteGroup={deleteADropdown}
          group={item}
          header="Delete a status"
          content="Confirm delete status"
          triggerText={<Icon name="trash alternate outline" size="large" />}
        />
      </div>
    </Form.Group>
  );
};

export default ThematicPillarsForm;
