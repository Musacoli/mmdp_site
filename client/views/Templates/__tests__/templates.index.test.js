/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import TemplateDefault from '..';

describe('<Template /> ', () => {
  it('renders Default template component without crashing', () => {
    shallow(
      <TemplateDefault>
        <div className="hello">Hello world</div>
      </TemplateDefault>,
    );
  });
});
