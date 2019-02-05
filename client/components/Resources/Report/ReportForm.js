import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import Radio from '../../common/Form/RadioButton';
import FileInput from '../../common/Form/FileInput';

const ReportForm = ({
  reportFileName,
  reportType,
  onChange,
  onSubmit,
  loading,
  errors,
}) => (
  <Form loading={loading} onSubmit={onSubmit}>
    <Form.Group widths="equal">
      <Form.Field error={!!errors.reportFile}>
        <FileInput
          name="reportFile"
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
    <Form.Group className="u-margin-top-medium" inline>
      <Form.Field error={!!errors.reportType}>
        <Radio
          name="reportType"
          label="Quarterly report"
          value="quarterly"
          onChange={onChange}
          className="u-margin-right-medium"
          checked={reportType === 'quarterly'}
        />
      </Form.Field>
      <Form.Field error={!!errors.reportType}>
        <Radio
          name="reportType"
          label="Annual report"
          value="annual"
          onChange={onChange}
          checked={reportType === 'annual'}
        />
      </Form.Field>
    </Form.Group>
    <Form.Button type="submit" className="btn__upload u-margin-top-medium">Upload Report</Form.Button>
  </Form>
);

ReportForm.defaultProps = {
  errors: {},
  reportType: 'quarterly',
};

ReportForm.propTypes = {
  errors: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
  reportType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reportFileName: PropTypes.string.isRequired,
};

export default ReportForm;
