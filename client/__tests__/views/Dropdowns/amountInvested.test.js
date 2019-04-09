/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import AmountInvestedView from '../../../views/DropDowns/AmountInvested';

describe('<AmountInvestedView /> ', () => {
  it('renders amountInvestment component without crashing', () => {
    shallow(<AmountInvestedView />);
  });
});
