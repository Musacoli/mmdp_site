import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ViewAllResearch } from '../../../containers/Resources/Research/ViewAllResearch';

describe('<ViewAllResearch /> ', () => {
  const state = {
    isOpen: false,
    _id: '',
  };
  const props = {
    getResearch: jest.fn(),
    loading: false,
    history: {},
    archiveResearch: jest.fn(),
    deleteResearch: jest.fn(),
    research: {
      payload: {
        data: { results: ['Research one'], next: true, previous: true },
      },
    },
  };
  const wrapper = shallow(<ViewAllResearch {...state} {...props} />);
  const instance = wrapper.instance();
  it('renders the container without crashing', () => {
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('tests the methods of the container', () => {
    instance.handleArchive('124353232', { Archive: true });
    instance.handleDelete('124353232');
    const event = {
      preventDefault: () => jest.fn,
    };
    instance.handleModalToggle(event);
    instance.onConfirm();
  });
});
