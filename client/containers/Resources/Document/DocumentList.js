import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { fetchDocuments } from '../../../store/actions/resources/document';
import DocumentComponent from '../../../components/Resources/Document/PdfDocument';
import Pagination from '../../../components/common/Pagination';
import Search from '../../../components/common/Search';

export class DocumentList extends Component {
  static propTypes = {
    getDocuments: PropTypes.func.isRequired,
    documents: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  state = {
    search: '',
  };

  componentDidMount() {
    this.fetchDocuments();
  }

  fetchDocuments = (pageNumber = 1, searchStr = null) => {
    const { getDocuments } = this.props;
    const { search } = this.state;

    const query = searchStr !== null ? searchStr : search;

    getDocuments({ page: pageNumber, search: query });
  };

  handleSearch = (search) => {
    this.setState({ search });
    this.fetchDocuments(1, search);
  };

  handleSearchChange = (search) => {
    if (!search) {
      this.setState({ search });
      this.fetchDocuments(1, search);
    }
  };

  goTo = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { loading, documents } = this.props;
    const { search } = this.state;

    return (
      <React.Fragment>
        {documents.results.length || search ? (
          <div className="ui grid">
            <div className="twelve wide column">
              <Search
                placeholder="Search documents"
                onChange={this.handleSearchChange}
                onSearch={this.handleSearch}
              />
            </div>
            <div className="four wide column">
              <a href="/resources/document/add">
                <Button className="common__button bg-ugly-blue add-media" fluid>
                  Add Document
                </Button>
              </a>
            </div>
          </div>
        ) : (
          ''
        )}

        <DocumentComponent
          goTo={this.goTo}
          loading={loading}
          documents={documents}
          instanceName="Document"
          addMediaUrl="/resources/document/add"
        />
        <div className="doc__pagination">
          <Pagination
            handlePageChange={this.fetchDocuments}
            data={documents.pagination}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documents.data,
  loading: state.documents.isFetching,
});

const mapDispatchToProps = {
  getDocuments: fetchDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentList);
