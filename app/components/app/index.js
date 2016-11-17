import React from 'react';
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

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { 
      dispatch, 
      currentTrack,
      artists, 
      albums, 
      tracks,
      videoData,
      playQueueTracks,
      trackSummary,
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
          <CurrentTrackSummary trackData={trackSummary} />
          <YouTubePlayer videoData={videoData} />
          <PlayQueue tracks={playQueueTracks} />
          <PlayQueueTools />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    currentSearch : state.currentSearch,
    artists : state.autocomplete.autocompleteArtistData,
    tracks : state.autocomplete.autocompleteTrackData,
    albums : state.autocomplete.autocompleteAlbumData,
    currentTrack: state.currentTrack,
    videoData: state.videoData,
    playQueueTracks: state.playQueue.playQueueTracks,
    trackSummary: state.currentTrackSummaryData,
  }
}

export default connect(mapStateToProps)(App)
