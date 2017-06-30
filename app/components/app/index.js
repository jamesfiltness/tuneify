import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { searchPerformed } from '../../actions/search';
import { playVideo, pauseBySpacebar } from '../../actions/player';

import Search from '../search';
import SearchAutoComplete from '../autocomplete';
import YouTubePlayer from '../youtube-player';
import PlayQueue from '../play-queue';
import PlayQueueTools from '../play-queue-tools';
import CurrentTrackSummary from '../current-track-summary';
import UserSidebar from '../user-sidebar';
import Login from '../login';
import Modal from '../modal';

export class App extends React.Component {

  static propTypes = {
    currentSearch: PropTypes.string,
    artists: PropTypes.array,
    tracks: PropTypes.array,
    albums: PropTypes.array,
    children: React.PropTypes.object,
    playQueueTracks: React.PropTypes.array,
    trackSummary: React.PropTypes.object,
    videoData: React.PropTypes.array,
  };

  constructor() {
    super();

    this.state = {
      searchFocused: false,
    }

    document.onkeydown = (e) => {
      // If the user has clicked the spacebar
      // and the element is not an input
      // and there is video data
      if (
        e.keyCode == 32 &&
        e.target.type !== 'text' &&
        this.props.videoData.length
      ) {
        e.preventDefault();
        this.props.pauseBySpacebar();
      }
    }
  }

  searchFocused() {
    this.setState({
      searchFocused: true,
    });
  }

  searchBlurred() {
    this.setState({
      searchFocused: false,
    });
  }

  isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (
      /windows phone/i.test(userAgent) ||
      /android/i.test(userAgent) ||
      (/iPhone|iPod/.test(userAgent) && !window.MSStream)) {
      return true;
    }

    return false;
  }

  renderMobileMessage() {
    return (
      <div className="mobile-message">
        <h1>Sorry!</h1>
        <p>Tuneify doesn't currently support mobile devices and is best viewed on a desktop or tablet device.</p>
        <p>We are considering building a mobile app. Follow us on Facebook to keep updated!</p>
          <div
            className="fb-follow fb-follow--mobile"
            data-href="https://www.facebook.com/zuck"
            data-layout="button"
            data-size="large"
          />
      </div>
    )
  }

  renderApp() {
    const {
      artists,
      albums,
      tracks,
      videoData,
      playQueueTracks,
      trackSummary,
      authService,
      searchPerformed,
    } = this.props;

    return (
      <div className="app">
        <Modal />
        <header className="header">
          <div
            className="fb-follow"
            data-href="https://www.facebook.com/zuck"
            data-layout="button"
            data-size="large"
          >
          </div>
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
              onFocus={this.searchFocused.bind(this)}
              onBlur={this.searchBlurred.bind(this)}
              onSearch={
                text => searchPerformed(text)
              }
            />
          </div>
          <Login authService={authService} />
        </header>
        <SearchAutoComplete
          artists={artists}
          tracks={tracks}
          albums={albums}
          searchFocused={this.state.searchFocused}
        />
        <div className="route-content">
          {this.props.children}
        </div>
        <UserSidebar />
        <div className="sidebar sidebar--right">
          <CurrentTrackSummary
            name={trackSummary.name}
            artist={trackSummary.artist}
            image={trackSummary.image}
          />
          <YouTubePlayer videoData={videoData} />
          <PlayQueue tracks={playQueueTracks} />
          <PlayQueueTools />
        </div>
      </div>
    )
  }

  render() {
    return this.isMobile() ? this.renderMobileMessage() : this.renderApp();
  }
}

const mapDispatchToProps = {
  pauseBySpacebar,
  searchPerformed,
}

function mapStateToProps(state) {
  return {
    currentSearch: state.search.currentSearch,
    artists: state.autocomplete.autocompleteArtistData,
    tracks: state.autocomplete.autocompleteTrackData,
    albums: state.autocomplete.autocompleteAlbumData,
    videoData: state.videoData,
    playQueueTracks: state.playQueue.playQueueTracks,
    trackSummary: state.currentTrackSummaryData,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
