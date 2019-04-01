import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import StaffStrengthForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const data = (props) => {
  const { dropdowns, handleChange, deleteAStaffStrength } = props;
  return dropdowns.map((item, index) => {
    const inputs = [
      {
        type: 'text',
        name: 'staffStrength',
        label: 'Staff Strength',
        className: 'animated fadeIn',
        fluid: true,
        placeholder: 'Enter staff strength range',
        value: item.staffStrength,
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
      <StaffStrengthForm
        // eslint-disable-next-line
          key={index}
        item={item}
        inputs={inputs}
        editAState={handleChange}
        deleteAState={deleteAStaffStrength}
        header="Delete a Range"
        label="Confirm to delete Range"
        className="two-fields"
      />
    );
  });
};

const StaffStrength = (props) => {
  const { addNewDropdown, handleSubmit, loading } = props;
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {data(props)}
        <DropdownActions
          addDropdown={addNewDropdown}
          handleSubmit={handleSubmit}
        />
      </Form>
    </Grid.Row>
  );
};

export default StaffStrength;
