import React from 'react';
import SearchMedia from './SearchMedia';
import MediaList from './MediaList';

const DocumentComponent = (props) => {
  return (
<<<<<<< HEAD
    <div className="main-content">
      <SearchMedia />
      <MediaList {...props} />
    </div>
=======
    <React.Fragment>
      <SearchMedia />
      <MediaList {...props} />
    </React.Fragment>
>>>>>>> feat(repository-documents): Implement a grid list of documents
  );
};

export default DocumentComponent;
