import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import FormErrors from '../forms/FormErrors';
import { registerFormRules, loginFormRules } from '../forms/form-rules.js';

const registerFormProps = {
  formType: 'Register',
  formRules: registerFormRules,
}

const loginFormProps = {
  formType: 'Login',
  formRules: loginFormRules,
}

test('FormErrors (with register form) renders properly', () => {
  const wrapper = shallow(<FormErrors {...registerFormProps} />);
  const ul = wrapper.find('ul');
  expect(ul.length).toBe(1);
  const li = wrapper.find('li');
  expect(li.length).toBe(4);
  expect(li.get(0).props.children).toContain(
    'Username must be greater than 5 characters.');
  expect(li.get(1).props.children).toContain(
    'Email must be greater than 5 characters.');
  expect(li.get(2).props.children).toContain(
    'Email must be a valid email address.');
  expect(li.get(3).props.children).toContain(
    'Password must be greater than 10 characters.');
});

test('FormErrors (with register form) renders a snapshot properly', () => {
  const tree = renderer.create(
    <Router><FormErrors {...registerFormProps} /></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('FormErrors (with login form) renders properly', () => {
  const wrapper = shallow(<FormErrors {...loginFormProps} />);
  const ul = wrapper.find('ul');
  expect(ul.length).toBe(1);
  const li = wrapper.find('li');
  expect(li.length).toBe(2);
  expect(li.get(0).props.children).toContain(
    'Email is required.');
  expect(li.get(1).props.children).toContain(
    'Password is required.');
});

test('FormErrors (with login form) renders a snapshot properly', () => {
  const tree = renderer.create(
    <Router><FormErrors {...loginFormProps} /></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
