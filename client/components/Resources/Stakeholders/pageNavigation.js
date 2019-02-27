import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const Button = ({ classes, onClick, text }) => (
  <button type="button" className={classes} onClick={onClick}>
    {text}
  </button>
);

export const PageNavigation = ({
  handleNext,
  handlePrev,
  handleAddNewBeneficiary,
  handleSubmit,
  pages,
  step,
}) => (
  <Grid.Row columns={3}>
    <Grid.Column width={6}>
      {pages === step ? (
        <Button onClick={handlePrev} classes="btn-black" text="Back" />
      ) : (
        <Button onClick={handlePrev} classes="btn-save" text="Back" />
      )}
    </Grid.Column>
    <Grid.Column width={6}>
      {pages === step ? (
        <Button
          onClick={handleAddNewBeneficiary}
          classes="btn-add-new"
          text="Add New Beneficiary Service"
        />
      ) : (
        <div />
      )}
    </Grid.Column>
    <Grid.Column width={4}>
      {pages === step ? (
        <Button onClick={handleSubmit} classes="btn-save" text="Save" />
      ) : (
        <Button onClick={handleNext} classes="btn-save" text="Next" />
      )}
    </Grid.Column>
  </Grid.Row>
);

PageNavigation.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleAddNewBeneficiary: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};

export default PageNavigation;
