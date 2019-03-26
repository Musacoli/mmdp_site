import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import formInputs from './formInputs';
import CommunityForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';

const CommunityList = (props) => {
  const { wards, dropdowns, addTempCommunity, handleSubmit, loading } = props;
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      {dropdowns && (
        <Form>
          {dropdowns.map((item, index) => {
            const data = { ...item, index };
            const inputs = formInputs(data, wards) || [];
            return (
              <CommunityForm
                // eslint-disable-next-line
                key={index}
                inputs={inputs}
                item={data}
                wards={wards}
                {...props}
                countries={false}
                header="Delete Community"
                label="Confirm Delete Community"
              />
            );
          })}
          <DropdownActions
            addDropdown={addTempCommunity}
            handleSubmit={handleSubmit}
          />
        </Form>
      )}
    </Grid.Row>
  );
};

export default CommunityList;
