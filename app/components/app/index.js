import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { searchPerformed } from '../../actions/search-actions';
import { playVideo } from '../../actions/player-actions';

import Search from '../search';
import SearchAutoComplete from '../search-autocomplete';
import YouTubePlayer from '../youtube-player';
import PlayQueue from '../play-queue';
import PlayQueueTools from '../play-queue-tools';
import CurrentTrackSummary from '../current-track-summary';
import UserSidebar from '../user-sidebar';
import Login from '../login';

export class App extends React.Component {
  
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    currentSearch: PropTypes.string,
    artists: PropTypes.array,
    tracks: PropTypes.array,
    albums: PropTypes.array,
    children: React.PropTypes.object,
    currentSearch: React.PropTypes.string,
    playQueueTracks: React.PropTypes.array,
    trackSummary: React.PropTypes.object,
  };

  render() {
    const { 
      dispatch,
      artists, 
      albums, 
      tracks,
      videoData,
      playQueueTracks,
      trackSummary,
      authService,
    } = this.props;
    
    return (
      <div className="app">
        <header className="header">
          <div className="header__container">
            <h1 className="header__title">
              <Link 
                className="header__title-link" 
                to="/"
              >
                Tuneify
              </Link>
            </h1>
            <Search 
              onSearch={ 
                text => dispatch(searchPerformed(text)) 
              } 
            />
          </div>
          <Login authService={authService} />
        </header>
        <UserSidebar />
        <SearchAutoComplete
          artists={artists}
          tracks={tracks}
          albums={albums}
        />
        <div className="route-content">
          {this.props.children}
        </div>
        <div className="sidebar sidebar--right">
          <CurrentTrackSummary 
            trackName={trackSummary.trackName}
            artist={trackSummary.artist}
            image={trackSummary.image}
          />
          <YouTubePlayer videoData={videoData} />
          <PlayQueue tracks={playQueueTracks} />
          <PlayQueueTools />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSearch: state.currentSearch,
    artists: state.autocomplete.autocompleteArtistData,
    tracks: state.autocomplete.autocompleteTrackData,
    albums: state.autocomplete.autocompleteAlbumData,
    videoData: state.videoData,
    playQueueTracks: state.playQueue.playQueueTracks,
    trackSummary: state.currentTrackSummaryData,
  }
}

export default connect(mapStateToProps)(App)
