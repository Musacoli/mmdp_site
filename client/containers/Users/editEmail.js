/* eslint-disbale  no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Message } from 'semantic-ui-react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { startEditing, fetchingOne } from '../../store/sagas/users';
import { fetchingGroups } from '../../store/actions/groups';
import mapGroupOptions from '../../utils/mapGroups';

export class EditEmail extends Component {
  state = {
    data: {
      newEmail: '',
    },
    status: false,
    success: false,
    selectedOption: [],
    selectedGroups: [],
  };

  componentWillMount() {
    const { fetchedUser, allGroups, match } = this.props;
    allGroups();
    fetchedUser(match.params.username);
  }

  componentWillReceiveProps(nextProps) {
    const { status, success } = nextProps.userEdit;
    this.setState({ status, success });
    setTimeout(() => {
      this.setState({ status: false, success: false }, () => {});
    }, 2000);
  }

  componentDidUpdate() {
    /* eslint-disable  react/no-did-update-set-state */
    const { fetchOneUser } = this.props;
    const { singleUser } = fetchOneUser;
    const { selectedGroups } = this.state;
    if (
      singleUser !== null &&
      singleUser.groups.length > 0 &&
      singleUser.groups[0] !== null &&
      selectedGroups.length === 0
    ) {
      const { groups } = singleUser;
      const userGroups = [];
      /* eslint-disable  array-callback-return */
      /* eslint-disable  no-underscore-dangle */
      groups.map((anOption) => {
        const arrayOfGroups = { value: anOption._id, label: anOption.name };
        userGroups.push(arrayOfGroups);
      });
      this.setState({ selectedGroups: userGroups, selectedOption: userGroups });
    }
  }

  onChange = (e) => {
    const { data } = this.state;
    this.setState({
      data: { ...data, [e.target.name]: e.target.value },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { data, selectedGroups } = this.state;
    const { editEmail, match } = this.props;
    const { params } = match;
    const { email } = params;
    const { newEmail } = data;
    const groups = [];
    /* eslint-disable  no-restricted-syntax */
    if (selectedGroups.length > 0) {
      for (const selected of selectedGroups) {
        if (selected.value !== undefined) {
          groups.push(selected.value);
        } else if (selected.value === undefined) {
          groups.push(selected);
        }
      }
    }

    // email working correctly
    if (newEmail && selectedGroups.length === 0) {
      editEmail({
        email,
        newEmail,
        groups: [],
      });
    }
    // groups working correctly
    else if (!newEmail && selectedGroups.length > 0) {
      editEmail({
        email,
        groups,
      });
    }
    // both not working
    else if (newEmail && selectedGroups.length > 0) {
      editEmail({
        email,
        newEmail,
        groups,
      });
    }
  };

  handleChange = (selectedOption) => {
    const selectedGroups = [];
    for (const groupOptions of selectedOption) {
      selectedGroups.push(groupOptions.value);
    }
    this.setState({
      selectedOption,
      selectedGroups,
    });
  };

  render() {
    const { match, userEdit, groups: allGroups } = this.props;
    const { isEditing, errors, user } = userEdit;
    const { selectedOption, email } = this.state;
    const options = [];
    const { groups } = allGroups;
    if (groups.length > 0) {
      mapGroupOptions(groups, options);
    }
    const { status, success } = this.state;
    return (
      <div className="ui container">
        {status && (
          <Message negative>
            <Message.Header> {errors.message} </Message.Header>
          </Message>
        )}
        {success && !status && (
          <Message positive>
            <Message.Header> {user.message} </Message.Header>
          </Message>
        )}
        <Form loading={isEditing}>
          <Form.Field>
            <label htmlFor="email" className="update-email-label">
              Email
            </label>
            <input
              type="email"
              name="oldEmail"
              className="update-form-fields"
              value={match.params.email}
              disabled
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="new email" className="update-email-label">
              New Email
            </label>
            <input
              type="email"
              name="newEmail"
              className="update-form-fields"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="update-email" className="groups-update">
              Group(s)
            </label>
            <Select
              className="update-form-fields"
              label="Select Group"
              placeholder="Select group"
              components={makeAnimated()}
              onChange={this.handleChange}
              options={options}
              value={selectedOption}
              isMulti
            />
          </Form.Field>
          <Button
            className={
              email ? 'save_user update-btn' : 'b update-btn btn_disabled'
            }
            type="submit"
            onClick={this.onSubmit}
          >
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

EditEmail.propTypes = {
  editEmail: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  userEdit: PropTypes.shape({
    isEditing: PropTypes.bool,
    errors: PropTypes.string,
    user: PropTypes.shape,
  }),
  fetchOneUser: PropTypes.shape({}),
  groups: PropTypes.shape({}),
  allGroups: PropTypes.shape({}),
  fetchedUser: PropTypes.shape({}),
};

export const mapStateToProps = ({ userEdit, groups, fetchOneUser }) => ({
  userEdit,
  groups,
  fetchOneUser,
});

const mapDispatchToProps = {
  editEmail: startEditing,
  allGroups: fetchingGroups,
  fetchedUser: fetchingOne,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEmail);
