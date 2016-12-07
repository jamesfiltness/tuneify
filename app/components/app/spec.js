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
   expect(component.find('.app')).to.be.present();
  });

  it('renders the header markup correctly', () => {
    const header = component.find('.header');
    expect(header).to.have.length(1);
    expect(header.find('.header__container')).to.be.present();
    expect(header.find('.header__title')).to.be.present();
    expect(header.find('.header__title-link')).to.be.present();
  });

  it('renders the route content div correctly', () => {
    expect(component.find('.route-content')).to.be.present();
  });

  it('it renders the right sidebar', () => {
    expect(component.find('.sidebar--right')).to.be.present();
  });

});
