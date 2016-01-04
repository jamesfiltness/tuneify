import styles from './autocomplete.css'

import React, { Component, PropTypes } from 'react'

export default class SearchAutoCompleteSection extends Component {
    render() {
        let { title , data, onSelectTracks }  = this.props;
        return (
          <div className={styles.section}>
            <h3 className={styles.heading}>{title}</h3>
            <ul className={styles.list}>{data.map((result, i) => {
              let img;
            if(result.image[0]['#text'] === '') {
                img = 'http://placehold.it/34x34'
            } else {
                img = result.image[0]['#text'];
            }
            return <li onClick={this.handleSelection.bind(this,result.name)} className={styles.list_item} key={i}><img src={img} className={styles.thumbnail} alt={result.name} width="34" height="34" />{result.name}<span className={styles.artist}>{result.artist}</span></li>; })}
          </ul>
          </div>
        )
    }

    handleSelection(result) {
        this.props.onSelectTrack(result);   
    }
}

