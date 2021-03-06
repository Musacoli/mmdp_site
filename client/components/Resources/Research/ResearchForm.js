import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import FileInput from '../../common/Form/FileInput';

const ResearchForm = ({
  fileName,
  onChange,
  onSubmit,
  loading,
  title,
  disabled,
}) => (
  <Form onSubmit={onSubmit} loading={loading} id="research-main-content">
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
        defaultValue={title || ''}
        placeholder="Research carried out last year"
        onChange={onChange}
        required
      />
    </Form.Group>
    <Form.Button
      type="submit"
      id="research__upload__btn"
      disabled={disabled}
      className={disabled ? 'btn__upload disable-btn-area' : 'btn__upload'}
    >
      Upload Research
    </Form.Button>
  </Form>
);

ResearchForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ResearchForm;
