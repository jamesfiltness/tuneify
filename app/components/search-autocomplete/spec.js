import React from 'react';
import { SearchAutoComplete } from './';
import sinon from 'sinon';

let component;

beforeEach(() => {  
  component = mount(
    <SearchAutoComplete />
  );
});

describe('SearchAutoComplete component', () => {
  it('renders the component if there is something to render', () => {
    expect(component.find('.autocomplete')).to.not.be.present();
  });
  
  it('renders the component if there is something to render', () => {
    component.setProps({
      tracks: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      albums: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      artists: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}]
    });

    expect(component.find('.autocomplete')).to.be.present();
  });

  it('renders the artist title correctly', () => {
    component.setProps({
      tracks: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      albums: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      artists: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}]
    });
    
    expect(component.find('.autocomplete-section__title').at(0)).to.have.text('Artists')
  });
  
  it('renders the track title correctly', () => {
    component.setProps({
      tracks: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      albums: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      artists: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}]
    });
    
    expect(component.find('.autocomplete-section__title').at(1)).to.have.text('Tracks')
  });
  
  it('renders the album title correctly', () => {
    component.setProps({
      tracks: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      albums: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      artists: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}]
    });
    
    expect(component.find('.autocomplete-section__title').at(2)).to.have.text('Albums')
  });
});
