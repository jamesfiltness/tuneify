import React, { PropTypes } from 'react';

export default class Track extends React.Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    rank: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.optionSelected = this.optionSelected.bind(this);
  }

  optionSelected(e) {
    e.stopPropagation();
    console.log('option selected - do something');
    // this should display a popup, with the following options
    // Add to playQueue
    // Add to playlist
  }
 
  render() {
    console.log(this.props);
    return (
      <tr 
        className="track" 
        onClick={this.props.onClick}
      >
        <td 
          className="track__cell"
        >
          <span className="track__rank">
            {this.props.rank}
          </span>
          <span className="track__play">
            <i className="fa fa-play" />
          </span>
        </td>
        <td className="track__cell track__name">{this.props.name}</td>
        <td 
          className="track__cell track__options"
          onClick={this.optionSelected}
        >
          <i 
            className="fa fa-ellipsis-h track__option" 
            aria-hidden="true"
          ></i>
        </td>
      </tr>
    )
  }
}
