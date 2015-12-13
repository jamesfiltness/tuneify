/* ES6 YouTube iFrame Player Embed */

/* 

So we need a script that basically allows us to feed in a callback/callbacks and have that callback called when the 
youtube player has been instantiated

In the background we just need to load the script, provide the onyoutbeapiready callback and call the callbacks
also need to set a flag once the player has been loaded once */

export default class YouTubeAPILoader = {
    constructor(hi) {
    	console.log(hi);
    	this.loadApis = ['data', 'player', 'analytics'];
    	this.APILoaded = false;
    	this.callbacks = [];
    }

    load() {
      let tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      let APILoaded = this.APILoaded;


      window.onYouTubeIframeAPIReady() {
      	console.log('loaded');
          APILoaded = true;
      }
    }
}







