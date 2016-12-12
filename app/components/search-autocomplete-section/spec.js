import React from 'react';
import { SearchAutoCompleteSection } from './';
import sinon from 'sinon';

let component;
let selectResultSpy;

beforeEach(() => {  
  selectResultSpy = sinon.spy();
  component = mount(
    <SearchAutoCompleteSection
      onSelectResult={selectResultSpy}
      data={
        [
          {
            name: "Airbag",
            artist: "Radiohead",
            image: [
              {
                '#text': 'http://example.com/image.jpg',
              } 
            ]
          }
        ]
      }
      title="Tracks"
    />
  );
});

describe('SearchAutoCompleteSection component', () => {
  it('renders the autocomplete-section wrapper div', () => {
    expect(component.find('.autocomplete-section')).to.be.present();
  });

  it('renders the title with the correct text', () => {
    expect(component.find('.autocomplete-section__title')).to.have.text('Tracks');
  });
  
  it('renders the section list', () => {
    expect(component.find('.autocomplete-section__list')).to.be.present();
  });

  it('renders the correct amount of results', () => {
    expect(component.find('.autocomplete-section__list-item')).to.have.length(1)
  });

  it('renders a result thumbnail', () => {
    expect(component.find('.autocomplete-section__list-item img')).to.have.length(1)
  });
  
  it('renders the result name', () => {
    expect(component.find('.autocomplete-section__target')).to.have.text('Airbag')
  });
  
  it('renders the result artist', () => {
    expect(component.find('.autocomplete-section__artist')).to.have.text('Radiohead')
  });
  
  it('if a track result is clicked on then the callback prop should be called', () => {
    const trackWrapper = component.find('.autocomplete-section__list-item div').at(0)
    trackWrapper.simulate('click');
    expect(selectResultSpy).to.have.been.calledWith(
      {
        artist: "Radiohead",
        image: [{ '#text': "http://example.com/image.jpg" }],
        name: "Airbag"
      }
    );
  });
  // TODO: specs around the links being rendered correctly are needed
  // this is not so straightforward.
  // One possible solution is to render the react router...
});
