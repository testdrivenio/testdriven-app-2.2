import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import UsersList from '../UsersList';

const users = [
  {
    'active': true,
    'admin': false,
    'email': 'hermanmu@gmail.com',
    'id': 1,
    'username': 'michael'
  },
  {
    'active': true,
    'admin': false,
    'email': 'michael@mherman.org',
    'id': 2,
    'username': 'michaelherman'
  }
]

test('UsersList renders properly', () => {
  const wrapper = shallow(<UsersList users={users}/>);
  expect(wrapper.find('h1').get(0).props.children).toBe('All Users');
  // table
  const table = wrapper.find('Table');
  expect(table.length).toBe(1);
  expect(table.get(0).props.striped).toBe(true);
  expect(table.get(0).props.bordered).toBe(true);
  expect(table.get(0).props.condensed).toBe(true);
  expect(table.get(0).props.hover).toBe(true);
  // table head
  expect(wrapper.find('thead').length).toBe(1);
  const th = wrapper.find('th');
  expect(th.length).toBe(5);
  expect(th.get(0).props.children).toBe('User ID');
  expect(th.get(1).props.children).toBe('Email');
  expect(th.get(2).props.children).toBe('Username');
  expect(th.get(3).props.children).toBe('Active');
  expect(th.get(4).props.children).toBe('Admin');
  // table body
  expect(wrapper.find('tbody').length).toBe(1);
  expect(wrapper.find('tbody > tr').length).toBe(2);
  const td = wrapper.find('tbody > tr > td');
  expect(td.length).toBe(10);
  expect(td.get(0).props.children).toBe(1);
  expect(td.get(1).props.children).toBe('hermanmu@gmail.com');
  expect(td.get(2).props.children).toBe('michael');
  expect(td.get(3).props.children).toBe('true');
  expect(td.get(4).props.children).toBe('false');
});


test('UsersList renders a snapshot properly', () => {
  const tree = renderer.create(<UsersList users={users}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
