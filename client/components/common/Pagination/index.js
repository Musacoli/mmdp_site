import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const preventDefault = (event) => {
  event.preventDefault();
};

const Pagination = ({ currentPage, totalPages }) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const noPrevPage = prevPage === 0;
  const noNextPage = nextPage > totalPages;
  const prevLink = noPrevPage ? '#' : `?page=${prevPage}`;
  const nextLink = noNextPage ? '#' : `?page=${nextPage}`;
  return (
    <div className="pagination-area">
      <div className="pagination-area__content">
        <div className="pagination-area__item">Page</div>
        <div className="pagination-area__item">
          <div className="pagination-area__navigator">{currentPage}</div>
        </div>
        <div className="pagination-area__item">of {totalPages}</div>
        <div className="pagination-area__item">
          <Link
            className={classNames('pagination-area__navigator', {
              'pagination-area__link--inactive': noPrevPage,
            })}
            to={prevLink}
            onClick={noPrevPage ? preventDefault : undefined}
          >
            <Icon className="pagination-area__arrow chevron left" />
          </Link>
        </div>
        <div className="pagination-area__item">
          <Link
            className={classNames('pagination-area__navigator', {
              'pagination-area__link--inactive': noNextPage,
            })}
            to={nextLink}
            onClick={noNextPage ? preventDefault : undefined}
          >
            <Icon className="pagination-area__arrow chevron right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
