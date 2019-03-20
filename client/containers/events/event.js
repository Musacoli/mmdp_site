import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventForm from '../../components/events/EventForm';
import { addEventRequest } from '../../store/actions/events/event';
import { validateFields } from '../../utils/validations';

export class CreateEvent extends Component {
  state = {
    title: '',
    details: '',
    eventDate: '',
    mainEvent: false,
    ImageName: '',
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditorInputChange = (value) => {
    this.setState({
      details: value,
    });
  };

  handleCheckbox = (event) => {
    if (event.target.checked) {
      this.setState({
        mainEvent: true,
      });
    } else {
      this.setState({
        mainEvent: false,
      });
    }
  };

  handleDate = (event, { value }) => {
    this.setState({
      eventDate: value,
    });
  };

  fileChangedHandler = (event) => {
    const file = event.target.files[0];
    this.setState({
      headerImage: file,
      ImageName: file.name,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { addEvents } = this.props;

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    addEvents(formData);
  };

  render() {
    const { eventDate, ImageName } = this.state;
    const { response } = this.props;

    return (
      <React.Fragment>
        <EventForm
          header="Add Event"
          handleInputChange={this.handleInputChange}
          handleEditorInputChange={this.handleEditorInputChange}
          handleSubmit={this.handleSubmit}
          handleCheckbox={this.handleCheckbox}
          handleUpload={this.fileChangedHandler}
          eventDate={eventDate}
          handleDate={this.handleDate}
          defaults={this.state}
          ImageName={ImageName}
          loading={response.adding}
          disabled={validateFields(this.state)}
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state) => ({
  response: state.createEntry,
});

export const mapDispatchToProps = {
  addEvents: (data) => addEventRequest(data),
};

CreateEvent.propTypes = {
  addEvents: PropTypes.func.isRequired,
  response: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEvent);
