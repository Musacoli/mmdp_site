import React from 'react';
import { mount } from 'enzyme';
import State from '../../../components/common/Form/DropdownForm';

describe('<State />', () => {
  let wrapper;
  let props;
  const stateName = 'Adiwa';
  beforeEach(() => {
    props = {
      fetchCountries: jest.fn(),
      countries: [{ text: 'country', value: 'someId' }],
      editAState: jest.fn(),
      deleteAState: jest.fn(),
      deleteState: jest.fn(),
      item: {
        countryId: '5c878ecd6d5a6b1184b93519',
        description: 'asdfasdf',
        stateName,
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      loading: false,
      dropdowns: [
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
    expect(wrapper.find('StateForm').length).toEqual(1);
  });
});
