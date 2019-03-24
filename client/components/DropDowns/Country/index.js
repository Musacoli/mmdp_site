import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import CountryForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const Country = (props) => {
  const {
    dropdowns,
    addTempState,
    handleSubmit,
    twoFieldsClass,
    loading,
  } = props;
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          const inputs = [
            {
              type: 'text',
              name: 'countryName',
              label: 'Country name',
              className: 'animated fadeIn',
              fluid: true,
              placeholder: 'Enter country name',
              value: item.countryName || '',
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
            <CountryForm
              // eslint-disable-next-line
              key={index}
              item={item}
              inputs={inputs || []}
              editAState={props.editAStatus}
              deleteAState={props.deleteAStatus}
              className={twoFieldsClass}
              header="Delete Country"
              label="Confirm Delete Country"
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

export default Country;
