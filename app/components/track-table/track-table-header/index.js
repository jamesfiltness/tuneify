import React, { PropTypes } from 'react';

export default class TrackTableHeader extends React.Component {
  static PropTypes = {
    renderArtistCol: PropTypes.bool.isRequired,  
  };
  
  renderArtistTableHeading() {
    console.log('rederart', this.props.renderArtistCol);
    return this.props.renderArtistCol ?
      <th 
        className="tracks__heading tracks__heading--artist"
      >
        Artist
      </th> : 
      null;
  }
  
  render() {
    return (
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
          {this.renderArtistTableHeading()}
          <th 
            className="tracks__heading tracks__heading--actions"
          >
            Actions
          </th>
        </tr>
      </thead>
    )
  }
}
