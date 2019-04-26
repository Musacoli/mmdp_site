import React from 'react';
import { shallow } from 'enzyme';

import AccountConfirmationForm from '../../../components/Users/AccountConfirmationView';

describe('<CompleteRegistrationFormView /> ', () => {
  it('renders CompleteRegistrationFormView component without crashing', () => {
    shallow(<AccountConfirmationForm />);
  });
});
