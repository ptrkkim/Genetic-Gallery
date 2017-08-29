// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

// basic smoke test to ensure component renders at all

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe.skip('boilerplate tests', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders welcome message', () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React</h2>
    expect(wrapper.contains(welcome)).toEqual(true);
  });
});
