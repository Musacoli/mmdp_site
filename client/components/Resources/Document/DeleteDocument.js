import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DeleteDocument = ({ closeModal, open, handleDelete }) => {
  return (
    <div>
      <Modal size="mini" open={open} onClose={closeModal} className="show">
        <Modal.Header>Delete this document</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this document ?</p>
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
};

DeleteDocument.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
  open: PropTypes.bool,
};

export default DeleteDocument;
