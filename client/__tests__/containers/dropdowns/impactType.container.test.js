import React from 'react';
import { mount } from 'enzyme';
import { ImpactTypes } from '../../../containers/DropDowns/ImpactTypes';

describe('<ImpactTypes />', () => {
  let wrapper;
  let props;
  const impactTypeName = 'Direct';

  beforeEach(() => {
    props = {
      fetchImpactTypes: jest.fn(),
      addImpactType: jest.fn(),
      deleteAnImpactType: jest.fn(),
      loading: false,
      impactTypes: [
        {
          description: 'asdfasdf',
          impactTypeName: 'Direct',
          __v: 0,
          _id: '5c90de765a04a53d87040c5e',
        },
      ],
    };
    wrapper = mount(<ImpactTypes {...props} />);
  });
  it('should render Impact Type component without crashing', () => {
    expect(wrapper.find('ImpactType').length).toEqual(1);
  });
  it('should add temp Impact Type', () => {
    wrapper.instance().addTempImpactType();
    wrapper.instance().editAnImpactType(props.impactTypes[0]);
    wrapper.instance().deleteAnImpactType(props.impactTypes[0]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].impactTypeName).toEqual(
      impactTypeName,
    );
  });
});
