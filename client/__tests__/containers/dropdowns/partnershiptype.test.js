import React from 'react';
import { mount } from 'enzyme';
import { PartnershipType } from '../../../containers/DropDowns/PartnershipType';

describe('<PartnershipType />', () => {
  let wrapper;
  let props;
  const partnershipTypeName = 'Adiwa';
  beforeEach(() => {
    props = {
      addDropdowns: jest.fn(),
      fetchDropdowns: jest.fn(),
      deleteDropdowns: jest.fn(),
      loading: false,
      partnershipType: {
        data: [
          {
            description: 'asdfasdf',
            partnershipTypeName,
            __v: 0,
            _id: '5c90de765a04a53d87040c5e',
          },
          {
            description: 'asdfasdf',
            partnershipTypeName: 'sfasdfasdfsdf',
            __v: 0,
            id: '5c90de765a04a53d87040c5e',
          },
        ],
      },
    };
    wrapper = mount(<PartnershipType {...props} />);
  });
  it('should render PartnershipType component without crashing', () => {
    expect(wrapper.find('PartnershipType').length).toEqual(1);
  });
  it('should add temp partnershipTypeName', () => {
    wrapper.instance().addTempState();
    wrapper.instance().editAState(props.partnershipType.data[0]);
    wrapper.instance().deleteAState(props.partnershipType.data[0]);
    wrapper.instance().deleteAState(props.partnershipType.data[1]);
    wrapper.instance().componentDidUpdate();

    wrapper.instance().handleSubmit();
    wrapper.instance().addTempState();
    expect(wrapper.state('dropdowns')[0].partnershipTypeName).toEqual('');
  });
});
