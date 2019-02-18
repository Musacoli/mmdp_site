import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResearchForm from '../../../components/Resources/Research/ResearchForm';
import EmptyView from '../../../components/common/InvalidPage';
import {
  getResearchRequest,
  updateInputData,
  updateResearchRequest,
} from '../../../store/actions/resources/research';

export class EditResearch extends Component {
  componentWillMount() {
    const { getResearch, match } = this.props;
    const { id } = match.params;
    getResearch(id);
  }

  onChange = (e) => {
    const { InputData, updateData } = this.props;
    if (e.target.name === 'researchFile' && e.target.files.length) {
      const file = e.target.files[0];
      InputData({
        ...updateData,
        researchFile: file,
        Filename: file.name,
      });
    } else {
      InputData({ ...updateData, [e.target.name]: e.target.value });
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { updateResearch, updateData, match } = this.props;
    const { id } = match.params;

    if (updateData.researchFile && updateData.researchFile.url) {
      delete updateData.researchFile;
    }

    const formData = new FormData();
    Object.keys(updateData).forEach((key) => {
      formData.append(key, updateData[key]);
    });
    updateResearch({ formData, id });
  };

  render() {
    const { researchItem, loading, updateData, error } = this.props;

    return (
      <div>
        {researchItem.data ? (
          <ResearchForm
            onChange={this.onChange}
            onSubmit={this.onFormSubmit}
            fileName={updateData.Filename || ''}
            title={researchItem.data.title}
            loading={loading}
          />
        ) : (
          <div>
            {error.data ? (
              <EmptyView
                errorMessage="Research Not Found"
                errrorDescription="The Research you are trying to Edit Does not Exist"
                path="/resources/research/all"
                pathLabel="View Research Items"
              />
            ) : (
              <span />
            )}
          </div>
        )}
      </div>
    );
  }
}

EditResearch.propTypes = {
  getResearch: PropTypes.func.isRequired,
  updateResearch: PropTypes.func.isRequired,
  InputData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  updateData: PropTypes.shape({}).isRequired,
  researchItem: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  error: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.editResearch.loading,
  researchItem: state.editResearch.researchItem,
  updateData: state.editResearch.updateInput,
  error: state.editResearch.error,
});

const mapDispatchToProps = {
  getResearch: getResearchRequest,
  InputData: updateInputData,
  updateResearch: updateResearchRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditResearch);
