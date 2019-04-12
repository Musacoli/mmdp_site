import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'semantic-ui-react';
import TableHeader from '../../../../components/common/MapListing/TableHeader';

describe('<TableHeader />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      key: '1',
      mapData: [{ name: 'Nigeria', url: 'http://test' }],
      onUpdate: jest.fn(),
      btnName: 'Edit',
      onMapView: jest.fn(),
      headers: ['Shape preview', 'Country ID', 'More', ''],
    };
    wrapper = mount(
      <Table>
        <TableHeader {...props} />
      </Table>,
    );
  });
  it('should render TableHeader component without crashing', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('th').length).toEqual(5);
    expect(
      wrapper
        .find('th')
        .at(1)
        .text(),
    ).toBe('Shape preview');
    expect(
      wrapper
        .find('th')
        .at(2)
        .text(),
    ).toBe('Country ID');
  });
});
