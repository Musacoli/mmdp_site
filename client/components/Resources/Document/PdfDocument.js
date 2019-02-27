import React from 'react';
import MediaList from './MediaList';

const PdfDocument = (props) => {
  return (
    <React.Fragment>
      <MediaList {...props} />
    </React.Fragment>
  );
};

export default PdfDocument;
