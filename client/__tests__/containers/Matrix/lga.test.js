import React from 'react';
import { mount } from 'enzyme';
import { LGAMap } from '../../../containers/Matrix/LGAMap';

let wrapper;
let instance;
let stateProps;

describe('test LGA maps container', () => {
  stateProps = {
    fetchLGAMaps: jest.fn(),
    updateLGA: jest.fn(),
    addLGAMap: jest.fn(),
    fetchedMaps: {
      data: [
        {
          stateSvgFile: { url: 'http://test' },
        },
      ],
      pagination: {
        data: {
          total: 5,
          currentPage: 1,
          totalPages: 5,
          previous: false,
          next: 2,
        },
      },
    },
    history: { push: jest.fn() },
    match: { params: { state: 'Edo' } },
  };
  beforeEach(() => {
    wrapper = mount(<LGAMap {...stateProps} />);
    instance = wrapper.instance();
  });
  it('should  render LGAMap container', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should return errors', () => {
    instance.setState({ fileName: '' });
    expect(instance.validate()).toEqual({
      fileName: 'Please enter state svg file',
    });
  });
  it('should set errors onFormSubmit', () => {
    instance.setState({ fileName: '' });
    instance.onFormSubmit();
    expect(instance.state.errors).toEqual({
      fileName: 'Please enter state svg file',
    });
  });
  it('should have called updateLGA', () => {
    instance.editLGA({ name: 'Lagos', id: 'STL700499' });
    expect(wrapper.prop('updateLGA')).toHaveBeenCalledWith({
      data: { name: 'Lagos', page: undefined },
      id: 'STL700499',
    });
  });
  it('should call fetchedLGAMaps', () => {
    instance.listLGAMaps(1);
    expect(wrapper.prop('fetchLGAMaps')).toHaveBeenCalledWith({
      page: 1,
      query: '',
      state: 'Edo',
    });
  });
  it('should map data', () => {
    const data = [
      {
        uniqueId: 'STL700499',
        name: 'Edo',
        path: 'M434343',
      },
    ];
    expect(instance.getLGAMaps(data)).toEqual([
      { id: 'STL700499', name: 'Edo', path: 'M434343' },
    ]);
  });
});
