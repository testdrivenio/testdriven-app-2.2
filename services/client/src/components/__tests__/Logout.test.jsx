import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import Logout from '../Logout';

const logoutUser = jest.fn();

test('Logout renders properly', () => {
  const wrapper = shallow(<Logout logoutUser={logoutUser}/>);
  const element = wrapper.find('p');
  expect(element.length).toBe(1);
  expect(element.get(0).props.children[0]).toContain('You are now logged out.');
});

test('Logout renders a snapshot properly', () => {
  const tree = renderer.create(
    <Router><Logout logoutUser={logoutUser}/></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
