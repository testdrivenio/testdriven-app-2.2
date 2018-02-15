import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import NavBar from '../NavBar';

const testData = {
  title: 'Hello, World!',
  isAuthenticated: false,
}

beforeEach(() => {
  console.error = jest.fn();
  console.error.mockClear();
});

test('NavBar renders properly', () => {
  const wrapper = shallow(<NavBar {...testData}/>);
  const element = wrapper.find('span');
  expect(element.length).toBe(1);
  expect(element.get(0).props.children).toBe(testData.title);
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('NavBar does not render properly when not all props are defined', () => {
  delete testData.isAuthenticated
  const wrapper = shallow(<NavBar {...testData}/>);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('NavBar renders a snapshot properly', () => {
  const tree = renderer.create(
    <Router location="/"><NavBar {...testData}/></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
