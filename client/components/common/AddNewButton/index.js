import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AddNewButton = ({ url, className, text }) => (
  <Link to={url}>
    <Button className={className} fluid>
      Add {text}
    </Button>
  </Link>
);

/* eslint-disable */
AddNewButton.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
/* eslint-enable */

export default AddNewButton;
