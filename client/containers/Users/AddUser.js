import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { startRegistration } from '../../store/sagas/users';

export class AddUser extends Component {
  state = {
    email: '',
    status: false,
    success: false,
  };

  componentWillReceiveProps(nextProps) {
    const { status, success } = nextProps;
    this.setState({ status, success });
    setTimeout(() => {
      this.setState({ status: false, success: false });
    }, 2000);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { registerUser } = this.props;
    const { email } = this.state;
    registerUser({
      email,
    });
  };

  render() {
    const { isRegistering, errors, user } = this.props;
    const { status, success, email } = this.state;
    return (
      <div className="container">
        {status && <Message className="negative"> {errors.message} </Message>}
        {success && <Message className="positive"> {user.message} </Message>}
        <Form loading={isRegistering}>
          <Form.Group>
            <Form.Input
              className="add-user-email"
              placeholder="please enter a valid email"
              label="Email address"
              type="email"
              name="email"
              onChange={this.onChange}
            />
            <Form.Button
              className="add-user-submit"
              type="submit"
              disabled={!email}
              onClick={this.onSubmit}
            >
              save user
            </Form.Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

AddUser.propTypes = {
  registerUser: PropTypes.func,
  status: PropTypes.bool,
  success: PropTypes.bool,
  isRegistering: PropTypes.bool,
  errors: PropTypes.shape(),
  user: PropTypes.shape(),
};

export const mapStateToProps = ({ register }) => register;

export const mapDispatchToProps = {
  registerUser: startRegistration,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
