import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ResearchCardView from '../../../../components/Resources/Research/ResearchDetails';

describe('<ResearchCard /> ', () => {
  const props = {
    title: '',
    Archived: true,
    DeleteHandler: () => {},
    ArchiveHandler: () => {},
  };
  const wrapper = shallow(<ResearchCardView {...props} />);
  it('renders the container without crashing', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
});
