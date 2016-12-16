import React from 'react';
import { YouTubePlayer } from './';
import sinon from 'sinon';

/* TODO: Add missing unit tests: There's a lot not covered here */
let component;
let loadPlayerIframeStub;

beforeEach(() => {  
  loadPlayerIframeStub = sinon.stub(YouTubePlayer.prototype, 'loadPlayerIframe').returns(false);
  component = mount(
    <YouTubePlayer />
  );
});

afterEach(() => {
  loadPlayerIframeStub.restore();
});

describe('YouTubePlayer component', () => {
  it('renders a wrapping youtube-player div', () => {
    expect(component.find('.youtube-player')).to.be.present();
  });

  it('renders a youtube-player-wrap div', () => {
    expect(component.find('.youtube-player__player-wrap')).to.be.present();
  });

  it('renders a container for the actual youtube player', () => {
    expect(component.find('#player')).to.be.present();
  });

  it('renders a progress bar', () => {
    expect(component.find('.youtube-player__progress-bar')).to.be.present();
  });

  it('renders a div to display the buffered percentage', () => {
    expect(component.find('.youtube-player__buffered')).to.be.present();
  });

  it('renders a div to display the elapsed percentage', () => {
    expect(component.find('.youtube-player__elapsed')).to.be.present();
  });

  it('renders the player controls', () => {
    expect(component.find('.youtube-player__controls')).to.be.present();
  });

  it('renders the prev track button', () => {
    expect(component.find('.youtube-player__prev-track')).to.be.present();
  });

  it('renders the next track button', () => {
    expect(component.find('.youtube-player__next-track')).to.be.present();
  });

  it('renders the time display', () => {
    const timeDisplay = component.find('.youtube-player__time');
    expect(timeDisplay.find('.youtube-player__total-time')).to.be.present();
    expect(timeDisplay.find('.youtube-player__elapsed-time')).to.be.present();
    expect(timeDisplay.find('.youtube-player__divider')).to.be.present();
  });

  it('renders the volume', () => {
    expect(component.find('.youtube-player__volume')).to.be.present();
    expect(component.find('.youtube-player__volume-control')).to.be.present();
  });

  it('renders the mute button as initally unmuted', () => {
    expect(
      component
        .find('.youtube-player__mute-unmute'))
        .to.have.className('youtube-player__mute-unmute--unmuted');
  });
});
