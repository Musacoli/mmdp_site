import React from 'react';
import { mount } from 'enzyme';
import ThematicPillarsForm from '../../../components/common/Form/ThematicPillarsForm';

describe('<ThematicPillarsForm />', () => {
  let wrapper;
  let props;
  const pillarTitle = 'dasdasd';
  beforeEach(() => {
    props = {
      deleteAState: jest.fn(),
      deleteADropdown: jest.fn(),
      item: {
        countryId: '5c878ecd6d5a6b1184b93519',
        description: 'asdfasdf',
        pillarTitle,
        __v: 0,
        _id: '5c90de765a04a53d87040c5e',
      },
      loading: false,
      dropdowns: [
        {
          countryId: '5c878ecd6d5a6b1184b93519',
          description: 'asdfasdf',
          pillarTitle,
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
        {
          countryId: '5c878ecd6d5a6b1184b93519',
          description: 'asdfasdf',
          pillarTitle: 'sfasdfasdfsdf',
          __v: 0,
          id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<ThematicPillarsForm {...props} />);
  });
  it('should render State component without crashing', () => {
    expect(wrapper.find('ThematicPillarsForm').length).toEqual(1);
  });
});
