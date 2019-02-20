// Implements a simple dropdown containing filter options to be applied in the search
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Header } from 'semantic-ui-react';

const InlineDropDown = (props) => {
  const { options, headerText } = props;
  return (
    <Header as="h4">
      <Header.Content>
        <Dropdown
          inline
          fluid
          header={headerText}
          options={options}
          placeHolder="State"
          search
        />
      </Header.Content>
    </Header>
  );
};

InlineDropDown.propTypes = {
  options: PropTypes.instanceOf(Array),
  headerText: PropTypes.string.isRequired,
};

InlineDropDown.defaultProps = {
  options: [],
};
export default InlineDropDown;
