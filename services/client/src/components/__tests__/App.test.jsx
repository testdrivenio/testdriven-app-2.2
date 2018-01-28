import React from 'react';
import { shallow } from 'enzyme';

import App from '../../App';

test('App renders without crashing', () => {
  const wrapper = shallow(<App/>);
});
