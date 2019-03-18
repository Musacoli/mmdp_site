import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import StateForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const State = (props) => {
  const { dropdowns, addTempState, handleSubmit, loading, countries } = props;
  let inputs = [];
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          inputs = [
            {
              type: 'text',
              name: 'stateName',
              label: 'State name',
              className: 'animated fadeIn',
              fluid: true,
              placeholder: 'Enter state name',
              value: item.stateName,
            },
            {
              type: 'select',
              name: 'countryId',
              label: 'Country',
              className: '',
              fluid: true,
              placeholder: 'Country',
              value: item.countryId,
              options: countries,
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
            <StateForm
              // eslint-disable-next-line
              key={index}              
              item={item}
              inputs={inputs || []}
              {...props}
              countries={false}
              header="Delete State"
              label="Confirm Delete a state"
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
