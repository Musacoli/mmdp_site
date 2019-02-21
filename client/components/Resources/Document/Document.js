import React from 'react';
import SearchMedia from './SearchMedia';
import MediaList from './MediaList';

const Document = (props) => {
  return (
    <React.Fragment>
      <SearchMedia />
      <MediaList {...props} />
    </React.Fragment>
  );
};

export default Document;
