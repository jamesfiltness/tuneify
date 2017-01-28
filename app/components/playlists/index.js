import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserPlaylists } from '../../actions/playlists';

export class Playlists extends React.Component {
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
    console.log('bext props', nextProps);
    // if the user has just authenticated then we need to call to get their playlists
    if (this.props.authenticated === false && nextProps.authenticated) {
      this.props.getUserPlaylists();
    }

    if (nextProps.userPlaylists.length) {
      this.setState({
        shouldRenderPlaylists: true,
      })  
    } 
    
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
        <ul className="playlist">
          {this.renderPlaylists()}
        </ul>
      )
    } else if(this.state.shouldRenderSpinner) {
      return (
        // TODO: Add a spinner icon here
        <p>Spinner</p>
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

export default connect(
  mapStateToProps,
  {
    getUserPlaylists: getUserPlaylists,
  }
)(Playlists);
