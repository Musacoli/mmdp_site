import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TitleContent = ({ items, title, active, onClick }) => {
  let menuItemSelected = false;
  items.filter((item) => {
    if (item.path === window.location.pathname) {
      menuItemSelected = true;
    }
    return true;
  });
  return (
    <React.Fragment>
      <div
        className={
          active
            ? `title item active ${menuItemSelected ? 'remove_highlight' : ''}`
            : 'title item'
        }
        role="presentation"
        onClick={onClick}
      >
        {title}
        {items.length > 0 && <i className="dropdown icon" />}
      </div>
      <div className={active ? 'content show' : 'content'}>
        {items.map((item) => (
          <Link
            className={`dropdown__item item ${
              item.path === window.location.pathname ? 'title active' : ''
            }`}
            key={item.path + title}
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};

TitleContent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TitleContent;
