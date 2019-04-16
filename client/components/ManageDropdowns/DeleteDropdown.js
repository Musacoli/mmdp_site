import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DeleteDropdown = ({ closeModal, open, handleDelete }) => (
  <div>
    <Modal size="mini" open={open} onClose={closeModal} className="show">
      <Modal.Header>Delete this dropdown entries</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this dropdown entries?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={closeModal} content="No" />
        <Button
          className="cool-blue"
          icon="checkmark"
          labelPosition="right"
          content="Yes"
          onClick={handleDelete}
        />
      </Modal.Actions>
    </Modal>
  </div>
);

DeleteDropdown.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
  open: PropTypes.bool,
};

export default DeleteDropdown;
