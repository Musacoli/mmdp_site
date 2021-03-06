import React from 'react';
import { shallow } from 'enzyme';
import { FileInput } from '../../../components/common/Inputs';

const func = () => {};

describe('<FileInput /> ', () => {
  it('renders FileInput component without crashing', () => {
    shallow(
      <FileInput
        classNames="class"
        id="id"
        name="name"
        placeholder="placeholder"
        inputLabel="label"
        value="value"
        change={func}
      />,
    );
  });
});
