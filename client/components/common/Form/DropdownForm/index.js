import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ActionModal from '../../Modal/ActionModal';
import Input from './Input';
import SelectInput from './Select';

const DropdownForm = ({ item, editAState, deleteAState, inputs }) => {
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
      {inputs.map((attributes) => {
        return (
          <React.Fragment key={attributes.name}>
            {attributes.type === 'text' && (
              <Input
                dropdownItem={item}
                attributes={attributes}
                handleChange={handleChange}
              />
            )}{' '}
            {attributes.type === 'select' && (
              <SelectInput
                dropdownItem={item}
                attributes={attributes}
                handleSelectChange={handleSelectChange}
              />
            )}
          </React.Fragment>
        );
      })}

      <div className="dropdowns__actions">
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

DropdownForm.propTyes = {
  inputs: PropTypes.arrayOf(PropTypes.object),
};

DropdownForm.defaultProps = {
  inputs: [],
};
export default DropdownForm;
