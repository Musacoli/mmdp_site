import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { fetchDocument } from '../../../store/actions/resources/document';
=======
import { fetchDocuments } from '../../../store/actions/resources/document';
>>>>>>> feat(repository-documents): Implement a grid list of documents
import DocumentComponent from '../../../components/Resources/Document/DocumentComponent';

export class DocumentList extends Component {
  static propTypes = {
    getDocuments: PropTypes.func.isRequired,
    documents: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  state = {};

  componentDidMount() {
    const { getDocuments } = this.props;
    getDocuments();
  }

  goTo = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { loading, documents } = this.props;
    return (
      <DocumentComponent
        goTo={this.goTo}
        loading={loading}
        documents={documents}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documents.data,
<<<<<<< HEAD
  loading: state.documents.isFetching,
});

const mapDispatchToProps = {
  getDocuments: fetchDocument,
=======
  loading: state.documents.loading,
});

const mapDispatchToProps = {
  getDocuments: fetchDocuments,
>>>>>>> feat(repository-documents): Implement a grid list of documents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentList);
