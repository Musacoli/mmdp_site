import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DropdownForm from '../../common/Form/DropdownForm/index';
import DropdownActions from '../../common/Button/DropdownActions';
import getInput from './input';

const Focus = (props) => {
  const header = 'Delete a Focus Area option';
  const content = 'Confirm delete of a Focus Area option';
  const {
    dropdowns,
    editFocusArea,
    addTempFocusArea,
    subthemeOptions,
    handleSubmit,
    loading,
    deleteAFocusArea,
  } = props;
  let inputs = [];
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          inputs = getInput(item, subthemeOptions);
          return (
            <DropdownForm
              // eslint-disable-next-line
              key={index}
              item={item}
              inputs={inputs || []}
              header={header}
              label={content}
              editAState={editFocusArea}
              deleteAState={deleteAFocusArea}
            />
          );
        })}
        <DropdownActions
          addDropdown={addTempFocusArea}
          handleSubmit={handleSubmit}
        />
      </Form>
    </Grid.Row>
  );
};

export default Focus;
