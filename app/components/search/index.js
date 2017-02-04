import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

export class Search extends React.Component {
  static PropTypes = {
    onSearch: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.handleSearch = _.throttle(this.handleSearch, 1000);

    this.state = {
      searching: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const searching = nextProps.searching;
    
    this.setState({
      searching, 
    });
  }

  searching() {
    return this.state.searching ? 
      <i className="search__wait fa fa-circle-o-notch fa-spin fa-fw"></i> :
      null
  }
  
  render() {
    return (
      <div className="search">
        <input
          className="search__input"  
          type="text"
          autoFocus
          ref={(input) => this.input = input} 
          placeholder="Artist, Album or Track"
          onChange={() => this.handleSearch()} 
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        {this.searching()}
      </div>
    )
  }

  handleSearch() {
    const text = this.input.value;
    this.props.onSearch(text)
  }
}

function mapStateToProps(state) {
  return {
    searching: state.search.searching,
  }
}

export default connect(
  mapStateToProps,
)(Search);

