import React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ActionModal from '../../Modal/ActionModal';
import Input from './Input';
import SelectInput from './Select';

const DropdownForm = ({
  header,
  label,
  item,
  editAState,
  deleteAState,
  inputs,
  className,
}) => {
  const handleChange = (e) => {
    const { value, name } = e.target;
    const instance = { ...item };
    instance[name] = value;
    editAState(instance);
  };

  const handleSelectChange = (event, { value, name }) => {
    const instance = { ...item };
    instance[name] = value;
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

      <div className={`dropdowns__actions ${className}`}>
        <ActionModal
          confirmDeleteGroup={deleteAState}
          group={item}
          header={header}
          content={label}
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
