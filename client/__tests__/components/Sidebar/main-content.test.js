/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import MainContent from '../../../components/Sidebar/MainContent';

describe('<MainContent /> ', () => {
  it('renders MainContent component without crashing', () => {
    shallow(
      <MainContent title="title">
        <div>Hello world</div>
      </MainContent>,
    );
  });
});
