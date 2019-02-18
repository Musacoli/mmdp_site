/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';
import DocumentForm from '../../../components/Resources/Document/DocumentForm';
import { addDocument } from '../../../store/actions/resources/document';
import documentFormConstraint from '../../../utils/constraints/document';

export class AddDocument extends Component {
  state = {
    title: '',
    document: {},
    mediaType: 'document',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitDocument } = this.props;
    const formData = new FormData();
    const formDetails = this.state;
    delete documentFormConstraint.reportType;
    const addDocumentConstraint = {
      ...documentFormConstraint,
      document: documentFormConstraint.reportFile,
    };
    delete addDocumentConstraint.reportFile;
    const errors = validate(formDetails, addDocumentConstraint);
    if (errors) {
      this.setState({
        errors,
      });
    } else {
      Object.keys(formDetails).forEach((field) => {
        formData.append(field, formDetails[field]);
      });
      submitDocument(formData);
    }
  };

  handleChange = (event) => {
    let value;
    if (event.target.files) {
      [value] = event.target.files;
    } else {
      ({ value } = event.target);
    }
    const { errors: currentErrors } = this.state;
    const errors = Object.assign({}, currentErrors);
    const field = event.target.name;
    if (errors && errors[field]) {
      delete errors[field];
    }
    this.setState({
      [event.target.name]: value,
      errors,
    });
  };

  render() {
    const { reportType, document, errors } = this.state;
    const { response, loading, history } = this.props;
    if (response && response.status === 201) {
      history.push('/resources/documents/list');
    }
    return (
      <DocumentForm
        loading={loading}
        reportType={reportType}
        reportFileName={document.name || ''}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        errors={errors}
      />
    );
  }
}

AddDocument.propTypes = {
  submitDocument: PropTypes.func.isRequired,
  response: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  response: state.documents.response,
  loading: state.documents.loading,
});

const mapDispatchToProps = {
  submitDocument: addDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDocument);
