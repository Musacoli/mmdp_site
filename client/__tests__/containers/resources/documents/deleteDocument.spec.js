/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { DeleteDoc } from '../../../../containers/Resources/Document/DeleteDocument';

const state = {};

const props = {
  deleteDoc: jest.fn(),
};

describe('<DeleteDoc /> ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DeleteDoc {...props} {...state} />);
  });

  it('Render delete component', () => {
    expect(wrapper.find('Modal').length).toBe(1);
  });

  it('test hideDeleteModal', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'hideDeleteModal');
    wrapper.instance().hideDeleteModal();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });

  it('test showDeleteModal', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.instance().showDeleteModal();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });

  it('test handleDelete', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleDelete');
    wrapper.instance().handleDelete();
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });

  it('test onClick on click', () => {
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'showDeleteModal');
    wrapper.find('Button').simulate('click');
    expect(handleClickSpy.mock.calls.length).toEqual(1);
  });
});
