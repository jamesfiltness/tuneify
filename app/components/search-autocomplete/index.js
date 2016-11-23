import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SearchAutoCompleteSection from '../search-autocomplete-section';
import { 
  autocompleteTrackSelected,
  autocompleteArtistSelected,
  autocompleteAlbumSelected,
} from '../../actions/search-actions';

class SearchAutoComplete extends React.Component {

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
      nextProps.albums.length ||
      nextProps.showAutoComplete
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
    if (this.state.autoCompleteVisible) {
      if (!this.autoComplete.contains(e.target)) {
        this.setState({
          autoCompleteVisible: false,
        }); 
      }
    }
  }

  render() {
    const { 
      dispatch,
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
              searchParams => dispatch(
                autocompleteTrackSelected(searchParams)
              )
            }
          />
          <SearchAutoCompleteSection 
            title="Albums" 
            data={albums}
          />
        </div>
      )
    } else {
      return null;
    }
  }
}
export default connect()(SearchAutoComplete)
