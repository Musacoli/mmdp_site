import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import emptybox from './img/empty-box@3x.png';

const EmptyView = ({ errorMessage, errorDescription, path, pathLabel }) => (
  <div>
    <div className="events-container empty-view">
      <img
        className="image-empty"
        src={emptybox}
        alt="Box"
        title="Empty"
        id="empty_box_img"
      />
      <h1>{errorMessage}</h1>
      <p>{errorDescription}</p>
      <br />
      <Link to={path}>
        <button className="btn-add cool-blue big" type="button">
          {pathLabel}
        </button>
      </Link>
    </div>
  </div>
);

EmptyView.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorDescription: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  pathLabel: PropTypes.string.isRequired,
};

export default EmptyView;
