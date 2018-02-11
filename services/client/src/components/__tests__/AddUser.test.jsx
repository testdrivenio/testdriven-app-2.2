import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import AddUser from '../AddUser';

const testData = {
  username: 'michael',
  email: 'michael@mherman.org',
  handleChange: jest.fn(),
  addUser: jest.fn(),
}

beforeEach(() => {
  console.error = jest.fn();
  console.error.mockClear();
});

test('AddUser renders properly', () => {
  const wrapper = shallow(<AddUser {...testData}/>);
  const element = wrapper.find('form');
  expect(element.find('input').length).toBe(3);
  expect(element.find('input').get(0).props.name).toBe('username');
  expect(element.find('input').get(1).props.name).toBe('email');
  expect(element.find('input').get(2).props.type).toBe('submit');
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('AddUser does not render properly when not all props are defined', () => {
  delete testData.addUser
  const wrapper = shallow(<AddUser {...testData}/>);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('AddUser renders a snapshot properly', () => {
  const tree = renderer.create(<AddUser/>).toJSON();
  expect(tree).toMatchSnapshot();
});
