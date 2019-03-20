/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventsList from '../../components/events/EventsList';
import { listEvents } from '../../store/actions/events/event';
import EmptyView from '../../components/common/InvalidPage';
import Pagination from '../../components/common/Pagination';
import '../../assets/styles/events.scss';

export class ListEvents extends Component {
  state = {
    search: '',
  };

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = (pageNumber = 1, searchStr = null) => {
    const { dispatch } = this.props;
    const { search } = this.state;

    const query = searchStr !== null ? searchStr : search;

    dispatch(listEvents({ page: pageNumber, search: query }));
  };

  handleSearch = (search) => {
    this.setState({ search });
    this.fetchEvents(1, search);
  };

  handleSearchChange = (search) => {
    if (!search) {
      this.setState({ search });
      this.fetchEvents(1, search);
    }
  };

  render() {
    const { events, loading, pagination } = this.props;
    return (
      <React.Fragment>
        <div className="event-container">
          <EventsList
            events={events}
            loading={loading}
            handleDelete={this.handleDelete}
            handleSearchChange={this.handleSearchChange}
            handleSearch={this.handleSearch}
            {...this.props}
          />
          {!loading && events.length < 1 && (
            <React.Fragment>
              <EmptyView
                errorMessage="No Event to display"
                errorDescription=" There are no events to be displayed here"
                path="/create-event"
                pathLabel="Add Event"
              />
            </React.Fragment>
          )}
          <div>
            <Pagination
              className="right floated events-pagination"
              data={pagination}
              handlePageChange={this.fetchEvents}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.listEvents.events,
  pagination: state.listEvents.pagination,
  loading: state.listEvents.fetching,
  open: state.open,
});

ListEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
  pagination: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(ListEvents);
