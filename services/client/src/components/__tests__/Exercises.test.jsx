import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import AceEditor from 'react-ace';
jest.mock('react-ace');

import Exercises from '../Exercises';

const exercises = [
  {
    id: 0,
    body: `Define a function called sum that takes
    two integers as arguments and returns their sum.`
  },
  {
    id: 1,
    body: `Define a function called reverse that takes a string
    as an argument and returns the string in reversed order.`
  },
  {
    id: 2,
    body: `Define a function called factorial that takes a random
    number as an argument and then returns the factorial of that
    given number.`,
  }
];

test('Exercises renders properly when not authenticated', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = onDidMount;
  const wrapper = shallow(<Exercises isAuthenticated={false}/>);
  wrapper.setState({exercises : exercises});
  const heading = wrapper.find('h4');
  expect(heading.length).toBe(1);
  const alert = wrapper.find('.alert');
  expect(alert.length).toBe(1);
  expect(alert.get(0).props.children[1].props.children).toContain(
    'Please log in to submit an exercise.')
});

test('Exercises renders properly when authenticated', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = onDidMount;
  const wrapper = shallow(<Exercises isAuthenticated={true}/>);
  wrapper.setState({exercises : exercises});
  const heading = wrapper.find('h4');
  expect(heading.length).toBe(1);
  const alert = wrapper.find('.alert');
  expect(alert.length).toBe(0);
});

test('Exercises renders a snapshot properly', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = exercises;
  const tree = renderer.create(<Exercises/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Exercises will call componentWillMount when mounted', () => {
  const onWillMount = jest.fn();
  Exercises.prototype.componentWillMount = onWillMount;
  const wrapper = mount(<Exercises/>);
  expect(onWillMount).toHaveBeenCalledTimes(1)
});

test('Exercises will call componentDidMount when mounted', () => {
  const onDidMount = jest.fn();
  Exercises.prototype.componentDidMount = onDidMount;
  const wrapper = mount(<Exercises/>);
  expect(onDidMount).toHaveBeenCalledTimes(1)
});
