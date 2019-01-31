import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResearchView from '../../components/Resources/Research/ResearchView';
import { addResearch } from '../../store/actions/resources/research';

export class Research extends Component {
  state = {
    title: '',
    reportFile: '',
    fileName: '',
  };

  onChange = (e) => {
    if (e.target.name === 'reportFile' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        fileName: file.name || '',
        reportFile: file,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const details = this.state;
    const { addResearch: addResearchAction } = this.props;
    const formData = new FormData();
    Object.keys(details).forEach((key) => {
      formData.append(key, details[key]);
    });
    addResearchAction(formData);
  };

  render() {
    // console.log(this.state);
    const { fileName } = this.state;
    return (
      <ResearchView onChange={this.onChange} onSubmit={this.onFormSubmit} fileName={fileName} />
    );
  }
}

Research.propTypes = { addResearch: PropTypes.func.isRequired };

const mapStateToProps = state => ({
  Research: state.response,
});

const mapDispatchToProps = {
  addResearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Research);
