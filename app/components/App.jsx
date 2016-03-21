import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { searchPerformed } from '../actions/SearchActions'
import { cueVideo } from '../actions/PlayerActions'

import Search from '../components/Search'
import SearchAutoComplete from '../components/SearchAutoComplete' 
import YouTubePlayer from '../components/YouTubePlayer' 

import styles from '../css/main.css' 

class App extends Component {
    render() {

        const { dispatch, currentVideo, artists, albums, tracks } = this.props;
        
        return (
            <div className={styles.wrap}>
                <Search onSearch={ text => dispatch(searchPerformed(text)) } />
                <SearchAutoComplete 
                  artists={artists} 
                  tracks={tracks} 
                  albums={albums} 
                  onSelectTrack={ videoId => dispatch(cueVideo(videoId)) } />
                <YouTubePlayer currentVideo={currentVideo}></YouTubePlayer>
            </div>
        )
    }
}

function select(state) {
    return {
        currentSearch : state.search.currentSearch,
        currentVideo : state.videoPlayer.currentVideo,
        artists : state.search.currentArtistResults,
        tracks : state.search.currentTrackResults,
        albums : state.search.currentAlbumResults
    }
}

export default connect(select)(App)


