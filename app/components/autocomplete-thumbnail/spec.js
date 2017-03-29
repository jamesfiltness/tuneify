import React from 'react';
import { SearchAutoCompleteThumbnail } from './';

let component;

beforeEach(() => {  
  component = shallow(
    <SearchAutoCompleteThumbnail
      altText="Some alt text"
      thumb={
        [
          {
           '#text' : 'http://example.com/some-image.jpg', 
          }
        ]
      }
    />
  );
});

describe('SearchAutoCompleteThumbnail component', () => {
  it('renders the image with the correct src', () => {
    expect(component.find('img')).to.have.attr('src', 'http://example.com/some-image.jpg');
  });
  
  it('renders the image with the correct alt text', () => {
    expect(component.find('img')).to.have.attr('alt', 'Some alt text');
  });
  
  it('if no image is present then the component should render a placeholder', () => {
    component = shallow(
      <SearchAutoCompleteThumbnail
        altText="Some alt text"
        thumb={
          [
            {
             '#text' : '', 
            }
          ]
        }
      />
    );
    
    expect(component.find('img')).to.have.attr('src', 'http://placehold.it/34x34');
  });
});
