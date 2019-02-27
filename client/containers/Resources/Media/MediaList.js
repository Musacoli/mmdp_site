import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDocuments } from '../../../store/actions/resources/document';
import Document from '../../../components/Resources/Document/Document';

export class MediaList extends Component {
  static propTypes = {
    getDocuments: PropTypes.func.isRequired,
    documents: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  state = {};

  componentDidMount() {
    const { getDocuments } = this.props;
    getDocuments({ mediaType: 'media' });
  }

  render() {
    const { loading, documents } = this.props;
    return (
      <Document
        goTo={() => {}}
        loading={loading}
        documents={documents}
        instanceName="Media"
        addMediaUrl="/resources/media/add"
        isMedia
      />
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documents.data,
  loading: state.documents.loading,
});

const mapDispatchToProps = {
  getDocuments: fetchDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaList);
