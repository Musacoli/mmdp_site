import React from 'react';
import SearchMedia from './SearchMedia';
import MediaList from './MediaList';

const DocumentComponent = (props) => {
  return (
    <div className="main-content">
      <SearchMedia />
      <MediaList {...props} />
    </div>
  );
};

export default DocumentComponent;
