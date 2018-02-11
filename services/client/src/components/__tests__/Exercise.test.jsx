import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import AceEditor from 'react-ace';
jest.mock('react-ace');

import Exercise from '../Exercise';

const testData = {
  exercise: {
    id: 0,
    body: 'Define a function called sum that takes two integers as arguments and returns their sum.',
    test_code: 'sum(2,2)',
    test_code_solution: '4'
  },
  editor: {
    value: '# Enter your code here.',
    button: {
      isDisabled: false,
    },
    showGrading: false,
    showCorrect: false,
    showIncorrect: false,
  },
  isAuthenticated: false,
  onChange: jest.fn(),
  submitExercise: jest.fn(),
}

beforeEach(() => {
  console.error = jest.fn();
  console.error.mockClear();
});

test('Exercise renders properly', () => {
  const wrapper = shallow(<Exercise {...testData}/>);
  const heading = wrapper.find('h4');
  expect(heading.length).toBe(1);
  expect(heading.text()).toBe(testData.exercise.body)
  expect(console.error).toHaveBeenCalledTimes(0);
});

test('Exercise does not render properly when not all props are defined', () => {
  delete testData.submitExercise
  const wrapper = shallow(<Exercise {...testData}/>);
  const heading = wrapper.find('h4');
  expect(heading.length).toBe(1);
  expect(heading.text()).toBe(testData.exercise.body)
  expect(console.error).toHaveBeenCalledTimes(1);
});

test('Exercises renders a snapshot properly when not authenticated', () => {
  const tree = renderer.create(<Exercise {...testData}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Exercises renders a snapshot properly when authenticated', () => {
  testData.isAuthenticated = true;
  const tree = renderer.create(<Exercise {...testData}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
