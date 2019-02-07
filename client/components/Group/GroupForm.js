import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react';
import Select from 'react-select';
import './styles.sass';

const GroupForm = ({
  options,
  name,
  selectedOption,
  handleSelectChange,
  handleInputChange,
  busy,
  handleSubmit,
  errors,
  serverError,
  success,
}) => (
  <div>
    {serverError && (
      <Message warning>
        <Message.Header>{serverError}</Message.Header>
      </Message>
    )}
    {success && (
      <Message success>
        <Message.Header>Group Submitted successfully</Message.Header>
      </Message>
    )}

    <Form loading={busy}>
      <Form.Field>
        <label htmlFor="name">Group Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Group Name"
        />
        {errors.name && (
          <div className="ui pointing red basic label">{errors.name}</div>
        )}
      </Form.Field>
      <Form.Field>
        <label htmlFor="selectedOption">Select Permissions</label>
        <Select
          id="selectedOption"
          placeholder="Select Permissions"
          value={selectedOption}
          onChange={handleSelectChange}
          options={options}
          isMulti
        />
      </Form.Field>
      <Button
        onClick={handleSubmit}
        className="primary borderless color-blue"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  </div>
);

GroupForm.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedOption: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  errors: PropTypes.shape({}).isRequired,
  serverError: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  busy: PropTypes.bool.isRequired,
};
export default GroupForm;
