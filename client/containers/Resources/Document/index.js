/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';
import DocumentForm from '../../../components/Resources/Document/DocumentForm';
import {
  addDocument,
  fetchDocument,
  editDocument,
} from '../../../store/actions/resources/document';
import { addReportConstraint } from '../../../utils/constraints/report';

export class AddDocument extends Component {
  static propTypes = {
    submitDocument: PropTypes.func.isRequired,
    response: PropTypes.shape({}),
    history: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.shape({}).isRequired,
    singleDocument: PropTypes.shape({}).isRequired,
    getDocument: PropTypes.func.isRequired,
    updateDocument: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    document: {},
    mediaType: 'document',
    id: '',
    errors: {},
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

  componentDidUpdate = () => {
    const { singleDocument } = this.props;
    const { title } = this.state;

    if (title === '' && singleDocument.title) {
      this.setState({
        title: singleDocument.title,
        document: singleDocument.document,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitDocument, updateDocument } = this.props;
    const formData = new FormData();
    const formDetails = this.state;
    delete addReportConstraint.reportType;
    const addDocumentConstraint = {
      ...addReportConstraint,
      document: addReportConstraint.reportFile,
    };
    delete addDocumentConstraint.reportFile;
    if (formDetails.document.url) delete addDocumentConstraint.document;
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
    const { reportType, document, errors, title } = this.state;
    const { response, loading, history } = this.props;
    if (response && response.status === 201) {
      history.push('/resources/documents/list');
    }
    return (
      <DocumentForm
        loading={loading}
        reportType={reportType}
        title={title}
        reportFileName={document.name || ''}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        errors={errors}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.documents.response,
  loading: state.documents.loading,
  singleDocument: state.documents.document,
});

const mapDispatchToProps = {
  submitDocument: addDocument,
  getDocument: fetchDocument,
  updateDocument: editDocument,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDocument);
