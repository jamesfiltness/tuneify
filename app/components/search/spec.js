import React from 'react';
import { Search } from './';
import sinon from 'sinon';

let component;
let onSearchSpy;

beforeEach(() => {  
  onSearchSpy = sinon.spy();
  
  component = mount(
    <Search
      onSearch={onSearchSpy}
    />
  );
});


      //<div className="search">
      //  <input
      //    className="search__input"  
      //    type="text"
      //    autoFocus
      //    ref={(input) => this.input = input} 
      //    placeholder="Artist, Album or Track"
      //    onChange={() => this.handleSearch()} 
      //  />
      //</div>
    
afterEach(() => {
  onSearchSpy.reset();
});

describe.only('Search component  component', () => {
  it('renders a wrapping search div', () => {
    expect(component.find('.search')).to.be.present();
  });
  
  it('renders the search input', () => {
    expect(component.find('.search__input')).to.be.present();
  });

  it('renders the correct placeholder', () => {
    expect(
      component.find('.search__input'))
        .to.have.attr('placeholder', 'Artist, Album or Track');
  });
  
  it('calls the onSearch callback when text is entered in to the input', () => {
    component = mount(
      <Search
        onSearch={onSearchSpy}
      />
    );
    
    const input = component.find('input');
    input.node.value = 'Radiohead';
    input.simulate('change');
    expect(onSearchSpy).to.have.been.calledWith('Radiohead');
  });
});  
