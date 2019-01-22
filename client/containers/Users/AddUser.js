import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { startRegistration } from "../../store/actions/users/";
import { Button, Form, Segment, Message } from "semantic-ui-react";

class AddUser extends Component {
  state = {
    email: "",
    status: false,
    success: false,
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { registerUser } = this.props;
    registerUser({
      email: this.state.email
    });
  };

  componentWillReceiveProps(nextProps) {
    const { status, success } = nextProps;
    this.setState({ status, success});
    setTimeout(() => {
      this.setState({ status: false, success: false});
    }, 2000);
  }

  render() {
    const { isRegistering, errors, user } = this.props;
    const { status, success } = this.state;
    return (
      <div>
        <Segment>
          {status && <Message color='red'> {errors.message} </Message>}
          {success && <Message color='green'> {user.message} </Message>}
          <Form loading={isRegistering}>
            <Form.Group widths="equal">
              <div className="error">
                <Form.Input
                  label="Email address"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                />
              </div>
            </Form.Group>
            <Button
              className='b'
              type="submit"
              disabled={!this.state.email}
              onClick={this.onSubmit}
            >
              save user
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

AddUser.propTypes = {};

const mapStateToProps = ({ register }) => register;

const mapDispatchToProps = {
  registerUser: startRegistration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
