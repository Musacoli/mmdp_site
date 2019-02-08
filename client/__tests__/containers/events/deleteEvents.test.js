import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { ConfirmationModal } from '../../../containers/events/deleteModal';

describe('<Delete Events /> ', () => {
  const wrapper = shallow(
    <ConfirmationModal dispatch={jest.fn} content="Delete String" />,
    new ReactRouterEnzymeContext(),
  );

  it('renders Add Events conatiner without crashing', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('', () => {
    wrapper.instance().handleDelete(12);
    wrapper.instance().toggleModal();
  });
});
