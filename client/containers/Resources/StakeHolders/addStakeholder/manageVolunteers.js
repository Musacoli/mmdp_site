import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import InputDropDown from './inputDropDown';
import TextInput from './textInput';

class ManageVolunteers extends Component {
  state = {
    hasVolunteers: false,
    hasVolunteerOptions: [
      {
        key: 1,
        text: `Yes`,
        value: true,
      },
      {
        key: 2,
        text: `No`,
        value: false,
      },
    ],
  };

  handleVolunteersCount = (e, { name, value }) => {
    const { updateRequiredFields } = this.props;
    this.setState({
      hasVolunteers: value,
    });
    updateRequiredFields('volunteersCount', true, !value, name);
  };

  componentDidMount() {
    const { data, updateRequiredFields } = this.props;
    const count = data.volunteersCount;
    if (count === '' || count === 0) {
      this.setState({
        hasVolunteers: false,
      });
      updateRequiredFields('volunteersCount', true, true);
    } else {
      this.setState({
        hasVolunteers: true,
      });
      updateRequiredFields('volunteersCount', true, false);
    }
  }

  render() {
    const { hasVolunteerOptions, hasVolunteers } = this.state;
    const { onChange, data } = this.props;
    return (
      <Form.Group widths="equal">
        <InputDropDown
          nameValue="hasVolunteers"
          placeholder="Yes or No"
          isRequired
          data={this.state}
          onChange={this.handleVolunteersCount}
          options={hasVolunteerOptions}
        />
        <TextInput
          onChange={onChange}
          nameValue="volunteersCount"
          label="Volunteers"
          placeholder="Volunteers Number"
          isRequired
          isDisabled={!hasVolunteers}
          type="number"
          data={data}
        />
      </Form.Group>
    );
  }
}

ManageVolunteers.propTypes = {
  onChange: PropTypes.func.isRequired,
  updateRequiredFields: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object),
};

export default ManageVolunteers;
