import React from 'react';
import CurrentTrackSummary from './';

describe('CurrentTrackSummary component', () => {
  let component;
  
  beforeEach(() => {
    
    component = shallow(
      <CurrentTrackSummary
        trackName="Sweet Virginia"
        artist="The Rolling Stones"
        image="http://example.com/rolling-stones.jpg"
      />
    );

  });


  it('The track name should have the correct text', () => {
    expect(component.find('.current-track-summary__track-name')).to.have.text('Sweet Virginia');
  });

  it('The track artist should have the correct text', () => {
    expect(component.find('.current-track-summary__artist')).to.have.text('The Rolling Stones');
  });
  
  it('The image should have the correct src', () => {
    expect(component.find('.current-track-summary__thumb'))
      .to.have.attr('src', 'http://example.com/rolling-stones.jpg');
  });
});
