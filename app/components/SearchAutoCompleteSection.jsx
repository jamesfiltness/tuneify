import React, { Component, PropTypes } from 'react'

export default class SearchAutoCompleteSection extends Component {
    render() {
        let { title , data }  = this.props;
        return (
        <div className="autocomplete__section">
          <h3 className="autocomplete__heading">{title}</h3>
         <ul>{data.map(function(result, i) {
         
            let img;
            if(result.image[0]['#text'] === '') {
                img = 'http://placehold.it/34x34'
            } else {
                img = result.image[0]['#text'];
            }
            return <li key={i}><img src={img} alt={result.name} width="34" height="34" />{result.name}</li>; })}
          </ul>
          </div>
        )
    }
}

