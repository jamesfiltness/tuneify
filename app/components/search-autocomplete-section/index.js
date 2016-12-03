import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SearchAutoCompleteThumbnail from '../search-autocomplete-thumbnail';

class SearchAutoCompleteSection extends React.Component {
  
  static PropTypes = {
    onSelectResult: PropTypes.func.isRequired,
    title: PropTypes.string, 
    data: PropTypes.array,
  };
  
  constructor() {
    super();

    this.resultSelected = this.resultSelected.bind(this);
  }
  
  resultSelected(result) {
    this.props.onSelectResult(result);
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
    let path = `/album/${result.mbid}`;
    
    if (!result.mbid) {
      path = `/album/${encodeURIComponent(result.artist)}/${encodeURIComponent(result.name)}`;
    }

    return (
      <Link to={{ pathname: path }}>
        {this.resultContent(result)}
      </Link>
    )
  }

  renderArtistResults(result) {
    let path =  `/artist/${result.mbid}`;
    
    if(!result.mbid) {
      path = `/artist/${encodeURIComponent(result.artist)}`;
    }

    return (
      <Link to={{ pathname: path }}>
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
