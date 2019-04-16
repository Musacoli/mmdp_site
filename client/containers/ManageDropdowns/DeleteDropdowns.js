import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DeleteDropdown from '../../components/ManageDropdowns/DeleteDropdown';
import { deleteDropdowns } from '../../store/actions/manageDropdowns/dropdowns';

export class DeleteDropdowns extends Component {
  state = {};

  showDeleteModal = () =>
    this.setState({
      deleteModalOpen: true,
    });

  hideDeleteModal = () => this.setState({ deleteModalOpen: false });

  handleDelete = () => {
    const { deleteD, id } = this.props;
    deleteD(id);
    this.setState({ deleteModalOpen: false });
  };

  render() {
    const { deleteModalOpen } = this.state;
    const { loading, id, _id } = this.props;

    const activeCard = _id === id;
    return (
      <React.Fragment>
        <DeleteDropdown
          open={deleteModalOpen}
          closeModal={this.hideDeleteModal}
          handleDelete={this.handleDelete}
        />
        <Button
          onClick={() => this.showDeleteModal()}
          className="archive-doc delete-doc red"
          loading={activeCard && loading}
          disabled={activeCard && loading}
        >
          Delete
        </Button>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ deleteD }) => deleteD;

export const mapDispatchToProps = {
  deleteD: deleteDropdowns,
};
DeleteDropdown.propTypes = {
  deleteD: PropTypes.func,
  loading: PropTypes.bool,
  _id: PropTypes.string,
  id: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDropdowns);
