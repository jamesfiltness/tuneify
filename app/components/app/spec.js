import React from 'react';
import { App } from './';

describe('App component', function() {
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });

  it('renders the component wrapper', function() {
    expect(component.find('.app')).to.have.length(1);
  });
});
