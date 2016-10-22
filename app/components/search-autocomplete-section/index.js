import React from 'react'
import { Link } from 'react-router'
import SearchAutoCompleteThumbnail from '../search-autocomplete-thumbnail'
import prepareStringForUrl from '../../utils/prepare-string-for-url'

class SearchAutoCompleteSection extends React.Component {
  constructor() {
    super();

    this.resultSelected = this.resultSelected.bind(this);
  }
  
  resultSelected(result) {
    const artist = result.artist ? result.artist : '';
    const resultObj = {
      name : result.name,
      artist: artist
    };

    this.props.onSelectResult(resultObj);
  }

  resultContent(result) {
    return (
      <div>
        <SearchAutoCompleteThumbnail 
          thumb={result.image} 
          altText={result.name} 
        />
        <div className="autocomplete-section__item-details">
          <span className="autocomplete-section__target">
            {result.name}
          </span>
          <span className="autocomplete-section__artist">
            {result.artist}
          </span>
        </div>
      </div>
    );
  }

  renderTrackResults(result) {
    return (
      <div onClick={() => this.resultSelected(result)}>
        {this.resultContent(result)}
      </div>
    ) 
  }

  renderAlbumResults(result) {
    // results come through with spaces and uppercase chars
    // this is not ideal for urls - so replace spaces with hyphens
    // and convert to lowercase
    const artist = prepareStringForUrl(result.artist);
    const album = prepareStringForUrl(result.name);
    return (
      <Link to={{ pathname: `/album/${artist}/${album}` }}>
        {this.resultContent(result)}
      </Link>
    )
  }

  renderArtistResults(result) {
    const artist = prepareStringForUrl(result.name);

    return (
      <Link to={{ pathname: `/artist/${artist}` }}>
        {this.resultContent(result)}
      </Link>
    ) 
  }

  render() {
    const { 
      title, 
      data,
      onSelectResult,
    } = this.props;
    
    return (
      <div className="autocomplete-section">
        <h3 className="autocomplete-section__title">{title}</h3>
        <ul className="autocomplete-section__list">
          {
            data.map(
              (result, i) => {
                return (
                  <li className="autocomplete-section__list-item" key={i}>
                    {
                      title === 'Tracks' ? this.renderTrackResults(result) :
                      title === 'Artists' ? this.renderArtistResults(result) :
                      this.renderAlbumResults(result)
                    }
                  </li>
                )
              }
            )
          }
        </ul>
      </div>
    )
  }
}

export default SearchAutoCompleteSection
