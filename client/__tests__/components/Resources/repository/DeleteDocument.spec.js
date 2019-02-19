import React from 'react';
import { mount } from 'enzyme';
import DeleteDocument from '../../../../components/Resources/Document/DeleteDocument';

const fn = jest.fn();

const props = {
  closeModal: fn,
  open: true,
  handleDelete: fn,
};

const wrapper = mount(<DeleteDocument {...props} />);

describe('Renders <DeleteDocument/>', () => {
  it('should render the component properly', () => {
    expect(wrapper.find('Modal').length).toBe(1);
  });
});
