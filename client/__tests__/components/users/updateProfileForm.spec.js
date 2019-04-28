import React from 'react';
import { shallow } from 'enzyme';
import updateProfileForm from '../../../components/Users/UpdateProfile';

describe('updateProfileFormView', () => {
  it('renders updateProfileForm component without crashing', () => {
    shallow(<updateProfileForm />);
  });
});
