import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BlueCard = ({ title, archived, meta, onArchive, onDelete, editLink }) => {
  const link = '#';
  return (
    <div className="blue-card">
      <div className="blue-card__header">{title}</div>
      <div className="blue-card__meta">{meta}</div>
      <div className="blue-card__action">
        <div className="blue-card__action-link">
          <Link to={editLink}>Edit</Link>
        </div>
        <div className="blue-card__action-link">
          {archived !== undefined ? (
            <Link onClick={onArchive} to={link}>
              {archived ? 'Unarchive' : 'Archive'}
            </Link>
          ) : null}
        </div>
        <div className="blue-card__action-link blue-card__action-link--danger">
          <Link onClick={onDelete} to={link}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
};

BlueCard.propTypes = {
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  editLink: PropTypes.string.isRequired,
  meta: PropTypes.string,
  archived: PropTypes.bool,
};

export default BlueCard;
