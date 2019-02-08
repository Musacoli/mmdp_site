/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import MarkdownEditor from '../common/MarkdownEditor';
import { FileInput } from '../common/Inputs';
import '../../assets/styles/events.scss';

const EventForm = ({
  handleInputChange,
  handleSubmit,
  handleUpload,
  handleEditorInputChange,
  handleCheckbox,
  eventDate,
  handleDate,
  defaults,
  ImageName,
  header,
  loading,
}) => (
  <div>
    <div className="events-header">{header}</div>
    <div className="events-container">
      <Form onSubmit={handleSubmit} loading={loading}>
        <Grid columns={2}>
          <Grid.Column>
            <label className="event-label">Event name</label>
          </Grid.Column>
          <Grid.Column>
            <label className="event-label">Event date and time</label>
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column>
            <input
              placeholder="This is a sample text"
              id="name"
              name="title"
              onChange={handleInputChange}
              required
              defaultValue={defaults.title}
              className="input-field"
            />
          </Grid.Column>
          <Grid.Column>
            <DateInput
              clearable
              name="date"
              popupPosition="bottom center"
              dateFormat="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              value={eventDate}
              iconPosition="left"
              onChange={handleDate}
              autoComplete="off"
              required
            />
          </Grid.Column>
        </Grid>
        <br />
        <div className="ui checkbox">
          <input
            type="checkbox"
            name="mainEvent"
            onClick={handleCheckbox}
            defaultChecked={defaults.mainEvent}
          />
          <label className="event-label">Set as main event</label>
        </div>
        <br />
        <br />
        <label className="event-label"> Set as header image</label>
        <br />
        <FileInput
          classNames="file-width"
          placeholder={ImageName || 'Select a photo'}
          value=""
          id="mainEvent"
          name="mainEvent"
          change={handleUpload}
        />
        <br />
        <br />
        <label className="event-label">Event details</label>
        <br />
        <br />
        <MarkdownEditor
          handleEditorChange={handleEditorInputChange}
          value={defaults.details}
          required
        />
        <br />
        <button type="submit" className="btn-save">
          Save
        </button>
      </Form>
    </div>
  </div>
);

EventForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleEditorInputChange: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  eventDate: PropTypes.string.isRequired,
  handleDate: PropTypes.func.isRequired,
  defaults: PropTypes.shape({}).isRequired,
  ImageName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EventForm;
