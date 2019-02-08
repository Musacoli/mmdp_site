/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import EmptyView from '../../../components/common/InvalidPage';

describe('Events list component', () => {
  it('should render correctly', () => {
    shallow(
      <EmptyView errorMessage="" errrorDescription="" path="" pathLabel="" />,
    );
  });
});
