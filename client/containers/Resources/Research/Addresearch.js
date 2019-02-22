import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResearchForm from '../../../components/Resources/Research/ResearchForm';
import { addResearch } from '../../../store/actions/resources/research';

export class AddResearch extends Component {
  state = {
    title: '',
    researchFile: '',
    fileName: '',
  };

  onChange = (e) => {
    if (e.target.name === 'researchFile' && e.target.files.length) {
      const file = e.target.files[0];
      this.setState({
        fileName: file.name || '',
        researchFile: file,
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
    const { fileName } = this.state;
    const { loading, history, research } = this.props;
    const { payload } = research;
    if (payload && payload.status === 'success') {
      history.push('/resources/research/all');
    }

    return (
      <div>
        <ResearchForm
          onChange={this.onChange}
          onSubmit={this.onFormSubmit}
          fileName={fileName}
          loading={loading}
        />
      </div>
    );
  }
}

AddResearch.propTypes = {
  addResearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  research: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
  loading: state.research.loading,
});

const mapDispatchToProps = {
  addResearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddResearch);