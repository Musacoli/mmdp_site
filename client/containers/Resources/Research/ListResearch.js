import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListResearchGrid from '../../../components/Resources/Research/ListResearch';
import {
  getResearch as getResearchAction,
  deleteResearch,
  archiveResearch,
} from '../../../store/actions/resources/getResearch';
import SimpleLoader from '../../../components/common/Loader/SimpleLoader';
import Pagination from '../../../components/common/Pagination';

export class ListResearch extends Component {
  state = {
    isOpen: false,
    itemToModify: null,
    search: '',
  };

  componentDidMount() {
    this.fetchResearch();
  }

  fetchResearch = (page = 1, searchStr = null) => {
    const { getResearch } = this.props;
    const { search } = this.state;

    const searchQuery = searchStr !== null ? searchStr : search;

    getResearch({ page, query: searchQuery });
  };

  handleModalToggle = () => {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  };

  showModal = (event, { id: itemToModify, modalAction }) => {
    event.preventDefault();
    this.setState({
      isOpen: true,
      itemToModify,
      modalAction,
    });
  };

  handleConfirmClick = () => {
    const { modalAction, itemToModify } = this.state;
    const { removeResearch, archiveResearch: performArchive } = this.props;
    if (modalAction === 'delete') {
      removeResearch(itemToModify);
    } else if (modalAction === 'archive' || modalAction === 'unarchive') {
      const data =
        modalAction === 'unarchive' ? { archived: false } : { archived: true };
      performArchive({ _id: itemToModify, data });
    }
    this.handleModalToggle();
  };

  handleSearch = (search) => {
    this.fetchResearch(1, search);
  };

  handleSearchChange = (search) => {
    if (!search) {
      this.fetchResearch(1, search);
    }
    this.setState({ search });
  };

  render() {
    let researchResults = {};
    const { loading, research } = this.props;
    if (research.results && research.results.data) {
      researchResults = research.results.data;
    }
    const { isOpen, modalAction } = this.state;

    return (
      <>
        <SimpleLoader loading={loading} />
        <ListResearchGrid
          results={researchResults}
          instanceName="Research"
          addResearchUrl="/resources/research/add"
          isOpen={isOpen}
          showModal={this.showModal}
          modalAction={modalAction}
          handleModalToggle={this.handleModalToggle}
          onConfirm={this.handleConfirmClick}
          handleSearchChange={this.handleSearchChange}
          handleSearch={this.handleSearch}
          loading={loading}
        />
        <Pagination
          data={researchResults}
          handlePageChange={this.fetchResearch}
          className="reports-pagination"
        />
      </>
    );
  }
}

ListResearch.propTypes = {
  getResearch: PropTypes.func.isRequired,
  removeResearch: PropTypes.func.isRequired,
  archiveResearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  research: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  research: state.getResearch,
  loading: state.getResearch.loading,
});

const mapDispatchToProps = {
  getResearch: getResearchAction,
  removeResearch: deleteResearch,
  archiveResearch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListResearch);
