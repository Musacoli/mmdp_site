import React from 'react';
import { mount } from 'enzyme';
import { FrequencyOption } from '../../../containers/DropDowns/Frequency';

describe('<FrequencyOption />', () => {
  let wrapper;
  let props;
  const frequencyValue = 5;
  beforeEach(() => {
    props = {
      addFrequency: jest.fn(),
      fetchFrequency: jest.fn(),
      deleteFrequency: jest.fn(),
      loading: false,
      frequencies: [
        {
          classification: 'Weekly',
          description: 'asdfasdf',
          frequencyValue,
          __v: 0,
          _id: '5c9e0041206aff8df6077d72',
        },
        {
          classification: 'Weekly',
          description: 'asdfasdf',
          sourceOfFundingName: 'sfasdfasdfsdf',
          __v: 0,
          id: '5c9e0041206aff8df6077d72',
        },
      ],
    };
    wrapper = mount(<FrequencyOption {...props} />);
  });
  it('should render Frequency  component without crashing', () => {
    expect(wrapper.find('FrequencyOption').length).toEqual(1);
  });
  it('should add temp frequency option', () => {
    wrapper.instance().addTempFrequency();
    wrapper.instance().editFrequency(props.frequencies[0]);
    wrapper.instance().deleteAFrequency(props.frequencies[0]);
    wrapper.instance().deleteAFrequency(props.frequencies[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].frequencyValue).toEqual(
      frequencyValue,
    );
  });
});
