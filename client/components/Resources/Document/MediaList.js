import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import DocumentCard from './DocumentCard';
import MediaCard from '../Media/MediaCard';

import InvalidPage from '../../common/InvalidPage';

const MediaList = ({ loading, documents, goTo, isMedia }) => (
  <Grid columns={4} className="ui loading" loading={loading.toString()}>
    <Grid.Row className="animated fadeIn">
      {documents.results.map((item) => {
        return isMedia ? (
          <MediaCard item={item} key={item._id} goTo={goTo} />
        ) : (
          <DocumentCard item={item} key={item._id} goTo={goTo} />
        );
      })}
    </Grid.Row>
    {!loading && documents.results.length < 1 && (
      <InvalidPage
        pathLabel="Add a document"
        errorMessage="No documents to display"
        errorDescription="Please add documents"
        path="/resources/document/add"
      />
    )}
    {loading && (
      <Grid.Row className="ui loading center aligned animated fadeIn">
        <Grid.Column width={16}>
          <Icon size="large" name="circle notched" className="loading" />
          Loading
        </Grid.Column>
      </Grid.Row>
    )}
  </Grid>
);

MediaList.propTypes = {
  documents: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  goTo: PropTypes.func.isRequired,
  isMedia: PropTypes.bool.isRequired,
};

export default MediaList;