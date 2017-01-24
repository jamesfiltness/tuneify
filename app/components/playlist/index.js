import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Track from '../track';
import { 
  addTrackToQueueAndPlay,
} from '../../actions/play-queue';

export class Playlist extends React.Component {
  static propTypes = {
     
  };

  constructor(props) {
    super(props);
    
    this.state = {
      playlistData: null,
    };
  }

  componentDidMount() {
    this.extractPlaylist(this.props);
  }
  
  componentWillReceiveProps(nextProps) {
    this.extractPlaylist(nextProps);   
  }
  
  // get the playlist from the userPlaylists state
  extractPlaylist(props) {
    const playlistId = props.params.playlistid;
    
    if (props.userPlaylists.length) {
      const playlistData = props.userPlaylists.find(playlist => playlist.id === playlistId);
      this.setState({
        playlistData,
      });
    }
  }
  
  render() {
    if (this.state.playlistData) {
      const tracks = JSON.parse(this.state.playlistData.tracks);
      console.log(tracks); 
      return (
        <div className="playlist-page">
          <div className="hero">
            <img 
              src="http://placehold.it/174x174" 
              className="hero__image"
              alt="This will get populated"
              width="174"
              height="174"
            />
            <h5 className="hero__identifier">Playlist</h5>
            <h1 className="hero__name">{this.state.playlistData.name}</h1>
          </div>
          <div className="tracks">
            <table className="tracks__table">
              <thead className="tracks__header">
                <tr>
                  <th 
                    className="tracks__heading tracks__heading--no"
                  >
                    No
                  </th>
                  <th 
                    className="tracks__heading tracks__heading--track"
                  >
                    Track
                  </th>
                  <th 
                    className="tracks__heading tracks__heading--artist"
                  >
                    Artist
                  </th>
                  <th 
                    className="tracks__heading tracks__heading--actions"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  tracks.map((track, i) => {
                    console.log('sdf', track);
                    return (
                      <Track
                        rank={i + 1}
                        name={track.name}
                        artist={track.artist}
                        key={i}
                        onClick={
                          () => {
                            this.props.addTrackToQueueAndPlay(
                              track,
                              track.image
                            )
                          } 
                        }
                      />
                    )
                  })
                }
              </tbody>
            </table> 
          </div>
        </div>
      )
    } else {
      return (
        <p>Waiting!</p>
       )
    }
  }
}

function mapStateToProps(state) {
  return {
    userPlaylists: state.playlists.userPlaylists,
  }
}

export default connect(
  mapStateToProps,
  {
    addTrackToQueueAndPlay: addTrackToQueueAndPlay,
  }
)(Playlist);
