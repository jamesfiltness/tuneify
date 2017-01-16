import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class Playlists extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      console.log('authenticated in playlists component');
    }
  }

  render() {
    return (
      <p>Playlists component</p>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
  }
}

export default connect(
  mapStateToProps,
)(Playlists);
