import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AddResearch } from '../../../../containers/Resources/Research/Addresearch';

describe('<ResearchContainer /> ', () => {
  const addResearch = () => {};
  const props = {
    research: {
      payload: {
        status: 'success',
      },
    },
    payload: {},
    loading: true,
    history: {
      push: jest.fn(),
    },
  };
  const wrapper = mount(<AddResearch addResearch={addResearch} {...props} />);
  it('renders the container without crashing', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('tests methods in the  container', () => {
    const instance = wrapper.instance();
    wrapper.find('button').simulate('click');
    const e = {
      preventDefault: () => {},
      target: {
        name: 'form data',
        files: ['file1'],
      },
    };

    instance.onFormSubmit(e);
    instance.onChange(e);
    e.target.name = 'researchFile';
    instance.onChange(e);
  });
});
