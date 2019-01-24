import React, { Component } from "react";
import { connect } from "react-redux";
import { startRegistration } from "../../store/actions/users/";
import { Button, Form, Segment, Message } from "semantic-ui-react";

class AddUser extends Component {
  state = {
    email: "",
    status: false,
    success: false
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
    this.setState({ status, success });
    setTimeout(() => {
      this.setState({ status: false, success: false });
    }, 2000);
  }

  render() {
    const { isRegistering, errors, user } = this.props;
    const { status, success } = this.state;
    return (
      <div className="conatiner">
          {status && <Message className='negative'> {errors.message} </Message>}
          {success && <Message className='positive'> {user.message} </Message> && <Riderect to={'all'}></Riderect>}

          <Form>
            <Form.Group>
              <Form.Input
                className='w'
                placeholder="please enter a valid email"
                label="Email address"
                type="email"
                name="email"
                onChange={this.onChange}
              />
              <Form.Button
                className='b'
                type="submit"
                disabled={!this.state.email}
                onClick={this.onSubmit}
              >save user
              </Form.Button>
            </Form.Group>
          </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ register }) => register;

const mapDispatchToProps = {
  registerUser: startRegistration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
