import React from 'react'
import SearchAutoCompleteThumbnail from '../search-autocomplete-thumbnail'

class SearchAutoCompleteSection extends React.Component {
  constructor() {
    super();

    this.handleSelection = this.handleSelection.bind(this);
  }

  render() {
    const { 
      title, 
      data, 
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
                        this.handleSelection(result.name)
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

    handleSelection(result) {
    }
}

export default SearchAutoCompleteSection
