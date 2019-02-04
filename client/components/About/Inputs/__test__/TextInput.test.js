import React from 'react';
import { shallow } from 'enzyme';
import { TextInput } from '../TextInput';

const func = () => {};

describe('<TextInput /> ', () => {
  it('renders TextInput component without crashing', () => {
    shallow(
      <TextInput
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
