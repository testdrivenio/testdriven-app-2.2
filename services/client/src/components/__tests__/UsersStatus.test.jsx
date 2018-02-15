import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import UserStatus from '../UserStatus';

beforeEach(() => {
  console.error = jest.fn();
  console.error.mockClear();
});

test('UserStatus renders properly when authenticated', () => {
  const onDidMount = jest.fn();
  UserStatus.prototype.componentDidMount = onDidMount;
  const wrapper = shallow(<UserStatus isAuthenticated={true}/>);
  const list = wrapper.find('ul');
  expect(list.length).toBe(1);
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('UserStatus renders properly when not authenticated', () => {
  const wrapper = shallow(<UserStatus isAuthenticated={false}/>);
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('UserStatus does not render properly when not all props are defined', () => {
  const wrapper = shallow(<UserStatus/>);
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('UserStatus renders a snapshot properly', () => {
  const tree = renderer.create(<UserStatus isAuthenticated={true}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
