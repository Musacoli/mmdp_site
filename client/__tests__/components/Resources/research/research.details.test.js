import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import ResearchCardView from '../../../../components/Resources/Research/ResearchDetails';

describe('<ResearchCard /> ', () => {
  const props = {
    title: '',
    Archived: true,
    DeleteHandler: () => {},
    ArchiveHandler: () => {},
  };
  const wrapper = mount(
    <MemoryRouter>
      <ResearchCardView {...props} />
    </MemoryRouter>,
  );
  it('renders the container without crashing', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
  // it('simulates am archived click', () => {
  //   expect(wrapper.find('#research__delete__btn')).to.have.lengthOf(1);
  // });
});
