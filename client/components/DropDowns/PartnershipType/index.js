import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import PartnershipTypeForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const State = (props) => {
  const { dropdowns, addTempState, handleSubmit, loading, countries } = props;
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          const inputs = [
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
            <PartnershipTypeForm
              // eslint-disable-next-line
              key={index}              
              item={item}
              inputs={inputs}
              {...props}
              countries={false}
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
