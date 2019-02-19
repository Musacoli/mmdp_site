import React from 'react';
import { mount } from 'enzyme';

import { ArchiveDocument } from '../../../../containers/Resources/Document/ArchiveDocument';

const props = {
  archive: jest.fn(),
  loading: false,
  archived: true,
  id: '',
  _id: '',
};

const wrapper = mount(<ArchiveDocument {...props} />);

describe('<Archive />', () => {
  it('should render without crushing', () => {
    expect(wrapper.find('Button').length).toBe(1);
  });

  it('calls the handleArchive function', () => {
    const handleArchiveSpy = jest.spyOn(wrapper.instance(), 'handleArchive');
    wrapper.instance().handleArchive();
    expect(handleArchiveSpy.mock.calls.length).toEqual(1);
  });
});
