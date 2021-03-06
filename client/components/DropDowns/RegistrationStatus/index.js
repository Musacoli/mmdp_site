import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import RegistrationStatusForm from '../../common/Form/regDropdownForm';

const Status = (props) => {
  const { dropdowns, addTempState, handleSubmit, loading } = props;
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          return (
            <RegistrationStatusForm
              // eslint-disable-next-line
              key={index}
              item={item}
              {...props}
            />
          );
        })}

        <Form.Group>
          <Form.Button
            className="dropdowns__add"
            onClick={() => addTempState()}
          >
            Add more options
          </Form.Button>
          <Form.Button
            className="dropdowns__save bg-transparent"
            onClick={handleSubmit}
          >
            Save dropdown
          </Form.Button>
        </Form.Group>
      </Form>
    </Grid.Row>
  );
};

export default Status;
