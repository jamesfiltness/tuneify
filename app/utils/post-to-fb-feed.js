export default function postToFeed(title, desc, url, image) {
  const obj = {
    method: 'feed',
    link: url,
    picture: image,
    name: title,
    description: desc
  };

  function callback(response){}

  FB.ui(obj, callback);
}
