/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import TemplateDefault from '../../../views/Templates';

describe('<Template /> ', () => {
  it('renders Default template component without crashing', () => {
    shallow(
      <TemplateDefault title="dashboard">
        <div className="hello">Hello world</div>
      </TemplateDefault>,
    );
  });
});
