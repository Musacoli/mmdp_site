/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import EventsList from '../../components/events/EventsList';
import { listEvents } from '../../store/actions/events/event';
import EmptyView from '../../components/common/InvalidPage';
import SidebarMenu from '../Sidebar/index';

export class ListEvents extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(listEvents());
  }

  handleNext = (e) => {
    e.preventDefault();
    const { currentPage, dispatch } = this.props;
    dispatch(listEvents(currentPage + 1));
  };

  handlePrevious = (e) => {
    e.preventDefault();
    const { currentPage, dispatch } = this.props;
    dispatch(listEvents(currentPage - 1));
  };

  render() {
    const { events, pages, currentPage, next, previous } = this.props;

    let nextPage;

    if (next) {
      nextPage = (
        <button
          onClick={this.handleNext}
          type="button"
          className="pg-btn icon-active"
          id="next"
        >
          <Icon className="angle right" />
        </button>
      );
    } else {
      nextPage = (
        <button className="disabled pg-btn icon-inactive" type="button">
          <Icon className="angle right" />
        </button>
      );
    }

    let prevPage;

    if (previous) {
      prevPage = (
        <button
          onClick={this.handlePrevious}
          type="button"
          className="pg-btn icon-active"
          id="next"
        >
          <Icon className="angle left" />
        </button>
      );
    } else {
      prevPage = (
        <button className="disabled pg-btn icon-inactive" type="button">
          <Icon className="angle left" />
        </button>
      );
    }

    return events.length > 0 ? (
      <React.Fragment>
        <div className="event-container">
          <EventsList
            events={events}
            pages={pages}
            currentPage={currentPage}
            handleDelete={this.handleDelete}
            handleNext={this.handleNext}
            handlePrevious={this.handlePrevious}
          />
          <div className=" ui grid floated right middle aligned events-pagination">
            <span className="pg-text">Page</span>
            <div className="page-number">{currentPage}</div>
            <span className="pg-text">
              of &nbsp;
              {pages}
            </span>
            <div className="pg-buttons">
              <span>{prevPage}</span>
              <span>{nextPage}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <SidebarMenu />
        <EmptyView
          errorMessage="No Event to display"
          errrorDescription=" There are no events to be displayed here"
          path="/create-event"
          pathLabel="Add Event"
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({
  events: state.listEvents.events,
  pages: state.listEvents.pages,
  currentPage: state.listEvents.currentPage,
  previous: state.listEvents.previous,
  next: state.listEvents.next,
  open: state.open,
});

ListEvents.propTypes = {
  events: PropTypes.shape([]).isRequired,
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  next: PropTypes.number.isRequired,
  previous: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(ListEvents);
