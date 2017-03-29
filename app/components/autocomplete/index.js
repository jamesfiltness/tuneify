import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import SearchAutoCompleteSection from '../autocomplete-section';
import { autocompleteTrackSelected } from '../../actions/search';

export class SearchAutoComplete extends React.Component {
  static PropTypes = {
    artists: PropTypes.array,
    albums: PropTypes.array,
    tracks: PropTypes.array,
    autoCompleteTrackSelected: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      autoCompleteVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    let autoCompleteVisible = false;

    if (
      nextProps.artists.length ||
      nextProps.tracks.length ||
      nextProps.albums.length &&
      nextProps.searchFocused
    ) {
      autoCompleteVisible = true;
    }

    this.setState({
      autoCompleteVisible,
    });
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick.bind(this), false);
    window.addEventListener('resize', this.handleDocumentResize.bind(this), false);

    this.handleRouteChange();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick.bind(this), false);
    window.removeEventListener('resize', this.handleDocumentResize.bind(this), false);
  }

  handleRouteChange() {
    browserHistory.listen( location =>  {
      this.setState({
        autoCompleteVisible: false,
      });
    });
  }

  handleDocumentResize() {
    this.setState({
      autoCompleteVisible: false,
    });
  }

  handleDocumentClick(e) {
    if (
      this.state.autoCompleteVisible &&
      e.target.className !== 'search__input'
    ) {
      this.setState({
        autoCompleteVisible: false,
      });
    }
  }

  render() {
    const {
      artists,
      tracks,
      albums
    }  = this.props;

    if (this.state.autoCompleteVisible) {
      return (
        <div
          className="autocomplete"
          ref={(autoComplete) => this.autoComplete = autoComplete }
        >
         <SearchAutoCompleteSection
            title="Artists"
            data={artists}
          />
          <SearchAutoCompleteSection
            title="Tracks"
            data={tracks}
            onSelectResult={
             (searchParams) => {
               this.props.autocompleteTrackSelected(searchParams)
             }
            }
          />
          <SearchAutoCompleteSection
            title="Albums"
            data={albums}
          />
          <Link
            to="/search"
            className="autocomplete__view-more view-more"
          >
            <i className="fa fa-search-plus" aria-hidden="true"></i>
            <span className="view-more__link">
              {`More results for "${this.props.currentSearch}"`}
            </span>
          </Link>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = {
  autocompleteTrackSelected,
};

function mapStateToProps(state) {
  return {
    currentSearch: state.search.currentSearch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchAutoComplete)
