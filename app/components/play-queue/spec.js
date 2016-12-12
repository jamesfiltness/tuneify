import React from 'react';
import { PlayQueue } from './';
import sinon from 'sinon';

let component;
let onPlayQueueTrackSelectedSpy;
let onRemoveTrackFromQueueSpy;

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
  onPlayQueueTrackSelectedSpy = sinon.spy();
  onRemoveTrackFromQueueSpy = sinon.spy();
  
  component = mount(
    <PlayQueue 
      onRemoveTrackFromQueue={onRemoveTrackFromQueueSpy}
      onPlayQueueTrackSelected={onPlayQueueTrackSelectedSpy}
      tracks={tracks} 
    />
  );
});

describe('PlayQueue component', () => {
  it('renders the playQueue placeholder if no tracks are provided', () => {
    component = shallow(
      <PlayQueue />
    );

    expect(component.find('.play-queue__placeholder')).to.be.present();
  });
  
  it('renders the PlayQueue wrapper', () => {
    expect(component.find('.play-queue')).to.be.present();
  });
  
  it('renders the PlayQueue list', () => {
    expect(component.find('.play-queue__list')).to.be.present();
  });

  it('renders the correct amount of tracks', () => {
    expect(component.find('.play-queue__list-item')).to.have.length(2);
  });
  
  it('renders the correct track with a selected class', () => {
    expect(component.find('.play-queue__list-item').at(0)).to.have.className('play-queue__list-item--selected');
  });

  it('renders the artist with the correct text', () => {
    const trackOne = component.find('.play-queue__list-item').at(0);
    expect(trackOne.find('.play-queue__artist')).to.have.text('Radiohead'); 
  });
  
  it('renders the trackName  with the correct text', () => {
    const trackOne = component.find('.play-queue__list-item').at(0);
    expect(trackOne.find('.play-queue__track')).to.have.text('Airbag'); 
  });

  it('renders the remove track icon with the correct text', () => {
    const trackOne = component.find('.play-queue__list-item').at(0);
    expect(trackOne.find('.play-queue__remove-track')).to.be.present(); 
  });

  it('when the remove track button is clicked the callback should be called with the correct args', () => {
    const trackOne = component.find('.play-queue__list-item').at(0);
    trackOne.find('.play-queue__remove-track').simulate('click');
    expect(onRemoveTrackFromQueueSpy).to.have.been.calledWith(0);
  });
  
  it('when a track is clicked on the onPlayQueueTrackSelected callback should be called', () => {
    const trackTwo = component.find('.play-queue__list-item').at(1);
    trackTwo.simulate('click');
    expect(onPlayQueueTrackSelectedSpy).to.have.been.calledWith(
      { 
        "@attr": { rank: "2" }, 
        artist: { name: "Radiohead" }, 
        name: "Paranoid Android" 
      }, 1);
  });
  
  it('when playQueueCurrentIndex prop is updated the current track should be updated', () => {
    component.setProps({ playQueueCurrentIndex: 1 })
    const trackTwo = component.find('.play-queue__list-item').at(1);
    expect(trackTwo).to.have.className('play-queue__list-item--selected');
  });
});
