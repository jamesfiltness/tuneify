import React from 'react';
import { SearchAutoComplete } from './';
import sinon from 'sinon';

let component;
let onAutocompleteTrackSelectedSpy;

beforeEach(() => {  
  onAutocompleteTrackSelectedSpy = sinon.spy();
  
  component = mount(
    <SearchAutoComplete
      onAutocompleteTrackSelected={onAutocompleteTrackSelectedSpy}
    />
  );
});

// TODO: work out a way to test a resize event
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
  
  it('should hide the autocomplete if the body is clicked on', () => {
    component.setProps({
      tracks: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      albums: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      artists: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}]
    });
    expect(component.find('.autocomplete')).to.be.present();
    document.body.click();
    expect(component.find('.autocomplete')).to.not.be.present();
  });

  it('should call the callback when a track result is clicked on', () => {
    component.setProps({
      tracks: [{ artist: 'Radiohead', name: 'Airbag', image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      albums: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}],
      artists: [{ image: [{'#text': 'http://example.com/som-img.jpg'}]}]
    });
    const track = component.find('.autocomplete-section').at(1).find('.autocomplete-section__list-item div').at(0);
    track.simulate('click');
    expect(onAutocompleteTrackSelectedSpy).to.have.been.called;
  });
});
