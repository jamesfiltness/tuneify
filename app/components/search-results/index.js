import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getFullSearchResults } from '../../actions/search-results';

export class SearchResults extends React.Component {

  componentDidMount() {
    this.props.getFullSearchResults(this.props.currentSearch);
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className="search-results page-with-padding">
        <p>Search results placeholder</p>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getFullSearchResults,
};

function mapStateToProps(state) {
  return {
    currentSearch: state.search.currentSearch,
    artistResults: state.searchResults.artistData,
    albumResults: state.searchResults.albumData,
    trackResults: state.searchResults.trackData,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults)
