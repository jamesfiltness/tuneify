import React from 'react'
import SearchAutoCompleteSection from '../search-autocomplete-section'

//this component should probably be treated as a top level component
//It should perhaps be connected to the redux store
//reasons:
  //it needs to dispatch an event when a new track is clicked on
  //it needs to disptach when a artist is clicked on and also change route
  //it needs to dispatch when an album is clicked on and also change route
class SearchAutoComplete extends React.Component {
  render() {
    const { 
      artists, 
      tracks,
      albums,
    }  = this.props;

    if(artists.length || tracks.length || albums.length) {
      return (
        <div className="autocomplete">
          <SearchAutoCompleteSection 
            title="Artists" 
            data={artists} 
          />
          <SearchAutoCompleteSection 
            title="Tracks" 
            data={tracks} 
          />
          <SearchAutoCompleteSection 
            title="Albums" 
            data={albums} 
          />
        </div>
      )
    } else {
      return null;
    }
  }
}

export default SearchAutoComplete
