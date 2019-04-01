import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import TargetAudienceForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const data = (props) => {
  const { dropdowns, handleChange, deleteATargetAudience } = props;
  return dropdowns.map((item, index) => {
    const inputs = [
      {
        type: 'text',
        name: 'audienceType',
        label: 'Target Audience',
        className: 'animated fadeIn',
        fluid: true,
        placeholder: 'Enter an audience type',
        value: item.audienceType,
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
      <TargetAudienceForm
        // eslint-disable-next-line
        key={index}
        item={item}
        inputs={inputs}
        editAState={handleChange}
        deleteAState={deleteATargetAudience}
        header="Delete an Audience type"
        label="Confirm to delete Audience type"
        className="two-fields"
      />
    );
  });
};

const TargetAudience = (props) => {
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

export default TargetAudience;
