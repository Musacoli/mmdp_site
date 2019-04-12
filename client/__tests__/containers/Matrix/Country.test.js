import React from 'react';
import { mount } from 'enzyme';
import { Country } from '../../../containers/Matrix/CountryMap';

let wrapper;
let instance;
let stateProps;

describe('test country container', () => {
  stateProps = {
    getStates: jest.fn(),
    fetchCountryMaps: jest.fn(),
    addCountryMap: jest.fn(),
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
  };
  beforeEach(() => {
    wrapper = mount(<Country {...stateProps} />);
    instance = wrapper.instance();
  });
  it('should  render CountryMap container', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should update file onChange', () => {
    const event = {
      target: { name: 'countrySvgFile', files: [{ name: 'svgFile' }] },
    };
    instance.onChange(event);
    expect(instance.state.fileName).toBe('svgFile');
    expect(instance.state.fileName).toBe('svgFile');
    expect(instance.state.countrySvgFile).toEqual(event.target.files[0]);
  });
  it('should update country name', () => {
    const event = {
      target: { name: 'countryName', value: 'Nigeria' },
    };
    instance.onChange(event);
    expect(instance.state.countryName).toBe('Nigeria');
  });
  it('should return errors', () => {
    instance.setState({ countryName: '', fileName: '' });
    expect(instance.validate()).toEqual({
      countryName: 'Please enter country name',
      fileName: 'Please enter country svg file',
    });
  });
  it('should call addCountryMap', () => {
    instance.setState({
      countryName: 'Nigeria',
      fileName: 'svgFile',
      countrySvgFile: [],
    });
    instance.onFormSubmit();
    const formData = new FormData();
    const { countrySvgFile, fileName, countryName } = instance.state;
    formData.append('countrySvgFile', countrySvgFile);
    formData.append('filename', fileName);
    formData.append('countryName', countryName);
    expect(wrapper.prop('addCountryMap')).toHaveBeenCalledWith(formData);
  });
  it('should set errors onFormSubmit', () => {
    instance.setState({ countryName: '', fileName: '' });
    instance.onFormSubmit();
    expect(instance.state.errors).toEqual({
      countryName: 'Please enter country name',
      fileName: 'Please enter country svg file',
    });
  });
  it('should redirect onMapView', () => {
    instance.onMapView({ name: 'Nigeria' });
    expect(wrapper.prop('history').push).toHaveBeenCalledWith(
      '/matrix/states/Nigeria',
    );
  });
  it('should call fetchCountryMaps', () => {
    instance.listCountryMaps(4);
    expect(wrapper.prop('fetchCountryMaps')).toHaveBeenCalledWith({ page: 4 });
  });
  it('should map data', () => {
    const data = [
      {
        countryName: 'Nigeria',
        countrySvgFile: { url: 'http://test' },
      },
    ];
    expect(instance.getCountryMaps(data)).toEqual([
      { name: 'Nigeria', url: 'http://test' },
    ]);
  });
  it('should update refresh to false on ComponentDidUpdate', () => {
    instance.setState({ refresh: true });
    expect(instance.state.refresh).toBe(false);
  });
});
