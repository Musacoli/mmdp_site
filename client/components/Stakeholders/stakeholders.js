import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const StakeholdersList = () => {
  return (
    <React.Fragment>
      <div className="ui grid stakeholder-container">
        <Input
          placeholder="Search stakeholder directory"
          className="search-box"
        />
        <Button className="btn-search cool-blue small">Search</Button>
        <Link to="/stakeholder-directory/add-basic-information">
          <Button className="btn-add ugly-blue small">Add stakeholder</Button>
        </Link>
        <br />
        <br />
      </div>
    </React.Fragment>
  );
};

export default StakeholdersList;
