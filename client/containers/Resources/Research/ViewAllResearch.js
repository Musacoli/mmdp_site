import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ResearchViewAll from '../../../components/Resources/Research/ResearchList';
import SimpleLoader from '../../../components/common/Loader/SimpleLoader';
import {
  getResearch,
  deleteResearch,
  archiveResearch,
} from '../../../store/actions/resources/getResearch';
import Pagination from '../../../components/common/Pagination/index';
import ConfirmModal from '../../../components/common/Modal/ConfirmModal';
import Search from '../../../components/common/Search';

export class ViewAllResearch extends Component {
  state = {
    isOpen: false,
    _id: '',
  };

  componentWillMount() {
    const { getResearch: getResearchAction } = this.props;
    getResearchAction();
  }

  handleArchive = (archiveId, data) => {
    const res = {
      _id: archiveId,
      data,
    };
    const { archiveResearch: archiveResearchAction } = this.props;
    archiveResearchAction(res);
  };

  handleDelete = (id) => {
    this.setState({ isOpen: true });
    this.setState({ _id: id });
  };

  handleModalToggle = (e) => {
    e.preventDefault();
    this.setState({ isOpen: false });
  };

  onConfirm = () => {
    const { deleteResearch: deleteResearchAction } = this.props;
    const { _id } = this.state;
    deleteResearchAction(_id);
    this.setState({ isOpen: false });
  };

  render() {
    let researchResults = {};
    const { loading, research, getResearch: getResearchPages } = this.props;
    if (research.results && research.results.data) {
      researchResults = research.results.data;
    }
    const { isOpen } = this.state;
    const modalInfo = {
      header: 'Delete Research',
      content: 'Are you sure you want to delete this research',
    };

    return (
      <div>
        <SimpleLoader loading={loading} />
        <Grid>
          <Grid.Column width={12}>
            <Search
              onSearch={() => {}}
              onChange={() => {}}
              className="report-search"
              placeholder="Search research"
            />
          </Grid.Column>
          <Grid.Column>
            <Link to="/resources/research/add" className="btn__add">
              <Button className="btn__add">New Research</Button>
            </Link>
          </Grid.Column>
        </Grid>
        <ResearchViewAll
          results={researchResults}
          onDelete={this.handleDelete}
          onArchive={this.handleArchive}
        />
        <Pagination
          data={researchResults}
          className="right floated events-pagination"
          handlePageChange={getResearchPages}
        />
        <ConfirmModal
          isOpen={isOpen}
          handleModalToggle={this.handleModalToggle}
          onConfirm={this.onConfirm}
          modalInfo={modalInfo}
        />
      </div>
    );
  }
}

ViewAllResearch.propTypes = {
  getResearch: PropTypes.func.isRequired,
  archiveResearch: PropTypes.func.isRequired,
  deleteResearch: PropTypes.func.isRequired,
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
  deleteResearch,
  archiveResearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewAllResearch);
