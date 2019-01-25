import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal,
} from 'semantic-ui-react';

class ActionModal extends Component {
    state = { open: false }

    toggleModal = () => {
      const { open } = this.state;
      this.setState({ open: !open });
    }

    delete = (group) => {
      const { confirmDeleteGroup } = this.props;
      this.toggleModal();
      confirmDeleteGroup(group);
    }

    render() {
      const {
        triggerText, header, content, group,
      } = this.props;
      const { open } = this.state;
      return (
        <Modal open={open} size="mini" trigger={<span role="presentation" onClick={() => this.toggleModal()}>{triggerText}</span>} className="show">
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <p>{content}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button id="actionModal-no-button" negative onClick={() => this.toggleModal()}>No</Button>
            <Button className="cool-blue" id="actionModal-yes-button" onClick={() => this.delete(group)} positive icon="checkmark" labelPosition="right" content="Yes" />
          </Modal.Actions>
        </Modal>
      );
    }
}

ActionModal.propTypes = {
  triggerText: PropTypes.string,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  confirmDeleteGroup: PropTypes.func,
  group: PropTypes.shape({}),
};

ActionModal.defaultProps = {
  group: {},
  confirmDeleteGroup: () => {},
  triggerText: 'Open Modal',
};

export default ActionModal;
