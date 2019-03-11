import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import DocumentCard from './DocumentCard';
import MediaCard from '../Media/MediaCard';
import SimpleLoader from '../../common/Loader/SimpleLoader';
import InvalidPage from '../../common/InvalidPage';

const MediaList = (props) => {
  const { documents, isMedia, loading, instanceName, addMediaUrl } = props;
  return (
    <Grid columns={4} className="ui loading">
      <Grid.Row className="animated fadeIn">
        {documents.results.map((item) => {
          return isMedia ? (
            <MediaCard item={item} key={item._id} {...props} />
          ) : (
            <DocumentCard item={item} key={item._id} {...props} />
          );
        })}
      </Grid.Row>
      {!loading && documents.results.length < 1 && (
        <Grid.Row className="ui loading center aligned animated fadeIn">
          <InvalidPage
            pathLabel={`Add a ${instanceName}`}
            errorMessage={`No ${instanceName} to display`}
            errorDescription={`Please add ${instanceName}`}
            path={addMediaUrl || '/'}
          />
        </Grid.Row>
      )}
      {loading && <SimpleLoader loading={loading} />}
    </Grid>
  );
};

MediaList.propTypes = {
  documents: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  isMedia: PropTypes.bool,
  instanceName: PropTypes.string,
};
export default MediaList;
