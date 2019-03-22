import React from 'react';
import Templates from '../../Templates';
import SubTheme from '../../../containers/DropDowns/SubTheme';

const SubThemeView = ({ ...props }) => (
  <Templates {...props} title="Edit Sub theme Dropdown">
    <SubTheme {...props} />
  </Templates>
);

export default SubThemeView;
