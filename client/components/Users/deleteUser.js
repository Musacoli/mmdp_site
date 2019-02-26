import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const DeleteUser = ({ closeModal, open, handleDelete }) => {
  return (
    <div>
      <Modal size="mini" open={open} onClose={closeModal} className="show">
        <Modal.Header>Delete user account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this account ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeModal}>
            No
          </Button>
          <Button positive onClick={handleDelete} className="cool-blue">
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export const DeleteAllUsers = ({ closeModal, open, deleteUsers }) => {
  return (
    <div>
      <Modal size="mini" open={open} onClose={closeModal} className="show">
        <Modal.Header>Delete user account</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete users?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeModal}>
            No
          </Button>
          <Button positive onClick={deleteUsers} className="cool-blue">
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

DeleteAllUsers.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  deleteUsers: PropTypes.func,
};

DeleteUser.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
  open: PropTypes.bool,
};
