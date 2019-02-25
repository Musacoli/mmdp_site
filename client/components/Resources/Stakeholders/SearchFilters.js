import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import DropdownSearchQuery from '../../../containers/Resources/StakeHolders/DropDownSearch';

const SearchFiltersRow = (props) => {
  const { states, LGAs, filterByState, filterByLGA } = props;
  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column width={5}>
          <DropdownSearchQuery
            isSecondary={false}
            options={states}
            placeHolder="State"
            filterByState={filterByState}
            filterByLGA={filterByLGA}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <DropdownSearchQuery
            isSecondary
            options={LGAs}
            placeHolder="Local Government"
            filterByState={filterByState}
            filterByLGA={filterByLGA}
          />
        </Grid.Column>
        <Grid.Column width={5} />
      </Grid.Row>
    </Grid>
  );
};

SearchFiltersRow.propTypes = {
  states: PropTypes.instanceOf(Array),
  LGAs: PropTypes.instanceOf(Array),
  filterByState: PropTypes.func.isRequired,
  filterByLGA: PropTypes.func.isRequired,
};

export default SearchFiltersRow;
