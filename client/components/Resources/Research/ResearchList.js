import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Details from './ResearchDetails';

export const ResearchList = ({ results }) => {
  const researchResults = results.results;
  let researchDetails;
  if (researchResults) {
    researchDetails = researchResults.map((x) => {
      return (
        <Details
          title={x.title}
          key={x._id}
          _id={x._id}
          Archived={x.Archived}
        />
      );
    });
  }
  return (
    <div>
      <Grid className="Research__list">{researchDetails}</Grid>
    </div>
  );
};

export default ResearchList;

ResearchList.propTypes = {
  // results: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  results: PropTypes.shape({}).isRequired,
};
