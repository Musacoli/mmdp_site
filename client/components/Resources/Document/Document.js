import React from 'react';
import PropTypes from 'prop-types';
import DocumentList from './MediaList';
import MediaType from '../Media/MediaType';
import TopBar from './TopBar';

const Document = (props) => {
  const { isMedia } = props;
  return (
    <React.Fragment>
      <TopBar {...props} />
      {isMedia && <MediaType />}
      <DocumentList {...props} />
    </React.Fragment>
  );
};

Document.propTypes = {
  isMedia: PropTypes.bool,
};

Document.defaultProps = {
  isMedia: false,
};
export default Document;
