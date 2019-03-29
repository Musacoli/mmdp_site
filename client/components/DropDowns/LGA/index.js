import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import LGAForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const LGAComponent = ({
  states,
  dropdowns,
  loading,
  handleChange,
  handleSubmit,
  addNewDropDown,
  handleDelete,
}) => (
  <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
    <Form>
      {dropdowns.map((item, index) => {
        const fields = [
          {
            type: 'text',
            name: 'lgaName',
            label: 'LGA name',
            className: 'animated fadeIn',
            fluid: true,
            placeholder: 'Enter LGA name',
            value: item.lgaName,
          },
          {
            type: 'select',
            name: 'stateId',
            label: 'State',
            className: '',
            fluid: true,
            placeholder: 'State',
            value: item.stateId,
            options: states,
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
          <LGAForm
            // eslint-disable-next-line
              key={index}
            item={item}
            inputs={fields}
            editAState={handleChange}
            deleteAState={handleDelete}
            states={false}
            header="Delete LGA"
            label="Confirm Delete LGA"
          />
        );
      })}
      <DropdownActions
        addDropdown={addNewDropDown}
        handleSubmit={handleSubmit}
      />
    </Form>
  </Grid.Row>
);

export default LGAComponent;
