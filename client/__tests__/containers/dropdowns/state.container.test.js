import React from 'react';
import { mount } from 'enzyme';
import { State } from '../../../containers/DropDowns/State';

describe('<State />', () => {
  let wrapper;
  let props;
  const stateName = 'Adiwa';
  beforeEach(() => {
    props = {
      fetchCountries: jest.fn(),
      countries: [{ text: 'country', value: 'someId' }],
      addStates: jest.fn(),
      fetchStates: jest.fn(),
      deleteState: jest.fn(),
      loading: false,
      states: [
        {
          countryId: '5c878ecd6d5a6b1184b93519',
          description: 'asdfasdf',
          stateName,
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          countryId: '5c878ecd6d5a6b1184b93519',
          description: 'asdfasdf',
          stateName: 'sfasdfasdfsdf',
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<State {...props} />);
  });
  it('should render State component without crashing', () => {
    expect(wrapper.find('State').length).toEqual(2);
  });
  it('should add temp state', () => {
    wrapper.instance().addTempState();
    wrapper.instance().editAState(props.states[0]);
    wrapper.instance().deleteAState(props.states[0]);
    wrapper.instance().deleteAState(props.states[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].stateName).toEqual(stateName);
  });
});
