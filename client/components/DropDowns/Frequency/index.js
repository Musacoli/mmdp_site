import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DropdownForm from '../../common/Form/DropdownForm/index';
import DropdownActions from '../../common/Button/DropdownActions';
import getInput from './input';

const Frequency = (props) => {
  const header = 'Delete a frequency option';
  const content = 'Confirm delete of frequency option';
  const {
    dropdowns,
    editFrequency,
    addTempFrequency,
    handleSubmit,
    loading,
    deleteAFrequency,
  } = props;
  let inputs = [];
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          inputs = getInput(item);
          return (
            <DropdownForm
              // eslint-disable-next-line
              key={index}
              item={item}
              inputs={inputs || []}
              header={header}
              label={content}
              editAState={editFrequency}
              deleteAState={deleteAFrequency}
            />
          );
        })}
        <DropdownActions
          addDropdown={addTempFrequency}
          handleSubmit={handleSubmit}
        />
      </Form>
    </Grid.Row>
  );
};

export default Frequency;
