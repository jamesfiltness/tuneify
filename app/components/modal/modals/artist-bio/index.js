import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class ArtistBioModal extends React.Component {
  createMarkup(bio) {
    const formatted = '<p>' + bio.replace(/\n([ \t]*\n)+/g, '</p><p>').replace('\n', '<br />') + '</p>';
    const linkRemoved = formatted.replace('Read more on Last.fm', '');
    const licenceRemoved = linkRemoved.replace('. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.', '');
    return {__html: licenceRemoved};
  }

  render() {
    const {
      name,
      bio,
      image
    } = this.props.artistPageData;

    return (
      <div>
        <h3 className="dialog__heading">
          {name}
        </h3>
        <div className="dialog__content">
          <img
            className="artist-bio__img"
            width="165"
            height="165"
            src={image}
            alt={name}
          />
          <div
            className="artist-bio__content"
            dangerouslySetInnerHTML={this.createMarkup(bio.content)}
          />
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    artistPageData: state.artistPage.artistPageData,
  }
}


export default connect(
  mapStateToProps
)(ArtistBioModal);

