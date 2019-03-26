import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DropdownForm from '../../common/Form/DropdownForm/index';
import DropdownActions from '../../common/Button/DropdownActions';
import getInput from './input';

const Funding = (props) => {
  const header = 'Delete a source of funding';
  const content = 'Confirm delete source of funding';
  const {
    dropdowns,
    editFunding,
    addTempFunding,
    handleSubmit,
    loading,
    deleteAFunding,
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
              editAState={editFunding}
              deleteAState={deleteAFunding}
              className="fundingDlt-btn"
            />
          );
        })}
        <DropdownActions
          addDropdown={addTempFunding}
          handleSubmit={handleSubmit}
        />
      </Form>
    </Grid.Row>
  );
};

export default Funding;
