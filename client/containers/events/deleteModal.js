import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { deleteEvent } from '../../store/actions/events/event';
import { store } from '../../store/index';

export class ConfirmationModal extends Component {
  state = { open: false };

  toggleModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  handleDelete = (_id) => {
    store.dispatch(deleteEvent(_id));
    this.toggleModal();
  };

  render() {
    const { triggerText, content, _id } = this.props;
    const { open } = this.state;

    return (
      <Modal
        open={open}
        size="mini"
        trigger={
          <span
            role="presentation"
            onClick={() => this.toggleModal()}
            className="footer-btn txt-red"
          >
            {triggerText}
          </span>
        }
        className="show"
      >
        <Modal.Content>
          <p>{content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="ConfirmationModal-no-button"
            negative
            onClick={() => this.toggleModal()}
          >
            No
          </Button>
          <Button
            className="cool-blue"
            id="ConfirmationModal-yes-button"
            onClick={() => this.handleDelete(_id)}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

ConfirmationModal.propTypes = {
  triggerText: PropTypes.string,
  content: PropTypes.string.isRequired,
  _id: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  _id: null,
};

export default connect()(ConfirmationModal);
