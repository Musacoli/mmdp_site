import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DeleteDocument from '../../../components/Resources/Document/DeleteDocument';
import { startDelete } from '../../../store/actions/resources/document';

export class DeleteDoc extends Component {
  state = {};

  showDeleteModal = () =>
    this.setState({
      deleteModalOpen: true,
    });

  hideDeleteModal = () => this.setState({ deleteModalOpen: false });

  handleDelete = () => {
    const { deleteDoc, id } = this.props;
    deleteDoc(id);
    this.setState({ deleteModalOpen: false });
  };

  render() {
    const { deleteModalOpen } = this.state;
    const { loading, id, _id } = this.props;
    return (
      <React.Fragment>
        <DeleteDocument
          open={deleteModalOpen}
          closeModal={this.hideDeleteModal}
          handleDelete={this.handleDelete}
        />
        <Button
          onClick={() => this.showDeleteModal()}
          className="archive-doc delete-doc red"
          loading={id === _id && loading}
          disabled={id === _id && loading}
        >
          Delete
        </Button>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ deleteDoc }) => deleteDoc;

export const mapDispatchToProps = {
  deleteDoc: startDelete,
};
DeleteDoc.propTypes = {
  deleteDoc: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  id: PropTypes.string,
  _id: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDoc);
