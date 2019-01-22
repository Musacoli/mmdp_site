/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import  DisplayUsers from './../UserViewComponent';
import { user } from '../../../__mocks__/fetchUserData';

const wrapper = mount(<DisplayUsers users={user.fetchedUsersData}/>);

describe('<DisplayUsers /> ', () => {
  it('DisplayUsers with necessary data', () => {
    expect(wrapper.find('Table').length).toBe(1);
  });
});

