import React, { Component, PropTypes } from 'react'


export default class Search extends Component {
    render() {
    	  return (
    	    <div>
              <input type='text' ref='input' onChange={(e) => this.handleSearch(e)} value={null} placeholder="Artist, Album or Track" />
            </div>
        )
    }

    handleSearch(e) {
        let { onSearch } = this.props,
            text = this.refs.input.value;

        onSearch(text)

 
    }
}

