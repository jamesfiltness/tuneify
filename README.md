# Tuneify

NOTE: This project is no longer functioning. LastFM are no longer serving thumbnail images reliably as per this announcement: 
https://getsatisfaction.com/lastfm/topics/api-announcement-dac8oefw5vrxq
and also videos are not playing due to a suspected change in YouTubes APIs.

Tuneify is a music app built using the YouTube video player API and data from Musicbrainz and LastFm.

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





