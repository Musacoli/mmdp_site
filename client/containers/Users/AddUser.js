import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import PropTypes from 'prop-types';
import mapGroupOptions from '../../utils/mapGroups';
import { fetchingGroups } from '../../store/actions/groups';
import { startRegistration } from '../../store/sagas/users';

export class AddUser extends Component {
  state = {
    email: '',
    selectedOption: null,
    selectedGroups: null,
  };

  componentWillMount() {
    const { allGroups } = this.props;
    allGroups();
  }

  componentDidUpdate() {
    const {
      register: { success },
      history,
    } = this.props;
    success && history.push('/users/all');
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
    const { register, groups: allGroups } = this.props;
    const { isRegistering } = register;
    const options = [];
    const { groups } = allGroups;
    if (groups.length > 0) {
      mapGroupOptions(groups, options);
    }
    const { selectedOption, email } = this.state;
    return (
      <div className="container">
        <Form loading={isRegistering} className="reduce-width">
          <Form.Field>
            <label htmlFor="email">Email address</label>
            <input
              className="add-user-email selectGroup update-form-fields"
              placeholder="Please enter a valid email"
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
            disabled={!email}
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
