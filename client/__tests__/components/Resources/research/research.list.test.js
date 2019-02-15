import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ResearchListView from '../../../../components/Resources/Research/ResearchList';

describe('<ResearchList /> ', () => {
  const props = {
    results: {
      results: [
        {
          title: 'research 1',
          id: '12312',
          Archived: true,
        },
      ],
    },
  };
  const wrapper = shallow(<ResearchListView {...props} />);
  it('renders the container without crashing', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
