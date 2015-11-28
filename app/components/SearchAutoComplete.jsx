import React, { Component, PropTypes } from 'react'
import SearchAutoCompleteSection from '../components/SearchAutoCompleteSection'


export default class SearchAutoComplete extends Component {
    render() {
        let { artists , tracks , albums }  = this.props;
        return (
          <div className="autocomplete">
              <SearchAutoCompleteSection title="Artists" data={artists} />
              <SearchAutoCompleteSection title="Tracks" data={tracks} />
              <SearchAutoCompleteSection title="Album" data={albums} />
          </div>
        )
    }
}