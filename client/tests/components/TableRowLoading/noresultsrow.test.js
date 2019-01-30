/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import NoResultRow from '../../../components/common/TableRowLoading/NoResultsRow';

describe('<NoResultRow /> ', () => {
  it('renders NoResultRow component without crashing', () => {
    shallow(<NoResultRow />);
  });
});
