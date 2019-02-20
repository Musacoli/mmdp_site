import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import DropdownSearchQuery from '../../../containers/Resources/StakeHolders/DropDownSearch';

const SearchFiltersRow = (props) => {
  const { states, LGAs } = props;
  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column width={5}>
          <DropdownSearchQuery
            isSecondary={false}
            options={states}
            placeHolder="State"
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <DropdownSearchQuery
            isSecondary
            options={LGAs}
            placeHolder="Local Government"
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
};

export default SearchFiltersRow;
