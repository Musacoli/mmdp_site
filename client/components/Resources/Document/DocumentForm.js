import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import FileInput from '../../common/Form/FileInput';

const DocumentForm = ({
  reportFileName,
  onChange,
  onSubmit,
  loading,
  errors,
}) => (
  <Form loading={loading} onSubmit={onSubmit}>
    <Form.Group widths="equal">
      <Form.Field error={!!errors.reportFile}>
        <FileInput
          name="document"
          label="Upload file"
          placeholder="Select a file"
          value={reportFileName}
          className="test"
          id="reportFile"
          onChange={onChange}
        />
      </Form.Field>
      <Form.Input
        name="title"
        className="form__text-input"
        fluid
        label="Report title"
        type="text"
        placeholder="Research carried out last year"
        onChange={onChange}
        error={!!errors.title}
      />
    </Form.Group>
    <Form.Field>
      <Button
        type="submit"
        className="common-button upload-document bg-cool-blue"
      >
        Upload Document
      </Button>
    </Form.Field>
  </Form>
);

DocumentForm.defaultProps = {
  errors: {},
};

DocumentForm.propTypes = {
  errors: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reportFileName: PropTypes.string.isRequired,
};

export default DocumentForm;
