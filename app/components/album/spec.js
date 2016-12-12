import React from 'react';
import { Album } from './';
import sinon from 'sinon';

describe('Album component', () => {
  let component;
  let albumStub;
  let clearAlbumErrorSpy;
  let getAlbumDataSpy;
  let clearAlbumDataSpy;
  let appendAlbumSpy;
  let appendTrackAndPlaySpy;
  let replaceAlbumAndPlaySpy;
  
  const tracks = [
    {
      "name": "Airbag",
      "@attr": {"rank":"1"},
      "artist": {
        "name":"Radiohead",
      }
    },
    {
      "name": "Paranoid Android",
      "@attr": {"rank":"2"},
      "artist": {
        "name":"Radiohead",
      }
    }
  ];

  beforeEach(() => {
    clearAlbumErrorSpy = sinon.spy();
    getAlbumDataSpy = sinon.spy();
    clearAlbumDataSpy = sinon.spy();
    appendAlbumSpy = sinon.spy();
    appendTrackAndPlaySpy = sinon.spy();
    replaceAlbumAndPlaySpy = sinon.spy();
     
    component = shallow(
      <Album
        onClearAlbumPageError={clearAlbumErrorSpy} 
        onGetAlbumPageData={getAlbumDataSpy}
        onClearAlbumPageData={clearAlbumDataSpy}
        onAppendAlbumToPlayQueue={appendAlbumSpy}
        onAppendTrackToPlayQueueAndPlay={appendTrackAndPlaySpy}
        onReplaceQueueWithAlbumAndPlay={replaceAlbumAndPlaySpy}
        params={{mbid: 'some-mbid'}}
        albumPageData={{
          name: "Ok Computer",
          image: 'http://example.com/image.jpg',
          tracks: tracks
        }}
      />
    );
  });

  afterEach(() => {
    clearAlbumErrorSpy.reset();
    getAlbumDataSpy.reset();
    clearAlbumDataSpy.reset();
    appendAlbumSpy.reset();
    appendTrackAndPlaySpy.reset();
    replaceAlbumAndPlaySpy.reset();
  })

  it('renders the album wrapper', () => {
    expect(component.find('.album')).to.be.present();
  });
  
  it('renders the album heading', () => {
    expect(component.find('.album__header-name')).to.have.text('Ok Computer');
  });
  
  it('renders the album image', () => {
    expect(component.find('.album__header-image')).to.have.attr('src', 'http://example.com/image.jpg');
  });
  
  it('renders the error message when one is provided', () => {
    component = shallow(
      <Album
        onClearAlbumPageError={clearAlbumErrorSpy} 
        onGetAlbumPageData={getAlbumDataSpy}
        onClearAlbumPageData={clearAlbumDataSpy}
        onAppendAlbumToPlayQueue={appendAlbumSpy}
        onAppendTrackToPlayQueueAndPlay={appendTrackAndPlaySpy}
        onReplaceQueueWithAlbumAndPlay={replaceAlbumAndPlaySpy}
        albumPageData={{
          error: "Some error",          
        }}
      />
    );
    expect(component.find('h3')).to.have.text('No album found for this search result.');
  });
  
  it('renders the spinner if no album data is provided', () => {
    component = shallow(
      <Album
        onClearAlbumPageError={clearAlbumErrorSpy} 
        onGetAlbumPageData={getAlbumDataSpy}
        onClearAlbumPageData={clearAlbumDataSpy}
        onAppendAlbumToPlayQueue={appendAlbumSpy}
        onAppendTrackToPlayQueueAndPlay={appendTrackAndPlaySpy}
        onReplaceQueueWithAlbumAndPlay={replaceAlbumAndPlaySpy}
      />
    );
    expect(component.find('.route-content-spinner')).to.be.present();
  });

  it('if a new mbid param is provided the page should be updated', () => {
    component.setProps(
      { params: { mbid: 'some-other-mbid' } }
    );
    expect(clearAlbumDataSpy).to.have.been.called;
    expect(clearAlbumErrorSpy).to.have.been.called;
    expect(getAlbumDataSpy).to.have.been.calledWith({ mbid: 'some-other-mbid' });
  });

  it('if a new album param is provided the page should be updated', () => {
    component.setProps(
      { params: { album: 'Leige and Leife', artist: 'The Fairport Convention' } }
    );
    expect(clearAlbumDataSpy).to.have.been.called;
    expect(clearAlbumErrorSpy).to.have.been.called;
    expect(getAlbumDataSpy).to.have.been.calledWith({ album: 'Leige and Leife', artist: 'The Fairport Convention'});
  });

  it('if the same mbid param is provided the page should not be updated', () => {
    component.setProps(
      { params: { mbid: 'some-mbid' } }
    );
    expect(getAlbumDataSpy).to.not.have.been.called;
  });

  it('if new album data has been proided via props the component should be updated', () => {
    component.setProps( 
      {
        albumPageData: {
          name: "The Cure",
          image: 'http://example.com/image.jpg',
        }
      }
    );

    expect(component.find('.album__header-name')).to.have.text('The Cure');
  });
  
  it('renders the track table', () => {
    expect(component.find('.album__tracks-table')).to.be.present();        
  });
   
  it('renders the correct amount of rows', () => {
    expect(component.find('.album__track-row')).to.have.length(2);        
  });
  
  it('renders two table cells', () => {
    const trackRow = component.find('.album__track-row').at(0);
    expect(trackRow.find('.album__track-cell')).to.have.length(2);
  });

  it('renders the correct track rank', () => {
    const trackRow = component.find('.album__track-row').at(0);
    const cellOne = trackRow.find('.album__track-cell').at(0);
    expect(cellOne.find('.album__track-rank')).to.have.text(1);
  });
  
  it('renders the track play button as initially hidden', () => {
    const trackRow = component.find('.album__track-row').at(0);
    const cellOne = trackRow.find('.album__track-cell').at(0);
    expect(cellOne.find('.album__track-play')).to.be.present();
  });
  
  it('renders the track name in the correct cell', () => {
    const trackRow = component.find('.album__track-row').at(0);
    const cellTwo = trackRow.find('.album__track-cell').at(1);
    expect(cellTwo).to.have.text("Airbag");
  });
  
  it('calls the appendAlbumToPlayQueue callback when the Queue album button is clicked', () => {
    const queueAlbumButton = component.find('.button--add');
    queueAlbumButton.simulate('click');
    expect(appendAlbumSpy).to.have.been.calledWith(tracks);
  });
  
  it('calls the onReplaceAlbumQueueAndPlay callback when the play album button is clicked', () => {
    const playAlbumButton = component.find('.button--play');
    playAlbumButton.simulate('click');
    expect(replaceAlbumAndPlaySpy).to.have.been.calledWith(tracks);
  });
  
  it('calls the onReplaceTrackAndPlay when a track play button is clicked', () => {
    const trackRow = component.find('.album__track-row').at(0);
    trackRow.simulate('click');
    expect(appendTrackAndPlaySpy).to.have.been.calledWith({ "@attr": { rank: "1" }, artist: { name: "Radiohead" }, name: "Airbag" });
  });
});
