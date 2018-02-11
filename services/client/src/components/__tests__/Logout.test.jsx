import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import Logout from '../Logout';

const logoutUser = jest.fn();

beforeEach(() => {
  console.error = jest.fn();
  console.error.mockClear();
});

test('Logout renders properly', () => {
  const wrapper = shallow(<Logout logoutUser={logoutUser}/>);
  const element = wrapper.find('p');
  expect(element.length).toBe(1);
  expect(element.get(0).props.children[0]).toContain('You are now logged out.');
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('Logout does not render properly when not all props are defined', () => {
  const onDidMount = jest.fn();
  Logout.prototype.componentDidMount = onDidMount;
  const wrapper = shallow(<Logout/>);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('Logout renders a snapshot properly', () => {
  const tree = renderer.create(
    <Router><Logout logoutUser={logoutUser}/></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
