import { createStore, combineReducers } from 'redux';
import { currentSearch } from '../../reducers/search';
import { currentTrackSummaryData } from '../../reducers/track-summary';
import { autocomplete } from '../../reducers/autocomplete';
import { currentVideo } from '../../reducers/video-player';
import { albumPage } from '../../reducers/album-page';
import { artistPage } from '../../reducers/artist-page';
import { topArtists } from '../../reducers/top-artists';
import { videoData } from '../../reducers/video-data';
import { playQueue } from '../../reducers/play-queue';

const reducers = combineReducers(
  {
    currentTrackSummaryData,
    currentSearch,
    autocomplete,
    currentVideo,
    albumPage,
    artistPage,
    videoData,
    topArtists,
    playQueue,
  }
);

export default reducers;
