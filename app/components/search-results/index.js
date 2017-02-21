import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getFullSearchResults } from '../../actions/search-results';

export class SearchResults extends React.Component {

  componentDidMount() {
    if (this.props.currentSearch.length) {
      this.props.getFullSearchResults(this.props.currentSearch);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentSearch &&
      nextProps.currentSearch.length &&
      this.props.currentSearch !== nextProps.currentSearch
    ) {
      this.props.getFullSearchResults(nextProps.currentSearch);
    }
  }

  artistResults() {
    return (
      <div className="search-results__artists">
        <h3 className="search-results__heading">
          Artists
        </h3>
        <ul>
          {
            this.props.artistResults.map((result, i) => {
              return (
                <li key={i}>
                  <Link to={`/artist/${result.mbid}`}>
                    <img
                      src={result.image[1]['#text']}
                      alt={result.name}
                    />
                    <span>{result.name}</span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  albumResults() {
    return (
      <div className="search-results__albums">
        <h3 className="search-results__heading">
          Albums
        </h3>
        <ul>
          {
            this.props.albumResults.map((result, i) => {
              return (
                <li key={i}>
                  <Link to={`/album/${result.mbid}`}>
                    <img
                      src={result.image[1]['#text']}
                      alt={result.name}
                    />
                    <span>{result.name}</span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  trackResults() {
    return (
      <div className="search-results__tracks">
        <h3 className="search-results__heading">
          Tracks
        </h3>
        <ul>
          {
            this.props.trackResults.map((result, i) => {
              return (
                <li key={i}>
                  <img
                    src={result.image[1]['#text']}
                    alt={result.name}
                  />
                  <span>{result.name}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    if (
      (
        this.props.artistResults.length ||
        this.props.albumResults.length ||
        this.props.trackResults.length
      ) &&
      this.props.currentSearch
    ) {
      return (
        <div className="search-results page-with-padding">
          {this.artistResults()}
          {this.albumResults()}
          {this.trackResults()}
        </div>
      )
    } else {
      return (
        <div className="search-results page-with-padding">
          <p>No Search entered.</p>
        </div>
      )
    }
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
