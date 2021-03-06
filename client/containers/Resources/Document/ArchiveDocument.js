import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { archiveDoc } from '../../../store/actions/resources/document';

export class ArchiveDocument extends Component {
  handleArchive = () => {
    const { archive, id } = this.props;
    archive(id);
  };

  render() {
    const { loading, archived, _id, id } = this.props;
    const activeCard = _id === id;
    return (
      <Button
        onClick={this.handleArchive}
        className="archive-doc"
        loading={activeCard && loading}
        disabled={activeCard && loading}
      >
        {archived ? 'Unarchive' : 'Archive'}
      </Button>
    );
  }
}

export const mapStateToProps = ({ archive }) => archive;

export const mapDispatchToProps = {
  archive: archiveDoc,
};

ArchiveDocument.propTypes = {
  archive: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  archived: PropTypes.bool,
  id: PropTypes.string,
  _id: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArchiveDocument);
