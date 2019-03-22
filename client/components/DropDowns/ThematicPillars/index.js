import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import ThematicPillarsForm from '../../common/Form/DropdownForm/index';
import DropdownActions from '../../common/Button/DropdownActions';

const getInput = (item) => [
  {
    type: 'text',
    name: 'pillarTitle',
    label: 'Thematic Pillar title',
    className: 'animated fadeIn',
    fluid: true,
    placeholder: 'Thematic Pillar title',
    value: item.pillarTitle,
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

const ThematicPillarsDropDown = (props) => {
  const {
    dropdowns,
    addTempState,
    handleSubmit,
    editADropdown,
    deleteADropdown,
    loading,
  } = props;
  return (
    <Grid.Row
      className={loading ? 'stateDropdown ui form loading' : 'dropdown'}
    >
      <Form>
        {dropdowns.map((item, index) => {
          const inputs = getInput(item);
          return (
            <ThematicPillarsForm
              // eslint-disable-next-line
              key={index}
              item={item}
              inputs={inputs}
              editAState={editADropdown}
              deleteAState={deleteADropdown}
              header="Delete Thematic Pillar"
              label="Confirm Delete Thematic Pillar"
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

export default ThematicPillarsDropDown;
