import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import AceEditor from 'react-ace';
jest.mock('react-ace');

import App from '../../App';

beforeAll(() => {
  global.localStorage = {
    getItem: () => 'someToken'
   };
});

test('App renders without crashing', () => {
  const wrapper = shallow(<App/>);
});

test('App will call componentWillMount when mounted', () => {
  const onWillMount = jest.fn();
  App.prototype.componentWillMount = onWillMount;
  App.prototype.AceEditor = jest.fn();
  const wrapper = mount(<Router><App/></Router>);
  expect(onWillMount).toHaveBeenCalledTimes(1)
});
