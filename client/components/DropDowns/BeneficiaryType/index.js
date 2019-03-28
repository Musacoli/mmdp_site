import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import BeneficiaryTypeForm from '../../common/Form/DropdownForm/index';
import DropdownActions from '../../common/Button/DropdownActions';

const BeneficiaryType = ({
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
            name: 'beneficiaryTypeName',
            label: 'Beneficiary Type',
            className: 'animated fadeIn',
            fluid: true,
            placeholder: 'Enter Beneficiary name',
            value: item.beneficiaryTypeName,
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
          <BeneficiaryTypeForm
            // eslint-disable-next-line
            key={index}
            item={item}
            inputs={fields}
            editAState={handleChange}
            deleteAState={handleDelete}
            states={false}
            header="Delete Beneficiary Type"
            label="Confirm Delete Beneficiary Type"
            className="two-fields"
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

export default BeneficiaryType;
