import React from 'react';
import { shallow, simulate } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter, Switch, Redirect } from 'react-router-dom';

import Form from '../forms/Form';

const testData = [
   {
     formType: 'register',
     formData: {
       username: '',
       email: '',
       password: ''
     },
     isAuthenticated: false,
     loginUser: jest.fn(),
   },
   {
     formType: 'login',
     formData: {
       email: '',
       password: ''
     },
     isAuthenticated: false,
     loginUser: jest.fn(),
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
      wrapper.instance().handleUserFormSubmit = jest.fn();
      wrapper.instance().validateForm = jest.fn();
      wrapper.update();
      const input = wrapper.find('input[type="email"]');
      expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledTimes(0);
      input.simulate(
        'change', { target: { name: 'email', value: 'test@test.com'} })
      wrapper.find('form').simulate('submit', el.formData)
      expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledWith(el.formData);
      expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().validateForm).toHaveBeenCalledTimes(1);
    });
    it(`${el.formType} Form renders a snapshot properly`, () => {
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it(`${el.formType} Form should be disabled by default`, () => {
      const wrapper = shallow(component);
      const input = wrapper.find('input[type="submit"]');
      expect(input.get(0).props.disabled).toEqual(true);
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
