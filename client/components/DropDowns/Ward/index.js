import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DropdownForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';
import getInput from './input';

const Ward = (props) => {
  const {
    dropdowns,
    addTempState,
    handleSubmit,
    loading,
    lgaOptions,
    editWard,
    deleteWard,
  } = props;
  let inputs = [];
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          inputs = getInput(item, lgaOptions);
          return (
            <DropdownForm
              // eslint-disable-next-line
              key={index}
              item={item}
              inputs={inputs || []}
              lgas={false}
              header="Delete a ward"
              label="Confirm delete ward"
              editAState={editWard}
              deleteAState={deleteWard}
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

export default Ward;
