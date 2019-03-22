import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDocuments } from '../../../store/actions/resources/document';
import { deleteMedia } from '../../../store/actions/resources/media';
import Document from '../../../components/Resources/Document/Document';

export class MediaList extends Component {
  static propTypes = {
    getDocuments: PropTypes.func.isRequired,
    documents: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
    history: PropTypes.shape({}).isRequired,
    removeMedia: PropTypes.func.isRequired,
  };

  state = {};

  componentDidMount() {
    const { getDocuments } = this.props;
    getDocuments({ mediaType: 'media' });
  }

  deleteMediaFile = (payload) => {
    const { removeMedia } = this.props;
    removeMedia(payload);
  };

  render() {
    const { loading, documents, isDeleting } = this.props;
    return (
      <Document
        goTo={() => {}}
        loading={loading}
        documents={documents}
        instanceName="Media"
        addMediaUrl="/resources/media/add"
        deleteMedia={this.deleteMediaFile}
        isDeleting={isDeleting}
        {...this.props}
        isMedia
      />
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documents.data,
  loading: state.documents.isFetching,
  isDeleting: state.media.isDeleting,
  deleteMediaId: state.media._id,
});

const mapDispatchToProps = {
  getDocuments: fetchDocuments,
  removeMedia: deleteMedia,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaList);
