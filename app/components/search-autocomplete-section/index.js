import React from 'react'
import SearchAutoCompleteThumbnail from '../search-autocomplete-thumbnail'

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
                    <li 
                      className="autocomplete-section__list-item" 
                      onClick={
                        () => this.resultSelected(result)
                      } 
                      key={i}
                    >
                      <SearchAutoCompleteThumbnail 
                        thumb={result.image} 
                        altText={result.name} 
                      />
                      <span className="autocomplete-section__target">
                        {result.name}
                      </span>
                      <span className="autocomplete-section__artist">
                        {result.artist}
                      </span>
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
