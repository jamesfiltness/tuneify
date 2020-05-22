# Tuneify

Tuneify is a music app built using the YouTube video player API and data from Musicbrainz and LastFm.

The focus for this project has been on learning new tech and not so much on code quality 🙈

## Update on this project: 
I ran this project locally recently and there are a few things that no longer work:

1. Playing a track no longer queue's the video in the embedded YouTube player. There has probably been a change to YouTube's Player API. Likely to be a quick fix.
2. LastFm has stopped providing thumbnails in a few different contexts (most popular artists, some album covers etc).

## Moving away from LastFm for search and images
I had started to investigate removing LastFm as a dependency for a few reasons:
1. The data was not kept up to date. New releases and artists took months to appear in the data, if at all
2. LastFm prohibits the use of Artist/release images in third party apps

Tuneify is essentially powered by LastFm. It is used by the autocomplete search, track data and images. So I started to look for other solutions and decided to see if I could roll my own. There are some repos related to that effort: 

* https://github.com/jamesfiltness/tuneify-python - scripts to collect artist/release artwork from various sources and * https://github.com/jamesfiltness/musicbrainz-elasticsearch - notes and code about creating an autocomplete by taking the Musicbrainz database and using it to create a search engine running on elasticsearch, with weighting for the most popular artists and releases.

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





