/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

const EventsList = ({ events, handleDelete }) => {
  const showEvents = events.map((event_) => (
    <EventCard props={event_} key={event_._id} handleDelete={handleDelete} />
  ));

  return (
    <React.Fragment>
      <div className="ui grid">
        <Input placeholder="Search events" className="search-box" />
        <Button className="btn-search cool-blue small">Search</Button>
        <Link to="/create-event">
          <Button className="btn-add ugly-blue small">New event</Button>
        </Link>
      </div>
      <div className="ui grid list-body">{showEvents}</div>
    </React.Fragment>
  );
};

EventsList.propTypes = {
  events: PropTypes.shape([]).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default EventsList;
