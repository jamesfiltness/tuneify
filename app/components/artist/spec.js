import React from 'react';
import { Artist } from './';
import sinon from 'sinon';

describe('Artist component', () => {
  let component;
  let artistStub; 
  
  beforeEach(() => {
    artistStub = sinon.stub(Artist.prototype, 'getArtistData').returns(false);
    
    component = shallow(
      <Artist
        dispatch={() => {}}
        params={{mbid: 'some-mbid'}}
        artistPageData={{
          name: "Radiohead",
          bio: {
            summary: "some summary about the artist"
          },
          similar: [{
            name: "Thom Yorke",
            image: [
              {"#text": 'http://example.com/thom.jpg'},
              {"#text": 'http://example.com/thom.jpg'}
            ],
          }],
          image: 'http://example.com/image.jpg',
        }}
      />
    );
  });

  afterEach(() => {
    artistStub.restore();
  })

  it('renders the artist wrapper', () => {
   expect(component.find('.artist')).to.have.length(1);
  });
  
  it('renders the artist heading', () => {
    expect(component.find('h3')).to.have.text('Radiohead');
  });
  
  it('renders the artist image', () => {
    expect(component.find('.artist__thumbnail')).to.have.attr('src', 'http://example.com/image.jpg');
  });
  
  it('renders the artist summary bio', () => {
    expect(
      component
        .find('.artist-page__bio')
        .html()
    ).to.be.equal('<div class="artist-page__bio">some summary about the artist</div>');
  });

  it('renders the similar artists wrapper', () => {
    expect(
      component
        .find('.artist-page__similar')
    ).to.have.length(1);
  });
  
  it('renders the similar artists list', () => {
    const listItem = component
      .find('.artist-page__similar-list')
      .find('li')
    
    expect(listItem.find('a')).to.have.text('Thom Yorke');
    expect(listItem.find('img')).to.have.attr('src', 'http://example.com/thom.jpg');
  });
  
  it('renders the error message when one is provided', () => {
    component = shallow(
      <Artist
        dispatch={() => {}}
        artistPageData={{
          error: "Some error",          
        }}
      />
    );
    expect(component.find('h3')).to.have.text('No artist found for this search result.');
  });
  
  it('renders the spinner if no artist data is provided', () => {
    component = shallow(
      <Artist
        dispatch={() => {}}
      />
    );
    expect(component.find('.route-content-spinner')).to.have.length(1);
  });

  it('if a new mbid param is provided the page should be updated', () => {
    component.setProps(
      { params: { mbid: 'some-other-mbid' } }
    );
    expect(artistStub).to.have.been.calledWith({ mbid: 'some-other-mbid' });
  });

  it('if a new artist param is provided the page should be updated', () => {
    component.setProps(
      { params: { artist: '22-20s' } }
    );
    expect(artistStub).to.have.been.calledWith({ artist: '22-20s' });
  });
});
