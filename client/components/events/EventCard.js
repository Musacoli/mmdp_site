/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import moment from 'moment';
import { ConfirmationModal } from '../../containers/events/deleteModal';

const EventCard = ({ props }) => {
  const { headerImage, eventDate, title, _id } = props;
  return (
    <div className="ui event-card">
      <div className="event-card__header">
        <img
          className="event-card__header"
          src={headerImage.url}
          alt="header-image"
        />
      </div>
      <div className="aligned event-card__body">
        <div className="event-card__body-title">
          <Truncate lines={2}>{title}</Truncate>
        </div>
        <span className="event-card__body-date">
          {moment(eventDate).format('dddd D, MMMM YYYY')}
        </span>
      </div>
      <div className="ui grid card-footer">
        <Link to={`/edit-event/${_id}`}>
          <button type="button" className="footer-btn txt-blue">
            Edit
          </button>
        </Link>
        <button type="button" className="footer-btn txt-blue">
          Archive
        </button>
        <ConfirmationModal
          triggerText="Delete"
          content="Are you sure you want to this event?"
          className="footer-btn txt-red"
          _id={_id}
        />
      </div>
    </div>
  );
};

EventCard.propTypes = {
  headerImage: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  props: PropTypes.shape({}).isRequired,
};

export default EventCard;
