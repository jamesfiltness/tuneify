import React from 'react';
import PageNotFound from './';

describe('PageNotFound component', () => {
  it('renders the correct page not found text', () => {
    const pageNotFound = shallow(<PageNotFound />);
    expect(pageNotFound.find('h3')).to.have.text('Page not found');
  });
});

