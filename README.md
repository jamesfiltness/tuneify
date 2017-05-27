# Tuneify

Tuneify is a music app built using YouTube and LastFm APIs and data from Musicbrainz. Currently under development with a focus on moving away from LastFm for data and images. 

The focus for this project has been getting something done and having fun and not on code quality 🙈

## Tech
* React Redux, Redux Router frontend
* Mocha, Chai, Enzyme, Sinon
* Ex6 + Babel
* Serverless (AWS Lambda) + DynamoDb to store user playlist data
* Auth0
* Logstash (jdbc plugin) + ElasticSearch for autocomplete
* Musicbrainz slave https://bitbucket.org/lalinsky/mbslave cached in redis
* S3 + Cloudfront to serve static frontend 
* S3 + Cloudfront to store artist / album images


![alt tag](https://media.giphy.com/media/l0HlzayaF0jLB5TS8/source.gif)


