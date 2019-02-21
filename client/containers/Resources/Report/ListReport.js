import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListReportGrid from '../../../components/Resources/Report/ListReport';
import {
  fetchReports,
  deleteReport,
  archiveReport,
} from '../../../store/actions/resources/report';
import SimpleLoader from '../../../components/common/Loader/SimpleLoader';
import Pagination from '../../../components/common/Pagination';

export class ListReport extends Component {
  state = {
    isOpen: false,
    itemToModify: null,
    search: '',
  };

  componentDidMount() {
    this.fetchReports();
  }

  fetchReports = (page = 1, searchStr = null) => {
    const { getReports } = this.props;
    const { search } = this.state;

    const query = searchStr !== null ? searchStr : search;

    getReports({ page, search: query });
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
    const { removeReport, archiveReport: performArchive } = this.props;
    if (modalAction === 'delete') {
      removeReport({ id: itemToModify });
    } else if (modalAction === 'archive' || modalAction === 'unarchive') {
      performArchive({ id: itemToModify, action: modalAction });
    }
    this.handleModalToggle();
  };

  handleSearch = (search) => {
    this.setState({ search });
    this.fetchReports(1, search);
  };

  handleSearchChange = (search) => {
    if (!search) {
      this.setState({ search });
      this.fetchReports(1, search);
    }
  };

  render() {
    const { isOpen, modalAction } = this.state;

    const { response, loading } = this.props;
    const { pagination = {}, reports = [] } = response;
    return (
      <>
        <SimpleLoader loading={loading} />
        <ListReportGrid
          reports={reports}
          isOpen={isOpen}
          showModal={this.showModal}
          modalAction={modalAction}
          handleModalToggle={this.handleModalToggle}
          onConfirm={this.handleConfirmClick}
          handleSearchChange={this.handleSearchChange}
          handleSearch={this.handleSearch}
        />
        <Pagination
          data={pagination}
          handlePageChange={this.fetchReports}
          className="reports-pagination"
        />
      </>
    );
  }
}

ListReport.propTypes = {
  getReports: PropTypes.func.isRequired,
  removeReport: PropTypes.func.isRequired,
  archiveReport: PropTypes.func.isRequired,
  response: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  response: state.report.response,
  loading: state.report.loading,
});

const mapDispatchToProps = {
  getReports: fetchReports,
  removeReport: deleteReport,
  archiveReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListReport);
