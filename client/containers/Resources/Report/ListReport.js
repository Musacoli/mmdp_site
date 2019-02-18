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
    currentPage: null,
  };

  componentDidMount() {
    const { getReports, location } = this.props;
    const { search } = location;
    const query = new URLSearchParams(search);
    const page = parseInt(query.get('page') || 1, 10);
    getReports(page);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { location } = nextProps;
    const { search } = location;
    const query = new URLSearchParams(search);
    const page = parseInt(query.get('page') || 1, 10);
    if (prevState.currentPage !== page) {
      return {
        currentPage: page,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;
    if (prevState.currentPage !== currentPage) {
      const { getReports } = this.props;
      getReports(currentPage);
    }
  }

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

  render() {
    const { isOpen, modalAction } = this.state;

    const { response, loading } = this.props;
    const { meta = {}, reports = [] } = response;
    const { currentPage, totalPages } = meta;
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
        />
        {currentPage ? (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        ) : null}
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
