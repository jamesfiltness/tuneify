import React from 'react'

class SearchAutoCompleteThumbnail extends React.Component {
	render() {
    	let { thumb, altText }  = this.props;
        let img;

        if(thumb[0]['#text'] === '') {
	        img = 'http://placehold.it/34x34'
	    } else {
	        img = thumb[0]['#text'];
	    }

        return (
          <img src={img} alt={altText} width="34" height="34" />
        )

	}
}

export default SearchAutoCompleteThumbnail
