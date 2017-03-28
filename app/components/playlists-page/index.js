import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getUserPlaylists } from '../../actions/playlists';

export class PlaylistsPage extends React.Component {
  static PropTypes = {
    userPlaylists: PropTypes.array.isRequired,
  };

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

  renderSpinner(shouldRenderSpinner) {
    const render = shouldRenderSpinner ? true : false;

    this.setState({
      shouldRenderSpinner: render,
    });
  }

  renderUserPlaylists() {
    return (
      <ul>
        {
          this.props.userPlaylists.map((playlist, i) => {
            return (
              <li key={i}>
                <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    if (this.props.userPlaylists.length) {
      return (
        <div>
          <h1>Playlists</h1>
          {this.renderUserPlaylists()}
        </div>
      )
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    userPlaylists: state.playlists.userPlaylists,
  }
}


const mapDispatchToProps = {
  getUserPlaylists,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsPage);
