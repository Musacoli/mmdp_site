import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Image, Embed } from 'semantic-ui-react';
import ActionModal from '../../common/Modal/ActionModal';

const MediaCard = ({ item, deleteMedia, isDeleting, deleteMediaId }) => (
  <Grid.Column
    className={
      isDeleting && item._id === deleteMediaId ? 'ui form loading' : ''
    }
  >
    <Card className="media">
      <div className="media__view">
        {item.mediaType === 'video' && <Embed url={item.mediaFile.url} />}
        {/* eslint-disable */}
        {item.mediaType === 'photo' && item.mediaType && (
          <Image src={item.mediaFile.url} />
        )}
        {/* eslint-enable */}
      </div>
      <Card.Content className="show" extra>
        <Card.Meta>
          {item.mediaFile && <span>{item.mediaFile.filename}</span>}
        </Card.Meta>
        <Card.Description>
          <ActionModal
            triggerText="Delete"
            header="Delete media"
            className="ui red delete media cursor pointer"
            content="Are you sure you want to delete this media?"
            confirmDeleteGroup={() => deleteMedia({ _id: item._id })}
          />
        </Card.Description>
      </Card.Content>
    </Card>
  </Grid.Column>
);
MediaCard.propTypes = {
  item: PropTypes.shape({}).isRequired,
  deleteMedia: PropTypes.func,
  isDeleting: PropTypes.bool,
  deleteMediaId: PropTypes.string,
};
MediaCard.defaultProps = {
  deleteMedia: () => {},
  isDeleting: false,
  deleteMediaId: '',
};
export default MediaCard;
