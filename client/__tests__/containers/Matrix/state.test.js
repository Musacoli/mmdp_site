import React from 'react';
import { mount } from 'enzyme';
import { StateMap } from '../../../containers/Matrix/StateMap';

let wrapper;
let instance;
let stateProps;

describe('test StateBoundaries container container', () => {
  stateProps = {
    getStates: jest.fn(),
    fetchStateMaps: jest.fn(),
    updateStateMap: jest.fn(),
    updateCountryMap: jest.fn(),
    addSateMap: jest.fn(),
    fetchedMaps: {
      data: [
        {
          countryName: 'Nigeria',
          countrySvgFile: { url: 'http://test' },
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
    match: { params: { country: 'Kenya' } },
  };
  beforeEach(() => {
    wrapper = mount(<StateMap {...stateProps} />);
    instance = wrapper.instance();
  });
  it('should  render stateMap container', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should update file onChange', () => {
    const event = {
      target: { name: 'countrySvgFile', files: [{ name: 'svgFile' }] },
    };
    instance.onChange(event);
    expect(instance.state.fileName).toBe('svgFile');
    expect(instance.state.countrySvgFile).toEqual(event.target.files[0]);
  });

  it('should return errors', () => {
    instance.setState({ fileName: '' });
    expect(instance.validate()).toEqual({
      fileName: 'Please enter country svg file',
    });
  });
  it('should call updateCountryMap', () => {
    instance.setState({
      fileName: 'svgFile',
      countrySvgFile: [],
    });
    instance.onFormSubmit();
    const formData = new FormData();
    const { countrySvgFile, fileName } = instance.state;
    formData.append('countrySvgFile', countrySvgFile);
    formData.append('filename', fileName);
    formData.append('countryName', 'Kenya');
    expect(wrapper.prop('updateCountryMap')).toHaveBeenCalledWith(formData);
  });
  it('should set errors onFormSubmit', () => {
    instance.setState({ fileName: '' });
    instance.onFormSubmit();
    expect(instance.state.errors).toEqual({
      fileName: 'Please enter country svg file',
    });
  });
  it('should have called updateStateMap', () => {
    instance.onUpdate({ name: 'Lagos', id: 'STL343' });
    expect(wrapper.prop('updateStateMap')).toHaveBeenCalledWith({
      data: { name: 'Lagos', page: undefined },
      id: 'STL343',
    });
  });
  it('should call fetchCountryMaps', () => {
    instance.listStateMaps(1);
    expect(wrapper.prop('fetchStateMaps')).toHaveBeenCalledWith({
      page: 1,
      query: '',
      country: 'Kenya',
    });
  });

  it('should map data', () => {
    const data = [
      {
        uniqueId: 'STL4343',
        name: 'Lagos',
        path: 'M434343',
      },
    ];
    expect(instance.getStateMaps(data)).toEqual([
      { id: 'STL4343', name: 'Lagos', path: 'M434343' },
    ]);
  });
  // it('should update refresh to false on ComponentDidUpdate', () => {
  //   instance.setState({ refresh: true });
  //   expect(instance.state.refresh).toBe(false);
  // });
});
