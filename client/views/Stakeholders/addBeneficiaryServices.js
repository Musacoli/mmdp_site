import React from 'react';
import Template from '../Templates';
import BeneficiaryServicesForm from '../../components/Stakeholders/addBeneficiaryServices';

const BeneficiaryServicesView = ({ ...props }) => (
  <Template {...props} title="Stakeholder Directory">
    <BeneficiaryServicesForm {...props} />
  </Template>
);

export default BeneficiaryServicesView;
