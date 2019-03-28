import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import OrganizationTypeForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const OrganizationType = (props) => {
  const {
    dropdowns,
    addNewDropdown,
    handleSubmit,
    handleChange,
    deleteOrganizationType,
    loading,
  } = props;
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          const inputs = [
            {
              type: 'text',
              name: 'typeName',
              label: 'Organization Type',
              className: 'animated fadeIn',
              fluid: true,
              placeholder: 'Enter organization type name',
              value: item.typeName,
            },
            {
              type: 'text',
              name: 'description',
              label: 'Description',
              className: 'animated fadeIn',
              fluid: true,
              placeholder: 'description',
              value: item.description,
            },
          ];
          return (
            <OrganizationTypeForm
              // eslint-disable-next-line
              key={index}
              item={item}
              inputs={inputs}
              editAState={handleChange}
              deleteAState={deleteOrganizationType}
              header="Delete Organization Type"
              label="Confirm Delete Organization Type"
              className="two-fields"
            />
          );
        })}
        <DropdownActions
          addDropdown={addNewDropdown}
          handleSubmit={handleSubmit}
        />
      </Form>
    </Grid.Row>
  );
};

export default OrganizationType;
