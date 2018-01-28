import React from 'react';
import { shallow, simulate } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter, Switch, Redirect } from 'react-router-dom';

import Form from '../Form';

const testData = [
  {
    formType: 'Register',
    formData: {
      username: '',
      email: '',
      password: ''
    },
    handleUserFormSubmit: jest.fn(),
    handleFormChange: jest.fn(),
    isAuthenticated: false,
  },
  {
    formType: 'Login',
    formData: {
      email: '',
      password: ''
    },
    handleUserFormSubmit: jest.fn(),
    handleFormChange: jest.fn(),
    isAuthenticated: false,
  }
]

describe('When not authenticated', () => {
  testData.forEach((el) => {
    const component = <Form {...el} />;
    it(`${el.formType} Form renders properly`, () => {
      const wrapper = shallow(component);
      const h1 = wrapper.find('h1');
      expect(h1.length).toBe(1);
      expect(h1.get(0).props.children).toBe(el.formType);
      const formGroup = wrapper.find('.form-group');
      expect(formGroup.length).toBe(Object.keys(el.formData).length);
      expect(formGroup.get(0).props.children.props.name).toBe(
        Object.keys(el.formData)[0]);
      expect(formGroup.get(0).props.children.props.value).toBe('');
    });
    it(`${el.formType} Form submits the form properly`, () => {
      const wrapper = shallow(component);
      const input = wrapper.find('input[type="email"]');
      expect(el.handleUserFormSubmit).toHaveBeenCalledTimes(0);
      expect(el.handleFormChange).toHaveBeenCalledTimes(0);
      input.simulate('change')
      expect(el.handleFormChange).toHaveBeenCalledTimes(1);
      wrapper.find('form').simulate('submit', el.formData)
      expect(el.handleUserFormSubmit).toHaveBeenCalledWith(el.formData);
      expect(el.handleUserFormSubmit).toHaveBeenCalledTimes(1);
    });
    it(`${el.formType} Form renders a snapshot properly`, () => {
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  })
});

describe('When authenticated', () => {
  testData.forEach((el) => {
    const component = <Form
      formType={el.formType}
      formData={el.formData}
      isAuthenticated={true}
    />;
    it(`${el.formType} redirects properly`, () => {
      const wrapper = shallow(component);
      expect(wrapper.find('Redirect')).toHaveLength(1);
    });
  })
});
