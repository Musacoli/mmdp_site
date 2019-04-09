import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DropdownForm from '../../common/Form/DropdownForm/index';
import DropdownActions from '../../common/Button/DropdownActions';
import getInput from './input';

const AmountInvested = (props) => {
  const header = 'Delete Amount Invested option';
  const content = 'Confirm delete of Amount Invested option';
  const {
    dropdowns,
    editAmount,
    addTempAmount,
    handleSubmit,
    loading,
    deleteAAmount,
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
              editAState={editAmount}
              deleteAState={deleteAAmount}
              className="fundingDlt-btn"
            />
          );
        })}
        <DropdownActions
          addDropdown={addTempAmount}
          handleSubmit={handleSubmit}
        />
      </Form>
    </Grid.Row>
  );
};

export default AmountInvested;
