import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import FileInput from '../../common/Form/FileInput';

const ResearchForm = ({ fileName, onChange, onSubmit, loading }) => (
  <Form onSubmit={onSubmit} loading={loading} className="main-content">
    <Form.Group widths="equal">
      <Form.Field>
        <FileInput
          name="researchFile"
          label="Upload file"
          placeholder="Select a file"
          value={fileName || ''}
          className="test"
          id="researchFile"
          onChange={onChange}
        />
      </Form.Field>
      <Form.Input
        name="title"
        className="form__text-input"
        fluid
        label="Research title"
        type="text"
        placeholder="Research carried out last year"
        onChange={onChange}
      />
    </Form.Group>
    <Form.Button type="submit" className="btn__upload u-margin-top-medium">
      Upload Research
    </Form.Button>
  </Form>
);

ResearchForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default ResearchForm;
