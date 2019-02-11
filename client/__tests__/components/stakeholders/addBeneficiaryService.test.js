import React from 'react';
import { shallow } from 'enzyme';

import BeneficiaryServiceForm from '../../../components/Stakeholders/addBeneficiaryServices';

describe('Beneficiary services component', () => {
  it('should render correctly', () => {
    shallow(
      <BeneficiaryServiceForm
        handleChange={jest.fn}
        handlePrev={jest.fn}
        handleNext={jest.fn}
        handleSubmit={jest.fn}
        state={jest.fn}
        handleAddnewBeneficiary={jest.fn}
        pages={2}
        step={2}
      />,
    );
  });
});
