import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Button } from 'semantic-ui-react';
import DeleteDropdowns from '../../containers/ManageDropdowns/DeleteDropdowns';

const DropdownCard = ({ dropdown, goTo }) => (
  <Grid.Column className="dropdown-card">
    <Card className="media dropdown__card">
      <Card.Content className="show dropdown-content">
        <Card.Header className="media__heading">{dropdown.title}</Card.Header>
      </Card.Content>
      <Card.Content className="show">
        <div className="entries">{dropdown.count} entries</div>
      </Card.Content>
      <Card.Content className="show">
        <div className="ui three buttons">
          <Button
            loading={false}
            id="dropdown_edit_btn"
            onClick={() => goTo(`/dropdowns/${dropdown.route}`)}
          >
            Edit
          </Button>
          <DeleteDropdowns id={dropdown.name} />
        </div>
      </Card.Content>
    </Card>
  </Grid.Column>
);

DropdownCard.propTypes = {
  dropdown: PropTypes.shape({ name: PropTypes.string }).isRequired,
};
export default DropdownCard;
