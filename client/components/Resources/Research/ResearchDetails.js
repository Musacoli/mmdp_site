import React from 'react';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ResearchCard = ({ title, Archived, _id }) => {
  return (
    <div className="research__details">
      <p id="research__content">{title}</p>
      <List horizontal>
        <List.Item>
          <Link to={`/resources/research/edit/${_id}`} id="research__edit__btn">
            Edit
          </Link>
        </List.Item>
        <List.Item as="a" id="research__archive__btn">
          {Archived ? 'UnArchive' : 'Archive'}
        </List.Item>
        <List.Item as="a" id="research__delete__btn">
          Delete
        </List.Item>
      </List>
    </div>
  );
};

export default ResearchCard;

ResearchCard.propTypes = {
  title: PropTypes.string.isRequired,
  Archived: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired,
};
