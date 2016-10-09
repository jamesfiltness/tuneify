import React from 'react'
import { connect } from 'react-redux'

function Artist(props) {
  const {
    currentArtist,
  } = props;
  return (
    <div>
      <h3>Artist page</h3>
      <p>Current artist is {props.currentArtist.name}</p>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    currentArtist: state.currentArtist,
  }
}

export default connect(mapStateToProps)(Artist);
