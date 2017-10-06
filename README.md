# Tuneify

Tuneify is a music app built using the YouTube video player API and data from Musicbrainz and LastFm. Currently under development with a focus on moving away from LastFm for data and assets. 

The focus for this project has been on creating an MVP and learning new tech and not so much on code quality 🙈


![alt tag](https://media.giphy.com/media/l0HlzayaF0jLB5TS8/source.gif)

## Tech
* React Redux, Redux Router frontend
* Mocha, Chai, Enzyme, Sinon
* Es6 + Babel
* Serverless (AWS Lambda) + DynamoDb to store user playlist data
* Auth0
* Logstash (jdbc plugin) + ElasticSearch for autocomplete
* Musicbrainz slave https://bitbucket.org/lalinsky/mbslave cached in redis (EC2)
* S3 + Cloudfront to serve static frontend 
* S3 + Cloudfront to store artist / album images





