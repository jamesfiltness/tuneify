import React from 'react';
import { UserSidebar } from './';

let component;

beforeEach(() => {  
  component = mount(
    <UserSidebar />
  );
});

describe('UserSidebar  component', () => {
  it('renders a wrapping use-sidebar', () => {
    expect(component.find('.sidebar--left.user-sidebar')).to.be.present();
  });
  
  it('renders the "Discover" heading', () => {
    expect(component.find('.user-sidebar__heading').at(0)).to.have.text('Discover');
  });

  it('renders the "your Music" heading', () => {
    expect(component.find('.user-sidebar__heading').at(1)).to.have.text('Your Music');
  });

  it('renders the "Playlists" heading', () => {
    expect(component.find('.user-sidebar__heading').at(2)).to.have.text('Playlists');
  });

  it('renders the expected items under the "Discover" section', () => {
    const discover = component.find('.user-sidebar__list').at(0);
    expect(discover.find('.user-sidebar__list-item').at(0)).to.have.text('Top Artists');
    expect(discover.find('.user-sidebar__list-item').at(1)).to.have.text('Top Tracks');
    expect(discover.find('.user-sidebar__list-item').at(2)).to.have.text('Trending');
    expect(discover.find('.user-sidebar__list-item').at(3)).to.have.text('Decade');
  });

  it('renders the expected items under the "Your Music" section', () => {
    const yourMusic = component.find('.user-sidebar__list').at(1);
    expect(yourMusic.find('.user-sidebar__list-item').at(0)).to.have.text('Recent plays');
    expect(yourMusic.find('.user-sidebar__list-item').at(1)).to.have.text('Library');
  });

  it('renders the "playlists" heading', () => {
    expect(component.find('.user-sidebar__heading').at(2)).to.have.text('Playlists');
  });
});
