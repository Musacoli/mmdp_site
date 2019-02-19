import React from 'react';
import Templates from '../../Templates';
/* eslint-disable import/no-named-as-default */
import MediaList from '../../../containers/Resources/Media/MediaList';

const MediaListView = ({ ...props }) => (
  <Templates {...props} title="Media">
    <MediaList {...props} />
  </Templates>
);

export default MediaListView;
