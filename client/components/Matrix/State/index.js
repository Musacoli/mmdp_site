import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import FileInput from '../../common/Form/FileInput';

const StateSVGForm = ({ fileName, onChange }) => (
  <Form className="main-content">
    <Form.Field>
      <FileInput
        name="stateSVGFile"
        label="Upload State map"
        placeholder="Select svg file"
        value={fileName || ''}
        className="test"
        id="stateSVGFile"
        onChange={onChange}
      />
    </Form.Field>
    <Form.Button type="submit" className="btn__upload u-margin-top-medium">
      Upload File
    </Form.Button>
  </Form>
);

StateSVGForm.propTypes = {
  //   loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  //   onSubmit: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default StateSVGForm;
