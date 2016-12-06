import React from 'react';
import { Artist } from './';

describe('Artist component', () => {
  let component;
  
  beforeEach(() => {
    component = shallow(
      <Artist
        dispatch={() => {}}
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
});
