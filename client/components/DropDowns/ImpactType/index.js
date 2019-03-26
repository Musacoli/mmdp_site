import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DropdownActions from '../../common/Button/DropdownActions';
import DropdownForm from '../../common/Form/DropdownForm';

const ImpactType = ({
  dropdowns,
  loading,
  editAnImpactType,
  handleSubmit,
  addTempImpactType,
  deleteAnImpactType,
  impactTypeInput,
}) => (
  <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
    <Form>
      {dropdowns.map((item, index) => {
        const fields = [
          {
            type: 'text',
            name: 'impactTypeName',
            label: 'Impact Type',
            className: 'animated fadeIn',
            fluid: true,
            placeholder: 'Enter impact type name',
            value: item.impactTypeName,
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
          <DropdownForm
            // eslint-disable-next-line
            key={index}
            item={item}
            inputs={fields}
            editAState={editAnImpactType}
            deleteAState={deleteAnImpactType}
            states={false}
            header="Delete Impact Type"
            label="Confirm Delete Impact Type"
            className="fundingDlt-btn"
          />
        );
      })}
      <DropdownActions
        addDropdown={addTempImpactType}
        handleSubmit={handleSubmit}
      />
    </Form>
  </Grid.Row>
);

export default ImpactType;
