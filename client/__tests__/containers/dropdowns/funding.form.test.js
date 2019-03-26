import React from 'react';
import { mount } from 'enzyme';
import SourceOfFunding from '../../../components/common/Form/DropdownForm/index';

describe('<SourceOfFunding />', () => {
  let wrapper;
  let props;
  const sourceOfFundingName = 'RedCross';
  beforeEach(() => {
    props = {
      fetchFunding: jest.fn(),
      editFunding: jest.fn(),
      deleteFunding: jest.fn(),
      item: {
        description: 'asdfasdf',
        sourceOfFundingName,
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      loading: false,
      dropdowns: [
        {
          description: 'asdfasdf',
          sourceOfFundingName,
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          description: 'asdfasdf',
          stateName: 'sfasdfasdfsdf',
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<SourceOfFunding {...props} />);
  });
  it('should render source of income component without crashing', () => {
    expect(wrapper.find('DropdownForm').length).toEqual(1);
  });
});
