/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';
import AddEditDocument from '../../../components/Resources/Document/AddEditDocument';
import documentFormConstraint from '../../../utils/constraints/document';
import {
  addDocument,
  fetchDocument,
  editDocument,
  addDocumentFailure,
} from '../../../store/actions/resources/document';
import { validateFields } from '../../../utils/validations';

export class AddDocument extends Component {
  static propTypes = {
    submitDocument: PropTypes.func.isRequired,
    response: PropTypes.shape({}),
    history: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    match: PropTypes.shape({}).isRequired,
    singleDocument: PropTypes.shape({}).isRequired,
    getDocument: PropTypes.func.isRequired,
    updateDocument: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    document: {},
    mediaType: 'document',
    id: '',
    errors: {},
    isEditing: false,
  };

  componentDidMount() {
    const {
      match: { params },
      getDocument,
    } = this.props;
    if (params.id) {
      const id = { id: params.id };
      this.setState({ id });
      getDocument(id);
    }
  }

  componentWillUnmount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  componentDidUpdate = () => {
    const { singleDocument, success, history } = this.props;
    const { title, isEditing } = this.state;

    if (title === '' && singleDocument.title && !isEditing) {
      const document = singleDocument.document
        ? singleDocument.document
        : { name: '', filename: 'none' };
      this.setState({
        title: singleDocument.title,
        document,
        isEditing: true,
      });
    }
    if (success) {
      setTimeout(() => {
        history.push('/resources/documents');
      }, 4000);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitDocument, updateDocument } = this.props;
    const formData = new FormData();
    const formDetails = { ...this.state };
    delete documentFormConstraint.reportType;
    const addDocumentConstraint = {
      ...documentFormConstraint,
      document: documentFormConstraint.reportFile,
    };
    delete addDocumentConstraint.reportFile;
    if (formDetails.document.url) {
      delete addDocumentConstraint.document;
      delete formDetails.document;
    }
    const errors = validate(formDetails, addDocumentConstraint);
    if (errors) {
      this.setState({
        errors,
      });
    } else {
      Object.keys(formDetails).forEach((field) => {
        formData.append(field, formDetails[field]);
      });
      if (formDetails.id) {
        updateDocument({ data: formData, id: formDetails.id });
        return true;
      }
      submitDocument({ data: formData });
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
    const { reportType, document, errors, title } = this.state;
    const { loading } = this.props;
    return (
      <AddEditDocument
        loading={loading}
        reportType={reportType}
        title={title}
        reportFileName={document.name || ''}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        errors={errors}
        disabled={validateFields({
          title,
          document: document.name || '',
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
  getDocument: fetchDocument,
  updateDocument: editDocument,
  clearErrors: addDocumentFailure,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDocument);
