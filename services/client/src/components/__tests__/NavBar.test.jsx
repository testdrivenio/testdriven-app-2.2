import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import NavBar from '../NavBar';

const title = 'Hello, World!';

test('NavBar renders properly', () => {
  const wrapper = shallow(<NavBar title={title}/>);
  const element = wrapper.find('span');
  expect(element.length).toBe(1);
  expect(element.get(0).props.children).toBe(title);
});

test('NavBar renders a snapshot properly', () => {
  const tree = renderer.create(
    <Router location="/"><NavBar title={title}/></Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
