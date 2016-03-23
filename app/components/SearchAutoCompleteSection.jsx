import styles from './autocomplete.css'

import React, { Component, PropTypes } from 'react'
import SearchAutoCompleteThumbnail from '../components/SearchAutoCompleteThumbnail.jsx'

export default class SearchAutoCompleteSection extends Component {
    render() {
        let { title , data, onSelectTrack }  = this.props;
        return (
          <div className="autocomplete-section">
            <h3 className="autocomplete-section__title">{title}</h3>
            <ul className="autocomplete-section__list">{data.map((result, i) => {
              return <li className="autocomplete-section__list-item" onClick={this.handleSelection.bind(this,result.name)} key={i}>
                       <SearchAutoCompleteThumbnail thumb={result.image} altText={result.name} />
                       <span className="autocomplete-section__target">{result.name}</span>
                       <span className="autocomplete-section__artist">{result.artist}</span>
                     </li>;
              })}
            </ul>
          </div>
        )
    }

    handleSelection(result) {
        this.props.onSelectTrack(result);
    }
}
