import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Research from '../Research';

describe('<ResearchContainer /> ', () => {
  it('renders the container without crashing', () => {
    const wrapper = shallow(<Research />);
    // console.log(wrapper.find('button').html());
  });
});
