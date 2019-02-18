import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

const ConfirmModal = ({ isOpen, handleModalToggle, onConfirm, modalInfo }) => {
  return (
    <Modal size="mini" open={isOpen} onClose={handleModalToggle}>
      <Modal.Header>{modalInfo.header}</Modal.Header>
      <Modal.Content>
        <p>{modalInfo.content}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleModalToggle} negative>
          No
        </Button>
        <Button
          className="confirm-modal__positive"
          icon="checkmark"
          labelPosition="right"
          content="Yes"
          onClick={onConfirm}
        />
      </Modal.Actions>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  modalInfo: {
    header: 'Are you sure?',
    content: 'Are you sure you want to perform this action',
  },
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleModalToggle: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  modalInfo: PropTypes.shape({
    header: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default ConfirmModal;
