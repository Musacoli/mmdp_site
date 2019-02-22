import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Button } from 'semantic-ui-react';
import Archiver from '../../../containers/Resources/Document/ArchiveDocument';
import DeleteDocument from '../../../containers/Resources/Document/DeleteDocument';

const MediaCard = ({ item, goTo }) => (
  <Grid.Column>
    <Card className="media">
      <Card.Content className="show">
        <Card.Header className="media__heading">{item.title}</Card.Header>
      </Card.Content>
      <Card.Content className="show">
        <div className="ui three buttons">
          <Button
            loading={false}
            id="document_edit_btn"
            onClick={() => goTo(`/resources/documents/edit/${item._id}`)}
          >
            Edit
          </Button>
          <Archiver archived={item.archived} id={item._id} />
          <DeleteDocument id={item._id} />
        </div>
      </Card.Content>
    </Card>
  </Grid.Column>
);

MediaCard.propTypes = {
  item: PropTypes.shape({ id: PropTypes.string }).isRequired,
  goTo: PropTypes.func.isRequired,
};
export default MediaCard;
