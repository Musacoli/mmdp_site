import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'semantic-ui-react';
import { TableRowItem } from '../../../../components/common/MapListing/TableRowItem';

describe('<TableRowItem />', () => {
  let wrapper;
  let props;
  let instance;
  beforeEach(() => {
    props = {
      key: '1',
      mapData: { name: 'Nigeria', url: 'http://test' },
      onUpdate: jest.fn(),
      btnName: 'Edit',
      onMapView: jest.fn(),
    };
    wrapper = mount(
      <Table>
        <Table.Body>
          <TableRowItem {...props} />
        </Table.Body>
      </Table>,
    ).find('TableRowItem');
    instance = wrapper.instance();
  });
  it('should render TableRowItem component without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should update map name', () => {
    const event = { target: { name: 'stateID', value: 'Lagos South' } };
    instance.onChange(event);
    expect(instance.state.name).toBe(event.target.value);
    expect(instance.state.errors).toEqual({});
  });
  it('should reset to the passed prop map name ', () => {
    instance.onClose();
    expect(instance.state.name).toBe('Nigeria');
    expect(instance.state.errors).toEqual({});
  });
  it('should update buttonName and status', () => {
    instance.onUpdate({});
    expect(instance.state.btnName).toBe('Save');
    expect(instance.state.disabled).toBe(false);
  });
  it('should update stateName error', () => {
    instance.setState({ name: '' });
    instance.onUpdate({});
    expect(instance.state.errors).toEqual({
      stateName: 'Please enter a state name',
    });
  });
  it('should  have called onUpdate', () => {
    instance.setState({ name: 'Kenya', btnName: 'Save', id: 43434 });
    instance.onUpdate({});
    expect(wrapper.prop('onUpdate')).toHaveBeenCalledWith({
      event: {},
      id: 43434,
      name: 'Kenya',
    });
  });
  it('should render an Image', () => {
    const mapData = { name: 'Nigeria', url: 'http://test', id: 1 };
    const element = mount(instance.svgMap(mapData));
    expect(element.find('Image').length).toEqual(1);
  });
  it('should render InlineSVG', () => {
    const mapData = { name: 'Nigeria', path: '65565', id: 2 };
    const element = mount(instance.svgMap(mapData));
    expect(element.find('InlineSVG').length).toEqual(1);
  });
  it('should have called onUpdate', () => {
    instance.setState({ name: 'Kenya', btnName: 'Save', id: 43434 });
    wrapper
      .find({ id: 'btn-update' })
      .at(0)
      .simulate('click');
    expect(wrapper.prop('onUpdate')).toHaveBeenCalled();
  });
  it('should have called onMapView', () => {
    wrapper
      .find({ id: 'btn-view' })
      .at(0)
      .simulate('click');
    expect(wrapper.prop('onMapView')).toHaveBeenCalled();
  });
});
