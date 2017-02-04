import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserPlaylists } from '../../actions/playlists';
import { createPlaylist } from '../../actions/play-queue';

export class Playlists extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    userPlaylists: PropTypes.array,
    requestingPlaylists: PropTypes.bool.isRequired,
  }
  
  constructor(props) {
    super(props);

    this.state = {
      shouldRenderPlaylists: false,
      shouldRenderSpinner: false,
    }
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.props.getUserPlaylists();
    }  
  }

  componentWillReceiveProps(nextProps) {
    // if the user has just authenticated then we need to call to get their playlists
    if (this.props.authenticated === false && nextProps.authenticated) {
      this.props.getUserPlaylists();
    }
    
    const shouldRenderPlaylists = nextProps.userPlaylists.length ? true : false;
    
    this.setState({
      shouldRenderPlaylists,
    });

    this.renderSpinner(nextProps.requestingPlaylists); 
  }

  renderPlaylists() {
    return this.props.userPlaylists.map((playlist, i) => {
      let path = `/playlist/${playlist.id}`;
      return (
        <li className="playlist__item" key={i}>
          <Link 
            className="playlist__link" 
            to={{ pathname: path }}
          >
            {playlist.name}
          </Link>
        </li>
      )
    })
  }

  renderSpinner(shouldRenderSpinner) {
    const render = shouldRenderSpinner ? true : false;

    this.setState({
      shouldRenderSpinner: render,
    });
  }

  render() {
    if (this.state.shouldRenderPlaylists) {
      return(
      <div className="playlist">
        <ul className="playlist__list">
          {this.renderPlaylists()}
        </ul>
        <div 
          className="playlist__add-new new-playlist"
          onClick={this.props.createPlaylist}
        >
          <i 
            className="fa fa-plus-square-o fa-2x new-playlist__icon" 
            aria-hidden="true"
          ></i>
          <a className="new-playlist__text">New Playlist</a> 
        </div>
      </div>
      )
    } else if(this.state.shouldRenderSpinner) {
      return (
        <div className="playlist__spinner">
          <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else {
      return null
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    userPlaylists: state.playlists.userPlaylists,
    requestingPlaylists: state.playlists.requestingUserPlaylists,
  }
}

const mapDispatchToProps = {
  createPlaylist,
  getUserPlaylists
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
