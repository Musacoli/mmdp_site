import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BlueCard = ({ title, meta, actionLinks }) => {
  return (
    <div className="blue-card">
      <div className="blue-card__header">{title}</div>
      <div className="blue-card__meta">{meta}</div>
      <div className="blue-card__action">
        {actionLinks.map(({ link = '#', text, type, onClick }, index) => {
          return (
            <div
              key={index.toString()}
              className={classNames('blue-card__action-link', {
                'blue-card__action-link--danger': type === 'danger',
              })}
            >
              <Link onClick={onClick} to={link}>
                {text}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BlueCard.defaultProps = {
  actionLinks: [{}],
};

BlueCard.propTypes = {
  title: PropTypes.string.isRequired,
  meta: PropTypes.string,
  actionLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default BlueCard;
