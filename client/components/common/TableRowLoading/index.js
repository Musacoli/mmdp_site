import React from "react";
import { Table, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const TableLoading = ({ colSpan }) => (
  <Table.Footer fullWidth>
    <Table.Row>
      <Table.HeaderCell colSpan={colSpan} className="center aligned">
        <Icon name="spinner" loading size="big" />
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);

TableLoading.propTypes = {
  colSpan: PropTypes.number
};

TableLoading.defaultProps = {
  colSpan: 4
};
export default TableLoading;
