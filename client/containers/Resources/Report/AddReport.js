/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validate from 'validate.js';
import ReportForm from '../../../components/Resources/Report/ReportForm';
import { addReport } from '../../../store/actions/resources/report';
import { addReportConstraint } from '../../../utils/constraints/report';

export class AddReport extends Component {
  state = {
    title: '',
    reportFile: {},
    reportType: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { submitReport } = this.props;
    const formData = new FormData();
    const formDetails = this.state;
    const errors = validate(formDetails, addReportConstraint);
    if (errors) {
      this.setState({
        errors,
      });
    } else {
      Object.keys(formDetails).forEach((field) => {
        formData.append(field, formDetails[field]);
      });
      submitReport(formData);
    }
  }

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
  }

  render() {
    const { reportType, reportFile, errors } = this.state;
    const { response, loading, history } = this.props;
    if (response && response.status === 201) {
      history.push('/resources/report/list');
    }
    return (
      <ReportForm
        loading={loading}
        reportType={reportType}
        reportFileName={reportFile.name || ''}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        errors={errors}
      />
    );
  }
}

AddReport.propTypes = {
  submitReport: PropTypes.func.isRequired,
  response: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  response: state.report.response,
  loading: state.report.loading,
});

const mapDispatchToProps = {
  submitReport: addReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReport);
