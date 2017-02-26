export default function(trackArr, img) {
  return trackArr.map((track) => {
    const artist = typeof track.artist === 'object' ?
    track.artist.name :
    track.artist;

    const trackImg = track.image ? track.image : img;

    return {
      name: track.name,
      artist,
      image: trackImg,
    }
  });
}
