import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { startEditing } from '../../store/sagas/users';

export class EditEmail extends Component {
  state = {
    data: {
      newEmail: '',
    },
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

  onChange = (e) => {
    const { data } = this.state;
    this.setState({
      data: { ...data, [e.target.name]: e.target.value },
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const { editEmail } = this.props;
    /* eslint-disable react/destructuring-assignment */
    const oldEmail = this.props.match.params.email;
    const { newEmail } = data;
    editEmail({ oldEmail, newEmail });
  };

  render() {
    const { isEditing, errors, user } = this.props;
    const { status, success } = this.state;
    return (
      <div className="ui container">
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
            <label htmlFor="old email">Old Email</label>
            <input
              type="email"
              name="oldEmail"
              value={this.props.match.params.email}
              disabled
              onChange={this.onChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="new email">New Email</label>
            <input type="email" name="newEmail" onChange={this.onChange} />
          </Form.Field>
          <Button
            className={this.state.email ? 'save_user' : 'b btn_disabled'}
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

EditEmail.propTypes = {
  editEmail: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  status: PropTypes.bool,
  success: PropTypes.bool,
  isEditing: PropTypes.bool,
  errors: PropTypes.shape(),
  user: PropTypes.shape(),
};

export const mapStateToProps = ({ userEdit }) => userEdit;

const mapDispatchToProps = {
  editEmail: startEditing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEmail);
