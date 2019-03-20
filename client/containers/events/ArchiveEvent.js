import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { archiveEvent } from '../../store/actions/events/event';

export class ArchiveEvent extends Component {
  handleArchive = () => {
    const { archiveE, id } = this.props;
    archiveE(id);
  };

  render() {
    const { archived, _id, id } = this.props;
    const activeCard = _id === id;
    return (
      <button
        type="button"
        className="footer-btn txt-blue"
        onClick={this.handleArchive}
        disabled={activeCard}
      >
        {archived ? 'Unarchive' : 'Archive'}
      </button>
    );
  }
}

export const mapStateToProps = ({ archive }) => archive;

export const mapDispatchToProps = {
  archiveE: archiveEvent,
};

ArchiveEvent.propTypes = {
  archiveE: PropTypes.func.isRequired,
  archived: PropTypes.bool,
  id: PropTypes.string,
  _id: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArchiveEvent);
