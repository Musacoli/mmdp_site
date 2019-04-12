import React from 'react';
import { mount } from 'enzyme';
import MapListing from '../../../../components/common/MapListing';

describe('<MapListing />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      Maps: [{ name: 'Nigeria', url: 'http://test' }],
      onUpdate: jest.fn(),
      headers: ['Shape preview', 'Country ID', 'More', ''],
      label: 'country maps found',
      btnName: 'Edit',
      onMapView: jest.fn(),
    };
    wrapper = mount(<MapListing {...props} />);
  });
  it('should render MapListing component without crashing', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('TableRowItem').length).toEqual(1);
  });
});
