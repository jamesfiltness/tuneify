import React, { PropTypes } from 'react';

// TODO: should be stateless
export class SearchAutoCompleteThumbnail extends React.Component {
  render() {
    let { thumb, altText }  = this.props;
    let img;
    
    // TODO: This needs some work
    if (thumb[0]['#text'] === '') {
	    img = 'http://placehold.it/34x34'
	  } else {
	    img = thumb[0]['#text'];
	  }
    
    return (
      <img src={img} alt={altText} width="34" height="34" />
    )
  }
}

SearchAutoCompleteThumbnail.propTypes = {
  thumb: PropTypes.array,
  altText: PropTypes.string,
};

export default SearchAutoCompleteThumbnail
