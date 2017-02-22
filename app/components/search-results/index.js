import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  getFullSearchResults,
  searchResultTrackSelected,
} from '../../actions/search-results';

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

  // TODO: Obviously remove the repitition here
  // Can just be a func that accepts an array of data
  // and returns the structure below
  artistResults() {
    return (
      <div className="content-result">
        <h3 className="uppercase">
          Artists
        </h3>
        <ul className="content-result__list">
          {
            this.props.artistResults.map((result, i) => {
              return (
                <li
                  key={i}
                  className="content-result__item"
                >
                  <Link
                    to={`/artist/${result.mbid}`}
                    className="content-result__link"
                  >
                    <img
                      className="content-result__image"
                      src={result.image[2]['#text']}
                      alt={result.name}
                    />
                    <span className="content-result__text">
                      {result.name}
                    </span>
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
      <div className="content-result">
        <h3 className="uppercase">
          Albums
        </h3>
        <ul className="content-result__list">
          {
            this.props.albumResults.map((result, i) => {
              return (
                <li
                  key={i}
                  className="content-result__item"
                >
                  <Link
                    to={`/album/${result.mbid}`}
                    className="content-result__link"
                  >
                    <img
                      className="content-result__image"
                      src={result.image[2]['#text']}
                      alt={result.name}
                    />
                    <span className="content-result__text">
                      {result.name}
                    </span>
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
      <div className="content-result">
        <h3 className="uppercase">
          Tracks
        </h3>
        <ul className="content-result__list">
          {
            this.props.trackResults.map((result, i) => {
              return (
                <li
                  key={i}
                  className="content-result__item"
                  onClick={
                    () => {
                      this.props.searchResultTrackSelected(result)
                    }
                  }
                >
                  <img
                    className="content-result__image"
                    src={result.image[2]['#text']}
                    alt={result.name}
                  />
                  <span className="content-result__text">
                    {result.name}
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  render() {
    if (this.props.currentSearch) {
      if (
        this.props.artistResults.length ||
        this.props.albumResults.length ||
        this.props.trackResults.length
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
          <div className="route-content-spinner" />
        )
      }
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
  searchResultTrackSelected,
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
