import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  SingleEventRequest,
  UpdateData,
  UpdateEventRequest,
} from '../../store/actions/events/event';
import EditForm from '../../components/events/EventForm';
import EmptyView from '../../components/common/InvalidPage';
import SidebarMenu from '../Sidebar/index';

export class EditEVent extends Component {
  componentWillMount() {
    const { match, getEvent } = this.props;
    const { id } = match.params;
    getEvent(id);
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const { inputData, currentData } = this.props;
    inputData({
      ...currentData,
      [event.target.name]: event.target.value,
    });
  };

  handleEditorInputChange = (value) => {
    const { inputData, currentData } = this.props;
    inputData({
      ...currentData,
      details: value,
    });
  };

  handleCheckbox = (event) => {
    const { inputData, currentData } = this.props;
    if (event.target.checked) {
      inputData({
        ...currentData,
        mainEvent: true,
      });
    } else {
      inputData({
        ...currentData,
        mainEvent: false,
      });
    }
  };

  handleDate = (event, { value }) => {
    const { inputData, currentData } = this.props;
    inputData({
      ...currentData,
      eventDate: value,
    });
  };

  fileChangedHandler = (event) => {
    const file = event.target.files[0];
    const { inputData, currentData } = this.props;
    inputData({
      ...currentData,
      headerImage: file,
      ImageName: file.name,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { currentData, updateEvent, match } = this.props;

    if (currentData.headerImage && currentData.headerImage.url) {
      delete currentData.headerImage;
    }

    const formData = new FormData();
    Object.keys(currentData).forEach((key) => {
      formData.append(key, currentData[key]);
    });
    const { id } = match.params;
    updateEvent({ id, inputData: formData });
  };

  render() {
    const { eventData, currentData, eventError, response } = this.props;
    return (
      <div>
        <SidebarMenu />
        <div>
          {eventData.data && currentData.headerImage ? (
            <div>
              <EditForm
                header="Edit Event"
                eventDate={currentData.eventDate ? currentData.eventDate : ''}
                handleInputChange={this.handleInputChange}
                defaults={eventData.data}
                handleSubmit={this.handleSubmit}
                handleEditorInputChange={this.handleEditorInputChange}
                handleDate={this.handleDate}
                handleCheckbox={this.handleCheckbox}
                handleUpload={this.fileChangedHandler}
                ImageName={
                  currentData.ImageName
                    ? currentData.ImageName
                    : currentData.headerImage.filename
                }
                loading={response.loading}
              />
            </div>
          ) : (
            <div>
              {eventError.message ? (
                <EmptyView
                  errorMessage="Event Not Found"
                  errrorDecription="The Event you are trying to Edit Does not Exist"
                  path="/list-events/1"
                  pathLabel="View Events"
                />
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

EditEVent.propTypes = {
  currentData: PropTypes.shape({}).isRequired,
  updateEvent: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  inputData: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  eventData: PropTypes.shape({}).isRequired,
  eventError: PropTypes.shape({}).isRequired,
  response: PropTypes.shape({}).isRequired,
};

export const mapStateToProps = (state) => ({
  eventData: state.singleEvent.data,
  eventError: state.singleEvent.error,
  currentData: state.singleEvent.inputData,
  response: state.updateEvent,
});
export const mapDispatchToProps = {
  getEvent: SingleEventRequest,
  inputData: (data) => UpdateData(data),
  updateEvent: (data) => UpdateEventRequest(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEVent);
