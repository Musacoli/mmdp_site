import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import MapListing from '../../common/MapListing';
import FileInput from '../../common/Form/FileInput';

const LGA = (props) => {
  const {
    onChange,
    Maps,
    loading,
    onFormSubmit,
    fileName,
    onUpdate,
    headers,
    label,
    btnName,
    errors,
  } = props;
  return (
    <React.Fragment>
      <Form className="main-content" loading={loading}>
        <Form.Field>
          <FileInput
            name="StateSVGFile"
            label="Upload State map"
            placeholder="Select svg file"
            value={fileName || ''}
            onChange={onChange}
          />
        </Form.Field>
        {errors.fileName ? (
          <Label htmlFor="countrySvgFile" basic color="red" pointing>
            {errors.fileName}
          </Label>
        ) : null}
        <Form.Button
          type="submit"
          className="btn__upload u-margin-top-medium"
          onClick={() => onFormSubmit()}
        >
          Upload File
        </Form.Button>
      </Form>
      <MapListing
        Maps={Maps}
        onUpdate={onUpdate}
        headers={headers}
        label={label}
        btnName={btnName}
      />
    </React.Fragment>
  );
};
export default LGA;
