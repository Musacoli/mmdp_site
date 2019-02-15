import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ViewAllResearch } from '../../../containers/Resources/Research/ViewAllResearch';

describe('<ViewAllResearch /> ', () => {
  const props = {
    getResearch: jest.fn(),
    loading: false,
    history: {},
    research: {
      payload: {
        data: { results: ['Research one'], next: true, previous: true },
      },
    },
  };
  const wrapper = shallow(<ViewAllResearch {...props} />);
  it('renders the container without crashing', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
