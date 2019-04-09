import React from 'react';
import Templates from '../../Templates';
import State from '../../../containers/Matrix/State';

const StateMatrixView = ({ ...props }) => (
  <Templates {...props} title="National Level">
    <State {...props} />
  </Templates>
);

export default StateMatrixView;
