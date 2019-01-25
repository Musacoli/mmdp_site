import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { startEditing } from "../../store/actions/users/";
import { Button, Form, Message } from "semantic-ui-react";

class EditEmail extends Component {
  state = {
    data: {
      oldEmail: "",
      newEmail: ""
    },
    status: false,
    success: false
  };

  onChange = e => {
    const { data } = this.state;
    this.setState({
      data: { ...data, [e.target.name]: e.target.value }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const { editEmail } = this.props;
    const { oldEmail } = data;
    const { newEmail } = data;
    editEmail({ oldEmail: oldEmail, newEmail: newEmail });
  };

  componentWillReceiveProps(nextProps) {
    const { status, success } = nextProps;
    this.setState({ status, success });
    setTimeout(() => {
      this.setState({ status: false, success: false });
    }, 2000);
  }

  render() {
    const { isEditing, errors, user } = this.props;
    const { status, success } = this.state;
    return (
      <div className="ui container">
        <h2>Edit User Email</h2>
        {status && (
          <Message negative>
            <Message.Header> {errors.message} </Message.Header>
          </Message>
        )}
        {success && (
            <Message positive>
              <Message.Header> {user.message} </Message.Header>
            </Message>
          )}
        <Form loading={isEditing}>
          <Form.Field>
            <label>Old Email</label>
            <input type="email" name="oldEmail" onChange={this.onChange} />
          </Form.Field>
          <Form.Field>
            <label>New Email</label>
            <input type="email" name="newEmail" onChange={this.onChange} />
          </Form.Field>
          <Button
            className={this.state.email ? "save_user" : "b btn_disabled"}
            type="submit"
            disabled={!this.state.data.oldEmail && !this.state.data.newEmail}
            onClick={this.onSubmit}
          >
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

EditEmail.propTypes = {};

const mapStateToProps = ({ userEdit }) => userEdit;

const mapDispatchToProps = {
  editEmail: startEditing
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmail);
