import React from 'react';
import Template from '../Templates';
import BeneficiaryServicesForm from '../../components/Resources/Stakeholders/addBeneficiaryServices';

const BeneficiaryServicesView = ({ ...props }) => (
  <Template {...props} title="Stakeholder Directory">
    <BeneficiaryServicesForm {...props} />
  </Template>
);

export default BeneficiaryServicesView;
