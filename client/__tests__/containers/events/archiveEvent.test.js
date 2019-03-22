import React from 'react';
import { mount } from 'enzyme';

import { ArchiveEvent } from '../../../containers/events/ArchiveEvent';

const props = {
  archiveE: jest.fn(),
  loading: false,
  archived: true,
  id: '',
  _id: '',
};

const wrapper = mount(<ArchiveEvent {...props} />);

describe('<ArchiveEvent />', () => {
  it('should render without crushing', () => {
    expect(wrapper.find('button').length).toBe(1);
  });

  it('checks for text', () => {
    expect(wrapper.find(ArchiveEvent).prop('archived')).toBe(true);
  });

  it('calls the handleArchive function', () => {
    const handleArchiveSpy = jest.spyOn(wrapper.instance(), 'handleArchive');
    wrapper.instance().handleArchive();
    expect(handleArchiveSpy.mock.calls.length).toEqual(1);
  });
});

const props2 = { ...props, archived: false };
const wrapper2 = mount(<ArchiveEvent {...props2} />);

describe('<ArchiveEvent />', () => {
  it('checks for text', () => {
    expect(wrapper2.find(ArchiveEvent).prop('archived')).toBe(false);
  });
});
