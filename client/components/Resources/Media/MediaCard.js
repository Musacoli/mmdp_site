import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Image, Embed } from 'semantic-ui-react';

const MediaCard = ({ item }) => (
  <Grid.Column>
    <Card className="media">
      <div className="media__view">
        {item.mediaType === 'video' && <Embed url={item.mediaFile.url} />}
        {item.mediaType !== 'video' && <Image src={item.mediaFile.url} />}
      </div>
      <Card.Content className="show" extra>
        <Card.Meta>{item.mediaFile.filename}</Card.Meta>
        <Card.Description>
          <span className="ui red delete media">Delete</span>
        </Card.Description>
      </Card.Content>
    </Card>
  </Grid.Column>
);

MediaCard.propTypes = {
  item: PropTypes.shape({}).isRequired,
};
export default MediaCard;
