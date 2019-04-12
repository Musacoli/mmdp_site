import React from 'react';
import Templates from '../../Templates';
import Country from '../../../containers/Matrix/CountryMap';
import '../../../assets/styles/components/map_listing.scss';

const CountryMatrixView = ({ ...props }) => (
  <Templates {...props} title="National Level">
    <Country {...props} />
  </Templates>
);

export default CountryMatrixView;
