import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTracks, searchPerformed } from '../actions/SearchActions'
import Search from '../components/Search'
import SearchAutoComplete from '../components/SearchAutoComplete'   

class App extends Component {
    render() {
        const { dispatch, currentSearch, artists, albums, tracks } = this.props;
       
        return (
            <div>
                <h1>Youtube/LastFm streaming music app with React/Redux</h1>
                <Search onSearch={ text => dispatch(searchPerformed(text)) } />
                <SearchAutoComplete artists={artists} tracks={tracks} albums={albums} currentSearch={currentSearch} />

            </div>
        )
    }
}

function select(state) {
    return {
        currentSearch : state.currentSearch,
        artists : state.currentArtistResults,
        tracks : state.currentTrackResults,
        albums : state.currentAlbumResults
    }
}

export default connect(select)(App)


