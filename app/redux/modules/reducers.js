import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import { currentSearch } from '../../reducers/search';
import { currentTrackSummaryData } from '../../reducers/track-summary';
import { autocomplete } from '../../reducers/autocomplete';
import { currentVideo } from '../../reducers/video-player';
import { albumPage } from '../../reducers/album-page';
import { artistPage } from '../../reducers/artist-page';
import { topArtists } from '../../reducers/top-artists';
import { videoData } from '../../reducers/video-data';
import { playQueue } from '../../reducers/play-queue';
import { authenticated } from '../../reducers/auth';

import { loggedIn, loggedOut } from '../../actions/auth';

const reducers = combineReducers(
  {
    currentSearch,
    currentTrackSummaryData,
    currentVideo,
    videoData,
    albumPage,
    autocomplete,
    authenticated,
    artistPage,
    topArtists,
    playQueue,
    routing: routerReducer,
  }
);

export default reducers;
