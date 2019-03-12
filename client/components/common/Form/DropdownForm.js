import React from 'react';
import { Form, Icon, Label } from 'semantic-ui-react';
import ActionModal from '../Modal/ActionModal';

const StateForm = ({ countries, item, editAState, deleteAState }) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    const instance = { ...item };
    instance[name] = value;
    editAState(instance);
  };

  const handleSelectChange = (event, { value }) => {
    const instance = { ...item };
    instance.countryId = value;
    editAState(instance);
  };
  return (
    <Form.Group widths="equal">
      <Form.Field>
        <Form.Input
          className="app-search-input animated fadeIn"
          fluid
          label="State name"
          placeholder="State name"
          name="stateName"
          value={item.stateName}
          onChange={handleChange}
        />

        {item.errors && item.errors.stateName && (
          <Label htmlFor={item.stateName} basic color="red" pointing>
            {item.errors.stateName}
          </Label>
        )}
      </Form.Field>
      {countries && (
        <Form.Field>
          <Form.Select
            fluid
            label="Country"
            options={countries}
            placeholder="Country"
            name="countryId"
            onChange={handleSelectChange}
            value={item.countryId}
          />
          {item.errors && item.errors.countryId && (
            <Label htmlFor={item.countryId} basic color="red" pointing>
              {item.errors.countryId}
            </Label>
          )}
        </Form.Field>
      )}
      <Form.Input
        fluid
        label="Description"
        className="animated fadeIn"
        placeholder="Description"
        onChange={handleChange}
        value={item.description}
        name="description"
      />
      <div className="stateDropdown__actions">
        <ActionModal
          confirmDeleteGroup={deleteAState}
          group={item}
          header="Delete a state"
          content="Confirm delete state"
          triggerText={<Icon name="trash alternate outline" size="large" />}
        />
      </div>
    </Form.Group>
  );
};

export default StateForm;
