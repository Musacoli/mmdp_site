import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { ListEvents } from '../../../containers/events/eventsList';

describe('<List Events /> ', () => {
  const match = {
    params: { pageNumber: 1 },
  };

  const wrapper = shallow(
    <ListEvents
      match={match}
      listEvents={jest.fn}
      events={[]}
      dispatch={jest.fn}
      pages={4}
      currentPage={2}
      _id="try66282292"
      next={3}
      previous={1}
      handleDelete={jest.fn}
    />,
    new ReactRouterEnzymeContext(),
  );

  const ListWrapper = shallow(
    <ListEvents
      match={match}
      listEvents={jest.fn}
      events={[{}, {}, {}]}
      dispatch={jest.fn}
      pages={4}
      currentPage={2}
      _id="try66282292"
      next={3}
      previous={1}
      handleDelete={jest.fn}
    />,
    new ReactRouterEnzymeContext(),
  );

  const event = {
    preventDefault: jest.fn(),
  };

  it('renders Add Events conatiner without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(toJson(ListWrapper)).toMatchSnapshot();
  });

  it('', () => {
    wrapper.instance().handleNext(event);
    wrapper.instance().handlePrevious(event);
  });
});
