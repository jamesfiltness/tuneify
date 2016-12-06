import React from 'react';
import { App } from './';

describe('App component', () => {
  let component;
  
  beforeEach(() => {
    component = shallow(
      <App
        trackSummary={{}}
        dispatch={() => {}}
      />
    );
  });

  it('renders the component wrapper', () => {
   expect(component.find('.app')).to.have.length(1);
  });

  it('renders the header markup correctly', () => {
    const header = component.find('.header');
    expect(header).to.have.length(1);
    expect(header.find('.header__container')).to.have.length(1);
    expect(header.find('.header__title')).to.have.length(1);
    expect(header.find('.header__title-link')).to.have.length(1);
  });

  it('renders the route content div correctly', () => {
    expect(component.find('.route-content')).to.have.length(1);
  });

  it('it renders the right sidebar', () => {
    expect(component.find('.sidebar--right')).to.have.length(1);
  });

});
