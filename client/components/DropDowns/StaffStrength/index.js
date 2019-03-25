import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import StaffStrengthForm from '../../common/Form/StaffStrengthForm';

const StaffStrength = (props) => {
  const { dropdowns, addTempState, handleSubmit, loading } = props;
  return (
    <Grid.Row
      className={loading ? 'stateDropdown ui form loading' : 'stateDropdown'}
    >
      <Form>
        {dropdowns.map((item, index) => {
          return (
            <StaffStrengthForm
              // eslint-disable-next-line
              key={index}
              item={item}
              {...props}
            />
          );
        })}

        <Form.Group>
          <Form.Button
            className="stateDropdown__add"
            onClick={() => addTempState()}
          >
            Add more options
          </Form.Button>
          <Form.Button
            className="stateDropdown__save bg-transparent"
            onClick={handleSubmit}
          >
            Save dropdown
          </Form.Button>
        </Form.Group>
      </Form>
    </Grid.Row>
  );
};

export default StaffStrength;
