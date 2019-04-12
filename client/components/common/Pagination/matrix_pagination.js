import React from 'react';
import { Icon } from 'semantic-ui-react';
import '../../../assets/styles/components/_pagination.scss';
import '../../../assets/styles/components/_matrix_pagination.scss';
import PropTypes from 'prop-types';

const getButtonStyles = (active) => {
  return `pg-btn ${active ? 'icon-active' : 'icon-inactive disabled'}`;
};

const Pagination = ({ data, handlePageChange, className }) => {
  const { total, currentPage, totalPages, previous, next } = data;
  return total ? (
    <React.Fragment>
      <div className={`ui grid middle aligned app-pagination ${className}`}>
        <div className="page-number-entries">10</div>
        <div className="page-angle-icon">
          <Icon name="angle down" />
        </div>
        <div className="Entries-per-page">Entries Per Page</div>
        <span className="pg-text">Page</span>
        <div className="page-number">{currentPage}</div>
        <span className="pg-text">of &nbsp;{totalPages}</span>
        <div className="pg-buttons">
          <button
            type="button"
            className={getButtonStyles(previous)}
            onClick={() => handlePageChange(previous)}
          >
            <Icon className="angle left" />
          </button>
          <button
            type="button"
            className={getButtonStyles(next)}
            onClick={() => handlePageChange(next)}
          >
            <Icon className="angle right" />
          </button>
        </div>
      </div>
    </React.Fragment>
  ) : (
    ''
  );
};

Pagination.propTypes = {
  data: PropTypes.shape({}).isRequired,
  handlePageChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Pagination;
