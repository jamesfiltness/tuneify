import React from 'react'
import SearchAutoCompleteSection from '../search-autocomplete-section'
import { connect } from 'react-redux'

import { 
  autocompleteTrackSelected,
  autocompleteArtistSelected,
  autocompleteAlbumSelected,
} from '../../actions/search-actions'

class SearchAutoComplete extends React.Component {
  render() {
    const { 
      artists, 
      tracks,
      albums,
      dispatch,
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
            onSelectResult={
              searchParams => dispatch(
                autocompleteTrackSelected(searchParams)
              )
            }
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

export default connect()(SearchAutoComplete)
