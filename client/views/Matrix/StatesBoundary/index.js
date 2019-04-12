import React from 'react';
import Templates from '../../Templates';
import StatesBoundary from '../../../containers/Matrix/StateMap';
import '../../../assets/styles/components/map_listing.scss';

const StatesBoundaryView = ({ ...props }) => (
  <Templates {...props} title="National Level">
    <StatesBoundary {...props} />
  </Templates>
);

export default StatesBoundaryView;
