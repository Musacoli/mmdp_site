import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';

const trigger = (triggerText, className, toggleModal) => {
  return (
    <span
      role="presentation"
      className={className}
      onClick={() => toggleModal()}
    >
      {triggerText}
    </span>
  );
};
class ActionModal extends Component {
  state = { open: false };

  toggleModal = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  delete = (group) => {
    const { confirmDeleteGroup } = this.props;
    this.toggleModal();
    confirmDeleteGroup(group);
  };

  render() {
    const { triggerText, header, content, group, className } = this.props;
    const { open } = this.state;
    return (
      <Modal
        open={open}
        size="mini"
        trigger={trigger(triggerText, className, this.toggleModal)}
        className="show"
      >
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          <p>{content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="actionModal-no-button"
            negative
            onClick={() => this.toggleModal()}
          >
            No
          </Button>
          <Button
            className="cool-blue"
            id="actionModal-yes-button"
            onClick={() => this.delete(group)}
            icon="checkmark"
            labelPosition="right"
            content="Yes"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

ActionModal.propTypes = {
  triggerText: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  confirmDeleteGroup: PropTypes.func,
  group: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.instanceOf(Object),
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

ActionModal.defaultProps = {
  group: {},
  confirmDeleteGroup: () => {},
  triggerText: 'Open Modal',
  className: '',
};

export default ActionModal;
