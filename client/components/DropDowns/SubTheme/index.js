import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DropdownForm from '../../common/Form/DropdownForm';
import DropdownActions from '../../common/Button/DropdownActions';
import getInput from './subThemeInput';

const SubTheme = (props) => {
  const {
    dropdowns,
    addTempState,
    handleSubmit,
    loading,
    thematicOptions,
    editSubTheme,
    deleteSubTheme,
  } = props;
  let inputs = [];
  return (
    <Grid.Row className={loading ? 'dropdowns ui form loading' : 'dropdowns'}>
      <Form>
        {dropdowns.map((item, index) => {
          inputs = getInput(item, thematicOptions);
          return (
            <DropdownForm
              // eslint-disable-next-line
              key={index}
              item={item}
              className="sub-theme-delete"
              inputs={inputs || []}
              lgas={false}
              header="Delete a sub theme"
              label="Confirm delete sub theme"
              editAState={editSubTheme}
              deleteAState={deleteSubTheme}
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

export default SubTheme;
