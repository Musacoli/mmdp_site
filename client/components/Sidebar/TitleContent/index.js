import React from 'react';
import PropTypes from 'prop-types';

const TitleContent = ({ items, title, active, onClick }) => (
  <React.Fragment>
    <div
      className={active ? 'title item active' : 'title item'}
      role="presentation"
      onClick={onClick}
    >
      {title}
      {items.length > 0 && <i className="dropdown icon" />}
    </div>
    <div className={active ? 'content show' : 'content'}>
      {items.map((item) => (
        <a
          className="dropdown__item item"
          key={item.path + title}
          href={item.path}
        >
          {item.name}
        </a>
      ))}
    </div>
  </React.Fragment>
);

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
