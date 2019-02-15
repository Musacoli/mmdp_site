import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResearchViewAll from '../../../components/Resources/Research/ResearchList';
import SimpleLoader from '../../../components/common/Loader/SimpleLoader';
import { getResearch } from '../../../store/actions/resources/getResearch';
import Pagination from '../../../components/common/Pagination/index';
import Search from '../../../components/common/Search';

export class ViewAllResearch extends Component {
  componentWillMount() {
    const { getResearch: getResearchAction } = this.props;
    getResearchAction();
  }

  render() {
    let researchResults = {};
    const { loading, research, getResearch: getResearchPages } = this.props;
    if (research.payload && research.payload.data) {
      researchResults = research.payload.data;
    }
    return (
      <div>
        <SimpleLoader loading={loading} />
        <Search />
        <ResearchViewAll results={researchResults} />
        <Pagination
          data={researchResults}
          className="right floated events-pagination"
          handlePageChange={getResearchPages}
        />
      </div>
    );
  }
}

ViewAllResearch.propTypes = {
  getResearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  research: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  research: state.getResearch,
  loading: state.getResearch.loading,
});

const mapDispatchToProps = {
  getResearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewAllResearch);
