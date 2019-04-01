import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import PartnershipTypeForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const State = (props) => {
  const { dropdowns, addTempState, handleSubmit, loading } = props;
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          const inputs = [
            {
              type: 'text',
              name: 'partnershipTypeName',
              label: 'Partnership type name',
              className: 'animated fadeIn',
              fluid: true,
              placeholder: 'Enter partnership type name',
              value: item.partnershipTypeName || '',
            },
            {
              type: 'text',
              name: 'description',
              label: 'Description',
              className: 'animated fadeIn',
              fluid: true,
              placeholder: 'description',
              value: item.description || '',
            },
          ];
          return (
            <PartnershipTypeForm
              // eslint-disable-next-line
              key={index}
              item={item}
              inputs={inputs}
              {...props}
              countries={false}
              header="Delete Partnership Type"
              label="Confirm Delete a Partnership Type"
              className="two-fields"
            />
          );
        })}
        <DropdownActions
          addDropdown={addTempState}
          handleSubmit={handleSubmit}
        />
      </Form>
    </Grid.Row>
  );
};

export default State;
