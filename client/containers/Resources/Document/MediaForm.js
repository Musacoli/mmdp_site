/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';
import AddEditDocument from '../../../components/Resources/Document/AddEditDocument';
import {
  addDocument,
  editDocument,
  addDocumentFailure,
} from '../../../store/actions/resources/document';
import documentFormConstraint from '../../../utils/constraints/report';
import { validateFields } from '../../../utils/validations';

export class MediaForm extends Component {
  static propTypes = {
    submitDocument: PropTypes.func.isRequired,
    response: PropTypes.shape({}),
    history: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    match: PropTypes.shape({}).isRequired,
    singleDocument: PropTypes.shape({}).isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    document: {},
    mediaType: 'file',
    id: '',
    errors: {},
  };

  componentWillUnmount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidUpdate = () => {
    const { singleDocument, success, history } = this.props;
    const { title } = this.state;

    if (title === '' && singleDocument.title) {
      this.setState({
        title: singleDocument.title,
        document: singleDocument.document,
      });
    }
    if (success) {
      setTimeout(() => {
        history.push('/resources/media');
      }, 4000);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitDocument } = this.props;
    const { mediaType } = this.state;
    const formData = new FormData();
    const formDetails = this.state;
    formDetails.mediaFile = formDetails.document;
    delete documentFormConstraint.reportType;
    const addDocumentConstraint = {
      ...documentFormConstraint,
      document: documentFormConstraint.reportFile,
    };
    delete addDocumentConstraint.reportFile;
    delete addDocumentConstraint.title;
    if (formDetails.mediaFile.url) delete addDocumentConstraint.mediaFile;
    const errors = validate(formDetails, addDocumentConstraint);
    if (errors) {
      this.setState({
        errors,
      });
    } else {
      Object.keys(formDetails).forEach((field) => {
        formData.append(field, formDetails[field]);
      });
      submitDocument({ data: formData, mediaType });
    }
  };

  handleChange = (event) => {
    let value;
    if (event.target.files) {
      [value] = event.target.files;
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
    const { document, errors, title, mediaType } = this.state;
    const { loading } = this.props;
    return (
      <AddEditDocument
        loading={loading}
        title={title}
        reportFileName={document.name || ''}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        errors={errors}
        mediaLabel={mediaType}
        disabled={validateFields({
          ReportFileName: document.name ? document.name : '',
        })}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.documents.response,
  loading: state.documents.loading,
  singleDocument: state.documents.document,
  success: state.documents.success,
});

const mapDispatchToProps = {
  submitDocument: addDocument,
  updateDocument: editDocument,
  clearErrors: addDocumentFailure,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaForm);
