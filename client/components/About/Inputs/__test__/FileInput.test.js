import React from 'react';
import { shallow, mount } from 'enzyme';
import { FileInput } from '../FileInput';

const func = () => {};

describe('<FileInput /> ', () => {
  it('renders FileInput component without crashing', () => {
    shallow(<FileInput classNames={"class"} id="id" name="name" placeholder="placeholder" inputLabel={"label"} value="value" change={func} />);
  });
});
