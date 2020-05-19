# Tuneify

Tuneify is a music app built using the YouTube video player API and data from Musicbrainz and LastFm.

The focus for this project has been on learning new tech and not so much on code quality 🙈

## Update on this project: 
I ran this project locally recently and there are a few things that no longer work:
1. Playing a track no longer queue's the video in the embedded YouTube player. There has probably been a change to YouTube's Player API. Likely to be a quick fix.
2. LastFm has stopped providing thumbnails in a few different contexts (most popular artists, some album covers etc).

## Moving away from LastFm for search and images
I had started to move away from LastFM for a few reasons:
1. The data was not kept up to date. New releases and artists took months to appear in the data, if at all
2. LastFm prohibits the use of Artist/release images in third party apps

Because of this I decided to look in to creating my own solution for search and images. This was a lot more work but I did make good progress:

### Images
I wrote a collection of Python scripts to scrape coverart/artist images from discogs and Musicbrainz: https://github.com/jamesfiltness/tuneify-python - these were working well and I successfully collected a very large library of images which could have been used to remove the dependency on LastFM.

### Autocomplete and track data
In the current iteration of Tuneify, LastFm APIs are used for the autocomplete functionality and track listing data. I was working to moving away from LastFm to using ElasticSearch. I had a setup where data was ingested form a local Musicbrainz slave in to ElasticSearch. Some documentation and code related to that can be found here: https://github.com/jamesfiltness/musicbrainz-elasticsearch. The gist of this is that the MusicBrainz db contains lots of artists and releases, many of which are not in the public lexicon, so when a search was performed against the data, unless the search was exact, most of the results returned would be unknown to the user. The solution to this was to augment the ElasticSearch index with a views property, which would get incremented every time a user selected a result from the autocomplete. To start with I had no views data so I decided to manufacture some. I wrote some python scripts (https://github.com/jamesfiltness/tuneify-python/tree/master/elasticsearch) which took popular artists from lots of genres of music, used LastFm to find their similar artists and then bumped the views count of all of those artists. IIRC this worked really well and the ElasticSearch autocomplete was working quite nicely.

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





