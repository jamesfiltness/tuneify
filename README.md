# Tuneify

Tuneify is a music app built using the YouTube video player API and data from Musicbrainz and LastFm.

The focus for this project has been on learning new tech and not so much on code quality 🙈

UPDATE on this project: I ran this project locally recently and there are a few things that no longer work:
1. Playing a track no longer seems to queue the video in the embedded YouTube player. There has probably been a change to YouTube's Player API. There would probably be a quick fix for this.
2. LastFm seems to have stopped providing thumbnails in a few different contexts (most popular artists, some album covers etc). LastFm's terms of service prohibit any third party application from using the thumbnails anyway and because of this I did start writing a collection of Python scripts to scrape cover art from discogs and Musicbrainz: https://github.com/jamesfiltness/tuneify-python - these were working well and I successfully collected a very large library of images which could have been used to remove the dependency on LastFM.

LastFm is currently being used to power the search functionality and track listing data for the app. I was working to moving away from LastFm to using a MusicBrainz slave to run the app on as LastFm didn't seem to keep their data up to date. There is no associated code in this repo that relates to that work though.

## Tech
* React Redux, Redux Router frontend
* Mocha, Chai, Enzyme, Sinon
* Es6 + Babel
* Serverless (AWS Lambda) + DynamoDb to store user playlist data
* Auth0
* ElasticSearch for autocomplete
* Musicbrainz slave https://bitbucket.org/lalinsky/mbslave
* S3 + Cloudfront to serve static frontend 
* S3 + Cloudfront to store artist / album images





