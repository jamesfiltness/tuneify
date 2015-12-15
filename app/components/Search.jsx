import React, { Component, PropTypes } from 'react'
import _ from 'lodash'


export default class Search extends Component {

   constructor() {
       super();
       this.handleSearch = _.throttle(this.handleSearch,1000);
    }
    
    shouldComponentUpdate() {
        return false;
    }

    render() {
       
    	  return (
    	    <div>
              <input type='text' ref='input' value={null} onChange={() => this.handleSearch()} placeholder="Artist, Album or Track" />
            </div>
        )
    }

    handleSearch(e) {
        let { onSearch } = this.props,
            text = this.refs.input.value;

        onSearch(text)
    }
}

