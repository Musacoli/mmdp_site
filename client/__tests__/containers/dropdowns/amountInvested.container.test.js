import React from 'react';
import { mount } from 'enzyme';
import { AmounntInvestedOption } from '../../../containers/DropDowns/AmountInvested';

describe('<AmounntInvestedOption />', () => {
  let wrapper;
  let props;
  const amountInvestedRange = '500-1000';
  beforeEach(() => {
    props = {
      addAmount: jest.fn(),
      fetchAmount: jest.fn(),
      deleteAmount: jest.fn(),
      loading: false,
      investments: [
        {
          description: 'asdfasdf',
          amountInvestedRange,
          __v: 0,
          _id: '5c9e0041206aff8df6077d72',
        },
        {
          description: 'asdfasdf',
          amountInvestedRange: '5000-10000',
          __v: 0,
          id: '5c9e0041206aff8df6077d72',
        },
      ],
    };
    wrapper = mount(<AmounntInvestedOption {...props} />);
  });
  it('should render AmounntInvestedOption  component without crashing', () => {
    expect(wrapper.find('AmounntInvestedOption').length).toEqual(1);
  });
  it('should add temp amount option', () => {
    wrapper.instance().addTempAmount();
    wrapper.instance().editAmount(props.investments[0]);
    wrapper.instance().deleteAAmount(props.investments[0]);
    wrapper.instance().deleteAAmount(props.investments[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].amountInvestedRange).toEqual(
      amountInvestedRange,
    );
  });
});
