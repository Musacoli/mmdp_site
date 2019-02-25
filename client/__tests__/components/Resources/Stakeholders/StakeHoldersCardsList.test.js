import React from 'react';
import { mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import Faker from 'faker';
import StakeHoldersCardsList from '../../../../components/Resources/Stakeholders/StakeHoldersCardsList';

describe('StakeHoldersCardslist', () => {
  let data = [];
  let props;
  let wrapper;

  it('should mount without crashing', () => {
    props = {
      items: data,
    };
    wrapper = mount(
      <StakeHoldersCardsList {...props} />,
      new ReactRouterEnzymeContext(),
    );
    expect(wrapper.find('CardGroup').length).toEqual(1);
  });

  it('should mount with multiple cards', () => {
    data = [
      [
        {
          _id: Faker.random.uuid(),
          basicInformation: {
            stakeholderName: Faker.name.title(),
            state: Faker.address.state(),
            email: Faker.internet.email(),
            phoneNumberOne: Faker.phone.phoneNumber(),
            phoneNumberThree: Faker.phone.phoneNumber(),
          },
        },
      ],
      [
        {
          _id: Faker.random.uuid(),
          basicInformation: {
            stakeholderName: Faker.name.title(),
            state: Faker.address.state(),
            email: Faker.internet.email(),
            phoneNumberOne: Faker.phone.phoneNumber(),
            phoneNumberThree: Faker.phone.phoneNumber(),
          },
        },
      ],
      [
        {
          _id: Faker.random.uuid(),
          basicInformation: {
            stakeholderName: Faker.name.title(),
            state: Faker.address.state(),
            email: Faker.internet.email(),
            phoneNumberOne: Faker.phone.phoneNumber(),
            phoneNumberThree: Faker.phone.phoneNumber(),
          },
        },
      ],
    ];
    wrapper = mount(
      <StakeHoldersCardsList items={data} />,
      new ReactRouterEnzymeContext(),
    );
    expect(wrapper.find('StakeHoldersCard').length).toEqual(3);
  });
});
