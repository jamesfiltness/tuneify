class YouTubeDataApi {
  constructor() {
    this.loadApi();
  }

  loadApi() {
    const tag = document.createElement('script');
    tag.src = "http://apis.google.com/js/api.js";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); 
  }
}

export default YouTubeDataApi
