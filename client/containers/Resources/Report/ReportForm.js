import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';
import ReportFormView from '../../../components/Resources/Report/ReportForm';
import {
  addReport,
  editReport,
  fetchReport,
} from '../../../store/actions/resources/report';
import reportFormConstraint from '../../../utils/constraints/report';
import { validateFields } from '../../../utils/validations';

export class ReportForm extends Component {
  state = {
    title: '',
    reportFile: {},
    reportType: '',
    loading: true,
  };

  componentDidMount() {
    const { mode, match, getReport } = this.props;
    if (mode === 'edit') {
      const { id } = match.params;
      getReport(id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { loading } = prevState;
    const { report } = nextProps.response;
    if (nextProps.loading !== loading && nextProps.mode === 'edit' && report) {
      const { title, reportFile, reportType } = report;
      return {
        title,
        reportFile,
        reportType,
        loading: nextProps.loading,
      };
    }
    return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { mode = 'add', createReport, updateReport, match } = this.props;
    const formDetails = this.state;
    const errors = validate(formDetails, reportFormConstraint);
    if (errors) {
      return this.setState({
        errors,
      });
    }
    // if reportFile still contains a s3 bucket url, it was not edited and there is no need to update
    if (formDetails.reportFile.url) delete formDetails.reportFile;
    const formData = new FormData();
    Object.keys(formDetails).forEach((field) => {
      formData.append(field, formDetails[field]);
    });
    if (mode === 'edit') {
      const { id } = match.params;
      updateReport({ id, formData, mode });
    } else {
      createReport({ formData, mode });
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
    const { title, reportType, reportFile, errors } = this.state;
    const { response, loading } = this.props;
    const reportFileName = reportFile.name || reportFile.filename;
    return (
      <>
        {response && response.statusCode === 201 ? (
          <Redirect to="/resources/reports" />
        ) : (
          <ReportFormView
            loading={loading}
            title={title || ''}
            reportType={reportType}
            reportFileName={reportFileName || ''}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            errors={errors}
            disabled={validateFields({
              title,
              report: reportFile.name === undefined ? '' : reportFile.name,
              reportType,
            })}
          />
        )}
      </>
    );
  }
}

ReportForm.propTypes = {
  createReport: PropTypes.func.isRequired,
  updateReport: PropTypes.func.isRequired,
  getReport: PropTypes.func.isRequired,
  response: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.shape({}),
  mode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  response: state.report.response,
  loading: state.report.loading,
});

const mapDispatchToProps = {
  createReport: addReport,
  updateReport: editReport,
  getReport: fetchReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportForm);
