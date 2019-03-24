import React from 'react';
import { mount } from 'enzyme';
import { CountryDropDown } from '../../../containers/DropDowns/Country';

describe('<Country />', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      fetchCountry: jest.fn(),
      addCountry: jest.fn(),
      deleteCountry: jest.fn(),
      loading: false,
      countries: [
        {
          countryId: '5c878ecd6d5a6b1184b93519',
          description: 'asdfasdf',
          countryName: 'Ug',
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          countryId: '5c878ecd6d5a6b1184b93519',
          description: 'asdfasdf',
          countryName: 'Ke',
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<CountryDropDown {...props} />);
  });
  it('should render Country component without crashing', () => {
    expect(wrapper.find('CountryDropDown').length).toEqual(1);
  });
  it('should add temp state', () => {
    wrapper.instance().addTempState();
    wrapper.instance().editAStatus(props.countries[0]);
    wrapper.instance().deleteAStatus(props.countries[0]);
    wrapper.instance().deleteAStatus(props.countries[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].countryName).toEqual('Ug');
  });
});
