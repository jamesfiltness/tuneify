import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classNames';

export default class PlaylistImage extends React.Component {
  static propTypes = {
    tracks: PropTypes.array.isRequired,
    image: PropTypes.string,
  };

  renderImages(imageArr) {
    return imageArr.map((image, i) => {
      return (
        <img
          key={i}
          src={image}
          alt="Playlist Image"
          width="174"
          height="174"
        />
      )
    });
  }

  render() {
    const images = [];

    if (this.props.image) {
      images.push(this.props.image);
    } else {
      const tracks = this.props.tracks;


      tracks.map((track) => {
        if(!images.includes(track.image) && images.length < 4) {
          images.push(track.image);
        }
      });
    }

    const imageContainerClasses = classNames(
      'hero__image-combo',
      `hero__image-combo--count-${!(images.length > 4) ? images.length : 4}`
    )

    const imageHtml = this.renderImages(images);

    return (
      <div className={imageContainerClasses}>
        {imageHtml}
      </div>
    )
  }
}

