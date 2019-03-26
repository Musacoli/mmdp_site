import React from 'react';
import { mount } from 'enzyme';
import { SourceOfFunding } from '../../../containers/DropDowns/SourceOfFunding';

describe('<sourceOfFundingName />', () => {
  let wrapper;
  let props;
  const sourceOfFundingName = 'RedCross';
  beforeEach(() => {
    props = {
      addFunding: jest.fn(),
      fetchFunding: jest.fn(),
      deleteFunding: jest.fn(),
      loading: false,
      fundings: [
        {
          description: 'asdfasdf',
          sourceOfFundingName,
          __v: 0,
          _id: '5c9e0041206aff8df6077d72',
        },
        {
          description: 'asdfasdf',
          sourceOfFundingName: 'sfasdfasdfsdf',
          __v: 0,
          id: '5c9e0041206aff8df6077d72',
        },
      ],
    };
    wrapper = mount(<SourceOfFunding {...props} />);
  });
  it('should render source of funding component without crashing', () => {
    expect(wrapper.find('SourceOfFunding').length).toEqual(1);
  });
  it('should add temp funding source', () => {
    wrapper.instance().addTempFunding();
    wrapper.instance().editFunding(props.fundings[0]);
    wrapper.instance().deleteAFunding(props.fundings[0]);
    wrapper.instance().deleteAFunding(props.fundings[1]);
    wrapper.instance().componentDidUpdate();
    wrapper.instance().handleSubmit();
    expect(wrapper.state('dropdowns')[0].sourceOfFundingName).toEqual(
      sourceOfFundingName,
    );
  });
});
