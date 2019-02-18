import React from 'react';
import SearchMedia from './SearchMedia';
import MediaList from './MediaList';

const DocumentComponent = (props) => {
  return (
    <React.Fragment>
      <SearchMedia />
      <MediaList {...props} />
    </React.Fragment>
  );
};

export default DocumentComponent;
