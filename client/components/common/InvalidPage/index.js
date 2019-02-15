import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import emptybox from './img/empty-box@3x.png';

const EmptyView = ({ errorMessage, errrorDescription, path, pathLabel }) => (
  <div>
    <div className="empty-view">
      <img
        className="image-empty"
        src={emptybox}
        alt="Box"
        title="Empty"
        id="empty_box_img"
      />
      <h1>{errorMessage}</h1>
      <p>{errrorDescription}</p>
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
  errrorDescription: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  pathLabel: PropTypes.string.isRequired,
};

export default EmptyView;
