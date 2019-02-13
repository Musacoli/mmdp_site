import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import PropTypes from 'prop-types';
import groupOptions from '../../utils/mapGroups';
import { fetchingGroups } from '../../store/actions/groups';
import { startRegistration } from '../../store/sagas/users';

export class AddUser extends Component {
  state = {
    email: '',
    status: false,
    success: false,
    selectedOption: null,
    selectedGroups: null,
  };

  componentWillMount() {
    const { allGroups } = this.props;
    allGroups();
  }

  componentWillReceiveProps(nextProps) {
    const { status, success } = nextProps.register;
    this.setState({ status, success });
    setTimeout(() => {
      this.setState({ status: false, success: false });
      if (success) {
        nextProps.history.push('/users/all');
      }
    }, 2000);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { registerUser } = this.props;
    const { email, selectedGroups } = this.state;
    registerUser({
      email,
      groups: selectedGroups,
    });
  };

  handleChange = (selectedOption) => {
    const selectedGroups = [];
    /* eslint-disable no-restricted-syntax */
    for (const groups of selectedOption) {
      selectedGroups.push(groups.value);
    }
    this.setState({
      selectedOption,
      selectedGroups,
    });
  };

  render() {
    const { register } = this.props;
    const { isRegistering } = register;
    const { errors } = register;
    const { user } = register;
    const options = [];
    /* eslint-disable react/destructuring-assignment */
    /* eslint-disable prefer-destructuring */
    const groups = this.props.groups.groups;
    if (groups.length > 0) {
      groupOptions(groups, options);
    }
    const { status, success } = this.state;
    const { selectedOption } = this.state;
    return (
      <div className="container">
        {status && <Message className="negative"> {errors.message} </Message>}
        {success && !status && (
          <Message className="positive"> {user.message} </Message>
        )}

        <Form loading={isRegistering}>
          <Form.Field>
            <label htmlFor="email">Email address</label>
            <input
              className="add-user-email selectGroup update-form-fields"
              placeholder="please enter a valid email"
              label="Email address"
              type="email"
              name="email"
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <Select
              className="userGroup"
              label="Select Group"
              placeholder="Select group"
              components={makeAnimated()}
              onChange={this.handleChange}
              value={selectedOption}
              options={options}
              isMulti
            />
          </Form.Field>
          <Form.Button
            className="add-user-submit save-user registration-submit"
            type="submit"
            disabled={!this.state.email}
            onClick={this.onSubmit}
          >
            save user
          </Form.Button>
        </Form>
      </div>
    );
  }
}

AddUser.propTypes = {
  registerUser: PropTypes.func,
  register: PropTypes.func,
  groups: PropTypes.shape(),
  allGroups: PropTypes.shape({}),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = ({ register, groups }) => ({
  register,
  groups,
});

export const mapDispatchToProps = {
  registerUser: startRegistration,
  allGroups: fetchingGroups,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
