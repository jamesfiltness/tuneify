import React, { PropTypes } from 'react';

export default class TrackTableHeader extends React.Component {
  static PropTypes = {
  
  };

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
    )
  }
}
