import styles from './autocomplete.css'

import React, { Component, PropTypes } from 'react'

export default class SearchAutoCompleteSection extends Component {
    render() {
        let { title , data, onSelectTracks }  = this.props;

        return (
          <div>
            <h3>{title}</h3>
            <ul>{data.map((result, i) => {
              return <li onClick={this.handleSelection.bind(this,result.name)} key={i}><span>{result.name}</span><span>{result.artist}</span></li>; })}
          </ul>
          </div>
        )
    }

    handleSelection(result) {
        this.props.onSelectTrack(result);   
    }
}

