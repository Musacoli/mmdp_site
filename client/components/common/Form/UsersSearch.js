import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import makeAnimated from 'react-select/lib/animated';
import Select from 'react-select';

const UsersSearch = ({
  handleChange,
  selectedOption,
  options,
  handleSearch,
  handleSearchChange,
}) => {
  return (
    <div>
      <form className="group-select">
        <Input
          placeholder="Search "
          className="search-box user-search"
          onChange={handleSearchChange}
        />
        <Select
          className="userGroup"
          label="Select Groups"
          placeholder="All groups"
          components={makeAnimated()}
          onChange={handleChange}
          value={selectedOption}
          hideSelectedOptions={false}
          options={options}
          isClearable
        />
        <Button className="btn-search cool-blue small" onClick={handleSearch}>
          Search
        </Button>
      </form>
    </div>
  );
};

UsersSearch.propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  selectedOption: PropTypes.shape(),
  handleChange: PropTypes.func.isRequired,
};

export default UsersSearch;
