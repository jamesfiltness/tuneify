import React from 'react';
import SearchAutoCompleteSection from '../search-autocomplete-section';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

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

    this.onRouteChange();
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
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick.bind(this), false);
    window.removeEventListener('resize', this.handleDocumentResize.bind(this), false);
  }

  onRouteChange() {
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
    if (!this.autoComplete.contains(e.target)) {
      this.setState({
        autoCompleteVisible: false,
      }); 
    }
  }

  onWindowResize() {
  
  }

  onWindowClick() {
  
  }
  
  //get the left position of the element in question
  getSearchPosition() {
    
  }

  render() {
    const { 
      dispatch,
      artists,
      tracks,
      albums
    }  = this.props;
    
    return (
    <div 
      className="autocomplete__wrap"
      ref={(autoComplete) => this.autoComplete = autoComplete }
    >
    {this.state.autoCompleteVisible ?
        <div 
          className="autocomplete"
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
      :  null
    }
      </div>
      );
}
}
export default connect()(SearchAutoComplete)
