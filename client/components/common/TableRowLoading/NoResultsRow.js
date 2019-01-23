import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const NoResultsRow = ({ colSpan }) => (
  <Table.Footer fullWidth>
    <Table.Row>
      <Table.HeaderCell colSpan={colSpan} className="center aligned">
        <Header as="h4">No results found</Header>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);

NoResultsRow.propTypes = {
  colSpan: PropTypes.number,
};

NoResultsRow.defaultProps = {
  colSpan: 4,
};
export default NoResultsRow;
