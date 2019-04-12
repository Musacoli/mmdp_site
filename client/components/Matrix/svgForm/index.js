import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import FileInput from '../../common/Form/FileInput';

const svgForm = (props) => {
  const { onChange, loading, onFormSubmit, fileName, country, errors } = props;
  return (
    <React.Fragment>
      <Form className="main-content" loading={loading}>
        {!country ? (
          <Form.Input
            name="countryName"
            className="form__text-input"
            fluid={false}
            label="Country Name"
            type="text"
            placeholder="Enter country name"
            onChange={onChange}
          />
        ) : null}
        {!country && errors.countryName ? (
          <Label htmlFor="countryName" basic color="red" pointing>
            {errors.countryName}
          </Label>
        ) : null}
        <Form.Field>
          <FileInput
            name="countrySvgFile"
            label="Upload Country map"
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
    </React.Fragment>
  );
};
export default svgForm;
