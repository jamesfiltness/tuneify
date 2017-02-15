import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import { search } from '../../reducers/search';
import { currentTrackSummaryData } from '../../reducers/track-summary';
import { autocomplete } from '../../reducers/autocomplete';
import { videoPlayer } from '../../reducers/video-player';
import { albumPage } from '../../reducers/album-page';
import { artistPage } from '../../reducers/artist-page';
import { topArtists } from '../../reducers/top-artists';
import { videoData } from '../../reducers/video-data';
import { playQueue } from '../../reducers/play-queue';
import { authenticated } from '../../reducers/auth';
import { playlists } from '../../reducers/playlists';
import { modal } from '../../reducers/modal';

import { loggedIn, loggedOut } from '../../actions/auth';

const reducers = combineReducers(
  {
    search,
    currentTrackSummaryData,
    videoPlayer,
    videoData,
    albumPage,
    autocomplete,
    authenticated,
    artistPage,
    topArtists,
    playQueue,
    playlists,
    modal,
    routing: routerReducer,
  }
);

export default reducers;
