import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

export const NextButton = ({ text, handleNext }) => (
  <div className="row">
    <Button
      type="button"
      className="btn-save right floated"
      onClick={handleNext}
    >
      {text}
    </Button>
  </div>
);

NextButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleNext: PropTypes.func.isRequired,
};
