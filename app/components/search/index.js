import React from 'react'
import _ from 'lodash'

class Search extends React.Component {
    constructor() {
       super();
       this.handleSearch = _.throttle(this.handleSearch, 500);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
      return (
    	  <div className="search">
          <input 
            style={{padding: '15px', fontSize: '20px', marginBottom: '10px'}}
            className="search__input"  
            type="text" 
            ref="input" 
            placeholder="Artist, Album or Track"
            onChange={
              () => this.handleSearch()
            } 
          />
        </div>
      )
    }

    handleSearch(e) {
      const text = this.refs.input.value;
      this.props.onSearch(text)
    }
}

export default Search
