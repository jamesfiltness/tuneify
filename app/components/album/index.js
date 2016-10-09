import React from 'react'
import { connect } from 'react-redux'

function Album(props) {
  const {
    currentAlbum,
  } = props;
  return (
    <div>
      <h3>Album page</h3>
      <p>Current album is {props.currentAlbum.name}</p>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    currentAlbum: state.currentAlbum,
  }
}

export default connect(mapStateToProps)(Album);
