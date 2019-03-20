/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import SimpleLoader from '../common/Loader/SimpleLoader';
import Search from '../common/Search';

const EventsList = (props) => {
  const {
    events,
    loading,
    handleDelete,
    handleSearch,
    handleSearchChange,
  } = props;
  const showEvents = events.map((event_) => (
    <EventCard props={event_} key={event_._id} handleDelete={handleDelete} />
  ));
  return (
    <React.Fragment>
      <div className="events-container">
        <div className="ui grid">
          <div className="twelve wide column">
            <Search
              placeholder="Search events"
              onSearch={handleSearch}
              onChange={handleSearchChange}
            />
          </div>
          <div className="four wide column">
            <Link to="/create-event">
              <Button className="btn-add ugly-blue small">New event</Button>
            </Link>
          </div>
        </div>
        {!loading && events.length ? (
          <div className="ui grid list-body">{showEvents}</div>
        ) : (
          ''
        )}
        {loading && <SimpleLoader loading={loading} />}
      </div>
    </React.Fragment>
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
  handleDelete: PropTypes.func,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default EventsList;
