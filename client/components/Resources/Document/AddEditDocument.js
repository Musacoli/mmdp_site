import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import FileInput from '../../common/Form/FileInput';

const AddEditDocument = ({
  reportFileName,
  onChange,
  onSubmit,
  loading,
  errors,
  title,
  mediaLabel,
  disabled,
}) => (
  <Form loading={loading} onSubmit={onSubmit}>
    <Form.Group widths={mediaLabel === 'document' ? 'equal' : '16'}>
      <Form.Field error={!!errors.reportFile}>
        <FileInput
          name="document"
          label={`Upload ${mediaLabel}`}
          placeholder="Select a file"
          value={reportFileName}
          className="test"
          id="reportFile"
          onChange={onChange}
        />
      </Form.Field>
      {mediaLabel === 'document' && (
        <Form.Input
          name="title"
          className="form__text-input"
          fluid={false}
          label="Document title"
          type="text"
          value={title}
          placeholder="Research carried out last year"
          onChange={onChange}
          error={!!errors.title}
        />
      )}
    </Form.Group>
    <Form.Field>
      <Button
        type="submit"
        className={
          disabled
            ? 'upload-document bg-cool-blue disable-btn-area'
            : 'upload-document bg-cool-blue'
        }
        disabled={disabled}
      >
        Add {mediaLabel}
      </Button>
    </Form.Field>
  </Form>
);

AddEditDocument.defaultProps = {
  errors: {},
};

AddEditDocument.propTypes = {
  errors: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reportFileName: PropTypes.string.isRequired,
  title: PropTypes.string,
  mediaLabel: PropTypes.string,
};

AddEditDocument.defaultProps = {
  title: '',
  mediaLabel: 'document',
};

export default AddEditDocument;
